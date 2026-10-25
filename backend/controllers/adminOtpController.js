const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AdminOtp = require("../models/AdminOtp");

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const SEND_WINDOW_MS = 15 * 60 * 1000;
const MAX_SENDS = 3;
const MAX_ATTEMPTS = 5;

const normalizeEmail = (email) =>
  String(email || "").trim().toLowerCase();

const createOtpHash = (email, otp) =>
  crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`${email}:${otp}`)
    .digest("hex");

const safeCompare = (a, b) => {
  const first = Buffer.from(a, "hex");
  const second = Buffer.from(b, "hex");

  return (
    first.length === second.length &&
    first.length > 0 &&
    crypto.timingSafeEqual(first, second)
  );
};

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
});

const transporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.USERPASS,
    },
  });

exports.Send = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const authorizedEmail = normalizeEmail(process.env.ADMIN_EMAIL);

    if (
      !process.env.JWT_SECRET ||
      !process.env.ADMIN_EMAIL ||
      !process.env.USERMAIL ||
      !process.env.USERPASS
    ) {
      return res.status(500).json({
        message: "Email authentication is not configured",
      });
    }

    if (!email || email !== authorizedEmail) {
      return res.status(403).json({
        message: "This email is not authorized",
      });
    }

    const now = Date.now();
    let record = await AdminOtp.findOne({ email });

    if (record && now - record.lastSentAt.getTime() < RESEND_COOLDOWN_MS) {
      return res.status(429).json({
        message: "Please wait before requesting another OTP",
      });
    }

    if (!record || now - record.windowStartedAt.getTime() >= SEND_WINDOW_MS) {
      record = await AdminOtp.findOneAndUpdate(
        { email },
        {
          $set: {
            email,
            otpHash: "pending",
            expiresAt: new Date(now + OTP_TTL_MS),
            attempts: 0,
            lastSentAt: new Date(now),
            windowStartedAt: new Date(now),
            sendsInWindow: 1,
          },
        },
        { upsert: true, new: true }
      );
    } else {
      if (record.sendsInWindow >= MAX_SENDS) {
        return res.status(429).json({
          message: "OTP limit reached. Try again in 15 minutes.",
        });
      }

      record.sendsInWindow += 1;
      record.lastSentAt = new Date(now);
      record.expiresAt = new Date(now + OTP_TTL_MS);
      record.attempts = 0;
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    record.otpHash = createOtpHash(email, otp);
    record.expiresAt = new Date(now + OTP_TTL_MS);
    await record.save();

    try {
      await transporter().sendMail({
        from: process.env.USERMAIL,
        to: email,
        subject: "HEATS Admin Login OTP",
        text: `Your HEATS admin login OTP is ${otp}. It expires in 5 minutes. Do not share it with anyone.`,
        html: `
          <div style="font-family:Arial,sans-serif">
            <h2>HEATS Admin Login</h2>
            <p>Your one-time password is:</p>
            <h1 style="letter-spacing:8px">${otp}</h1>
            <p>This code expires in 5 minutes.</p>
            <p>If you did not request this code, ignore this email.</p>
          </div>
        `,
      });
    } catch (mailError) {
      // Do not leave a usable OTP if delivery fails.
      await AdminOtp.deleteOne({
        _id: record._id,
        otpHash: record.otpHash,
      });

      console.error("OTP email delivery failed:", mailError.message);

      return res.status(502).json({
        message: "Could not send OTP. Please try again later.",
      });
    }

    return res.json({
      message: "OTP sent successfully",
      expiresIn: 300,
    });
  } catch (error) {
    console.error("Send OTP error:", error.message);
    return res.status(500).json({
      message: "Unable to send OTP",
    });
  }
};

exports.Verify = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();

    if (
      !email ||
      email !== normalizeEmail(process.env.ADMIN_EMAIL) ||
      !/^\d{6}$/.test(otp)
    ) {
      return res.status(400).json({
        message: "Invalid email or OTP",
      });
    }

    const record = await AdminOtp.findOne({ email });

    if (!record) {
      return res.status(400).json({
        message: "OTP is invalid or expired",
      });
    }

    if (record.expiresAt.getTime() <= Date.now()) {
      await AdminOtp.deleteOne({ _id: record._id });
      return res.status(400).json({
        message: "OTP expired. Request a new one.",
      });
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      await AdminOtp.deleteOne({ _id: record._id });
      return res.status(429).json({
        message: "Too many incorrect attempts. Request a new OTP.",
      });
    }

    const submittedHash = createOtpHash(email, otp);

    if (!safeCompare(record.otpHash, submittedHash)) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        message: "Incorrect OTP",
      });
    }

    // Consume the OTP before issuing a session.
    const consumed = await AdminOtp.deleteOne({
      _id: record._id,
      otpHash: record.otpHash,
    });

    if (consumed.deletedCount !== 1) {
      return res.status(400).json({
        message: "OTP has already been used. Request a new one.",
      });
    }

    const token = jwt.sign(
      {
        email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
        issuer: "heats-registration-api",
        audience: "heats-admin",
      }
    );

    res.cookie("adminToken", token, cookieOptions());

    return res.json({
      message: "Login successful",
      admin: {
        email,
        role: "admin",
      },
      expiresIn: 86400,
    });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    return res.status(500).json({
      message: "Unable to verify OTP",
    });
  }
};

exports.Logout = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return res.json({
    message: "Logged out successfully",
  });
};