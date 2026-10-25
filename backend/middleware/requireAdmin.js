const jwt = require("jsonwebtoken");

module.exports = function requireAdmin(req, res, next) {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (!process.env.JWT_SECRET || !process.env.ADMIN_EMAIL) {
    return res.status(500).json({
      message: "Admin authentication is not configured",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "heats-registration-api",
      audience: "heats-admin",
    });

    const authorizedEmail = process.env.ADMIN_EMAIL
      .trim()
      .toLowerCase();

    if (
      decoded.role !== "admin" ||
      decoded.email?.toLowerCase() !== authorizedEmail
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    req.admin = {
      id: decoded.email,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Session expired or invalid. Please log in again.",
    });
  }
};