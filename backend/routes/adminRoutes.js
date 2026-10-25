
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const Registration = require("../models/Registration");
const requireAdmin = require("../middleware/requireAdmin");
const { WEIGHTS, calculateTotal } = require("../utils/scoring");

const router = express.Router();

const STATUSES = [
  "Pending",
  "Shortlisted",
  "Selected",
  "Waitlisted",
  "Rejected",
  "On Hold",
];

const ALLOWED_SCORE_KEYS = [
  "written",
  "interview1",
  "interview2",
];

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toCandidate(registration) {
  const item = registration.toObject
    ? registration.toObject()
    : registration;

  return {
    ...item,
    totalScore: calculateTotal(item.scores),
  };
}

function getAdminConfig() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  if (!email || !password || !secret || secret.length < 32) {
    return null;
  }

  return { email, password, secret };
}

// POST /api/admin/login
router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const config = getAdminConfig();

    if (!config) {
      return res.status(500).json({
        message: "Admin authentication is not configured correctly.",
      });
    }

    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    const password =
      typeof req.body?.password === "string"
        ? req.body.password
        : "";

    const emailMatches = email === config.email;

    const passwordBuffer = Buffer.from(password);
    const expectedBuffer = Buffer.from(config.password);

    const passwordMatches =
      passwordBuffer.length > 0 &&
      passwordBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(passwordBuffer, expectedBuffer);

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        email: config.email,
        role: "admin",
      },
      config.secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h",
        issuer: "heats-registration-api",
        audience: "heats-admin",
      }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful.",
      admin: {
        email: config.email,
        role: "admin",
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.json({
    message: "Logged out successfully.",
  });
});

// GET /api/admin/me
router.get("/me", requireAdmin, (req, res) => {
  return res.json({
    admin: req.admin,
  });
});

// GET /api/admin/candidates
router.get("/candidates", requireAdmin, async (req, res, next) => {
  try {
    const {
      search = "",
      club = "",
      status = "",
      page = "1",
      limit = "50",
    } = req.query;

    const pageNumber = Math.max(
      1,
      Number.parseInt(page, 10) || 1
    );

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
        { teamName: { $regex: safeSearch, $options: "i" } },
      ];
    }

    if (typeof club === "string" && club.trim()) {
      filter.events = club.trim();
    }

    if (typeof status === "string" && status.trim()) {
      if (!STATUSES.includes(status.trim())) {
        return res.status(400).json({
          message: "Invalid status filter.",
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

      Registration.countDocuments(filter),
    ]);

    return res.json({
      candidates: registrations.map(toCandidate),
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
      weights: WEIGHTS,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/candidates/:id
router.get(
  "/candidates/:id",
  requireAdmin,
  async (req, res, next) => {
    try {
      if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
        return res.status(400).json({
          message: "Invalid candidate ID.",
        });
      }

      const registration = await Registration.findById(
        req.params.id
      ).lean();

      if (!registration) {
        return res.status(404).json({
          message: "Candidate not found.",
        });
      }

      return res.json({
        candidate: toCandidate(registration),
        weights: WEIGHTS,
      });
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /api/admin/candidates/:id
router.patch(
  "/candidates/:id",
  requireAdmin,
  async (req, res, next) => {
    try {
      if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
        return res.status(400).json({
          message: "Invalid candidate ID.",
        });
      }

      const body = req.body || {};
      const update = {};

      if (
        Object.prototype.hasOwnProperty.call(body, "scores")
      ) {
        if (
          !body.scores ||
          typeof body.scores !== "object" ||
          Array.isArray(body.scores)
        ) {
          return res.status(400).json({
            message: "Scores must be an object.",
          });
        }

        for (const key of Object.keys(body.scores)) {
          if (!ALLOWED_SCORE_KEYS.includes(key)) {
            return res.status(400).json({
              message: `Invalid score field: ${key}`,
            });
          }

          const score = body.scores[key];

          if (
            typeof score !== "number" ||
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
          ) {
            return res.status(400).json({
              message: `${key} score must be between 0 and 100.`,
            });
          }

          update[`scores.${key}`] = score;
        }
      }

      if (
        Object.prototype.hasOwnProperty.call(body, "adminStatus")
      ) {
        if (!STATUSES.includes(body.adminStatus)) {
          return res.status(400).json({
            message: "Invalid candidate status.",
          });
        }

        update.adminStatus = body.adminStatus;
      }

      if (
        Object.prototype.hasOwnProperty.call(body, "adminNotes")
      ) {
        if (
          typeof body.adminNotes !== "string" ||
          body.adminNotes.length > 2000
        ) {
          return res.status(400).json({
            message: "Admin notes must be text up to 2000 characters.",
          });
        }

        update.adminNotes = body.adminNotes.trim();
      }

      if (Object.keys(update).length === 0) {
        return res.status(400).json({
          message: "No valid changes were supplied.",
        });
      }

      update.lastUpdatedBy = req.admin.id;

      const candidate = await Registration.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!candidate) {
        return res.status(404).json({
          message: "Candidate not found.",
        });
      }

      return res.json({
        message: "Candidate updated successfully.",
        candidate: toCandidate(candidate),
        weights: WEIGHTS,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
