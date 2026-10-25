
const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const token = req.cookies?.adminToken;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: "heats-registration-api",
      audience: "heats-admin",
    });

    const configuredEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    if (
      decoded.role !== "admin" ||
      !configuredEmail ||
      typeof decoded.email !== "string" ||
      decoded.email.toLowerCase() !== configuredEmail
    ) {
      return res.status(403).json({
        message: "Admin access denied.",
      });
    }

    req.admin = {
      id: decoded.sub || decoded.email,
      email: decoded.email,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}

module.exports = requireAdmin;
