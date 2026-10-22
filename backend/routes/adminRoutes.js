
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const Admin = require("../models/Admin");
const Registration = require("../models/Registration");
const requireAdmin = require("../middleware/requireAdmin");
const { WEIGHTS, calculateTotal } = require("../utils/scoring");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later."
  }
});

const STATUSES = [
  "Pending",
  "Shortlisted",
  "Selected",
  "Waitlisted",
  "Rejected",
  "On Hold"
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toCandidate(registration) {
  const item = registration.toObject
    ? registration.toObject()
    : registration;

  return {
    ...item,
    totalScore: calculateTotal(item.scores)
  };
}

// POST /api/admin/login
router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const email = typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";

    const password = typeof req.body?.password === "string"
      ? req.body.password
      : "";

    const allowedEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    if (!allowedEmail) {
      return res.status(500).json({
        message: "Admin login is not configured on the server."
      });
    }

    if (!email || !password || email !== allowedEmail) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const admin = await Admin.findOne({
      email: allowedEmail,
      active: true
    }).select("+passwordHash");

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      {
        email: admin.email
      },
      process.env.JWT_SECRET,
      {
        subject: admin._id.toString(),
        expiresIn: process.env.JWT_EXPIRES_IN || "8h",
        issuer: "heats-registration-api",
        audience: "heats-admin"
      }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
      path: "/"
    });

    return res.json({
      message: "Login successful.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  res.json({ message: "Logged out successfully." });
});

// GET /api/admin/me
router.get("/me", requireAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

// GET /api/admin/candidates
router.get("/candidates", requireAdmin, async (req, res, next) => {
  try {
    const {
      search = "",
      club = "",
      status = "",
      page = "1",
      limit = "50"
    } = req.query;

    const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number.parseInt(limit, 10) || 50)
    );

    const filter = {};

    if (typeof search === "string" && search.trim()) {
      const safeSearch = escapeRegex(search.trim());

      filter.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } },
        { phone: { $regex: safeSearch, $options: "i" } },
        { branch: { $regex: safeSearch, $options: "i" } },
        { teamName: { $regex: safeSearch, $options: "i" } }
      ];
    }

    if (typeof club === "string" && club.trim()) {
      filter.events = club.trim();
    }

    if (typeof status === "string" && status.trim()) {
      if (!STATUSES.includes(status.trim())) {
        return res.status(400).json({
          message: "Invalid status filter."
        });
      }

      filter.adminStatus = status.trim();
    }

    const [registrations, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean(),

      Registration.countDocuments(filter)
    ]);

    return res.json({
      candidates: registrations.map(toCandidate),
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize)
      },
      weights: WEIGHTS
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/candidates/:id
router.get("/candidates/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid candidate ID." });
    }

    const registration = await Registration.findById(req.params.id).lean();

    if (!registration) {
      return res.status(404).json({ message: "Candidate not found." });
    }

    return res.json({ candidate: toCandidate(registration), weights: WEIGHTS });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/candidates/:id
router.patch("/candidates/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid candidate ID." });
    }

    const body = req.body || {};
    const update = {};

    if (Object.prototype.hasOwnProperty.call(body, "scores")) {
      if (
        !body.scores ||
        typeof body.scores !== "object" ||
        Array.isArray(body.scores)
      ) {
        return res.status(400).json({ message: "Scores must be an object." });
      }

      const allowedScoreKeys = ["written", "interview1", "interview2"];

      for (const key of Object.keys(body.scores)) {
        if (!allowedScoreKeys.includes(key)) {
          return res.status(400).json({ message: `Invalid score field: ${key}` });
        }

        const score = body.scores[key];

        if (
          typeof score !== "number" ||
          !Number.isFinite(score) ||
          score < 0 ||
          score > 100
        ) {
          return res.status(400).json({
            message: `${key} score must be a number between 0 and 100.`
          });
        }

        update[`scores.${key}`] = score;
      }
    }

    if (Object.prototype.hasOwnProperty.call(body, "adminStatus")) {
      if (!STATUSES.includes(body.adminStatus)) {
        return res.status(400).json({ message: "Invalid candidate status." });
      }

      update.adminStatus = body.adminStatus;
    }

    if (Object.prototype.hasOwnProperty.call(body, "adminNotes")) {
      if (
        typeof body.adminNotes !== "string" ||
        body.adminNotes.length > 2000
      ) {
        return res.status(400).json({
          message: "Admin notes must be text of up to 2000 characters."
        });
      }

      update.adminNotes = body.adminNotes.trim();
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        message: "No valid changes were supplied."
      });
    }

    update.lastUpdatedBy = req.admin.id;

    const candidate = await Registration.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      {
        new: true,
        runValidators: true
      }
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found." });
    }

    return res.json({
      message: "Candidate updated successfully.",
      candidate: toCandidate(candidate),
      weights: WEIGHTS
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
