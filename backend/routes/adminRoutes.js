
const express = require("express");
const mongoose = require("mongoose");

const Registration = require("../models/Registration");
const RegistrationSetting = require("../models/RegistrationSetting");

const requireAdmin = require("../middleware/requireAdmin");
const { WEIGHTS, calculateTotal } = require("../utils/scoring");

const router = express.Router();

// ==========================================
// CONSTANTS
// ==========================================

const CLUBS = [
  "Dance",
  "Music",
  "Dramatics",
  "Fine Arts",
  "Photography",
  "Technical",
  "Other",
];

const STATUSES = [
  "Pending",
  "Shortlisted",
  "Selected",
  "Waitlisted",
  "Rejected",
  "On Hold",
];

// ==========================================
// HELPERS
// ==========================================

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toCandidate = (doc) => {
  const candidate = doc.toObject ? doc.toObject() : doc;

  return {
    ...candidate,
    totalScore: calculateTotal(candidate.scores || {}),
  };
};

// ==========================================
// ADMIN AUTHENTICATION
// All routes below require admin authentication.
// ==========================================

router.use(requireAdmin);

// ==========================================
// GET ADMIN PROFILE
// ==========================================

router.get("/me", (req, res) => {
  res.json({ admin: req.admin });
});

// ==========================================
// REGISTRATION MANAGEMENT
// ==========================================

// GET REGISTRATION STATUS

router.get("/registration-status", async (req, res) => {
  try {
    const setting = await RegistrationSetting.findOne({
      key: "global",
    }).lean();

    return res.json({
      success: true,
      registrationOpen: setting
        ? setting.registrationOpen
        : true,
    });
  } catch (error) {
    console.error("Get registration status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch registration status.",
    });
  }
});

// OPEN / CLOSE REGISTRATIONS

router.patch("/registration-status", async (req, res) => {
  try {
    const { registrationOpen } = req.body;

    if (typeof registrationOpen !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "registrationOpen must be a boolean.",
      });
    }

    const setting = await RegistrationSetting.findOneAndUpdate(
      { key: "global" },
      {
        $set: {
          registrationOpen,
        },
        $setOnInsert: {
          key: "global",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      success: true,
      registrationOpen: setting.registrationOpen,
      message: registrationOpen
        ? "Registrations opened successfully."
        : "Registrations closed successfully.",
    });
  } catch (error) {
    console.error("Update registration status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update registration status.",
    });
  }
});

// ==========================================
// GET CANDIDATES
// ==========================================

router.get("/candidates", async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    const club = String(req.query.club || "").trim();
    const status = String(req.query.status || "").trim();

    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 50)
    );

    // Search and status filters apply to dashboard statistics.
    // Club selection is excluded so club cards remain stable.

    const statsFilter = {};

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");

      statsFilter.$or = [
        { name: regex },
        { roll_no: regex },
        { email: regex },
        { phone: regex },
        { branch: regex },
        { teamName: regex },
      ];
    }

    if (status && STATUSES.includes(status)) {
      statsFilter.adminStatus = status;
    }

    // Candidate list respects selected club.

    const filter = { ...statsFilter };

    if (club && CLUBS.includes(club)) {
      filter.events = club;
    }

    const [docs, total, statsDocs] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),

      Registration.countDocuments(filter),

      Registration.find(statsFilter)
        .select("events adminStatus")
        .lean(),
    ]);

    // CLUB-WISE COUNTS

    const clubCounts = Object.fromEntries(
      CLUBS.map((name) => [name, 0])
    );

    // DECISION COUNTS

    const decisionCounts = {
      selected: 0,
      rejected: 0,
      pending: 0,
    };

    for (const doc of statsDocs) {
      const events = Array.isArray(doc.events)
        ? new Set(doc.events)
        : new Set();

      for (const event of events) {
        if (
          Object.prototype.hasOwnProperty.call(
            clubCounts,
            event
          )
        ) {
          clubCounts[event]++;
        }
      }

      if (doc.adminStatus === "Selected") {
        decisionCounts.selected++;
      } else if (doc.adminStatus === "Rejected") {
        decisionCounts.rejected++;
      } else {
        decisionCounts.pending++;
      }
    }

    return res.json({
      candidates: docs.map(toCandidate),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        pages: Math.ceil(total / limit),
      },

      clubCounts,
      decisionCounts,
      weights: WEIGHTS,
    });
  } catch (error) {
    console.error("Get candidates error:", error);

    return res.status(500).json({
      message: "Unable to fetch candidates",
    });
  }
});

// ==========================================
// GET SINGLE CANDIDATE
// ==========================================

router.get("/candidates/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const candidate = await Registration.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    return res.json({
      candidate: toCandidate(candidate),
      weights: WEIGHTS,
    });
  } catch (error) {
    console.error("Get candidate error:", error);

    return res.status(500).json({
      message: "Unable to fetch candidate",
    });
  }
});

// ==========================================
// UPDATE CANDIDATE
// SCORES / ADMIN STATUS / ADMIN NOTES
// ==========================================

router.patch("/candidates/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const allowedScoreFields = [
      "written",
      "interview1",
      "interview2",
    ];

    const updates = {};

    // UPDATE SCORES

    if (req.body.scores !== undefined) {
      if (
        !req.body.scores ||
        typeof req.body.scores !== "object" ||
        Array.isArray(req.body.scores)
      ) {
        return res.status(400).json({
          message: "Scores must be an object",
        });
      }

      for (const [key, value] of Object.entries(req.body.scores)) {
        if (
          !allowedScoreFields.includes(key) ||
          typeof value !== "number" ||
          !Number.isFinite(value) ||
          value < 0 ||
          value > 100
        ) {
          return res.status(400).json({
            message: `Invalid score field or value: ${key}`,
          });
        }

        updates[`scores.${key}`] = value;
      }
    }

    // UPDATE ADMIN STATUS

    if (req.body.adminStatus !== undefined) {
      if (!STATUSES.includes(req.body.adminStatus)) {
        return res.status(400).json({
          message: "Invalid admin status",
        });
      }

      updates.adminStatus = req.body.adminStatus;
    }

    // UPDATE ADMIN NOTES

    if (req.body.adminNotes !== undefined) {
      if (
        typeof req.body.adminNotes !== "string" ||
        req.body.adminNotes.length > 2000
      ) {
        return res.status(400).json({
          message: "Admin notes must be text up to 2000 characters",
        });
      }

      updates.adminNotes = req.body.adminNotes;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid updates provided",
      });
    }

    updates.lastUpdatedBy = req.admin.id;

    const candidate = await Registration.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    return res.json({
      candidate: toCandidate(candidate),
      weights: WEIGHTS,
    });
  } catch (error) {
    console.error("Update candidate error:", error);

    return res.status(500).json({
      message: "Unable to update candidate",
    });
  }
});

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;
