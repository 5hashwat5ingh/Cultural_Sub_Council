
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({
        message: "Please log in to continue."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const allowedEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    if (!allowedEmail || decoded.email !== allowedEmail) {
      return res.status(401).json({
        message: "Unauthorized admin account."
      });
    }

    const admin = await Admin.findById(decoded.sub);

    if (
      !admin ||
      !admin.active ||
      admin.email !== allowedEmail
    ) {
      return res.status(401).json({
        message: "Admin account is unavailable."
      });
    }

    req.admin = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Your session is invalid or expired. Please log in again."
      });
    }

    next(error);
  }
}

module.exports = requireAdmin;
