const express = require("express");
const mongoose = require("mongoose");

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

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toCandidate = (doc) => {
  const candidate = doc.toObject ? doc.toObject() : doc;

  return {
    ...candidate,
    totalScore: calculateTotal(candidate.scores || {}),
  };
};

router.use(requireAdmin);

router.get("/me", (req, res) => {
  res.json({
    admin: req.admin,
  });
});

router.get("/candidates", async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    const club = String(req.query.club || "").trim();
    const status = String(req.query.status || "").trim();

    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 50)
    );

    const filter = {};

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");

      filter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { branch: regex },
        { teamName: regex },
      ];
    }

    if (club) {
      filter["events"] = club;
    }

    if (status && STATUSES.includes(status)) {
      filter.adminStatus = status;
    }

    const [docs, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Registration.countDocuments(filter),
    ]);

    res.json({
      candidates: docs.map(toCandidate),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      weights: WEIGHTS,
    });
  } catch (error) {
    console.error("Get candidates error:", error.message);
    res.status(500).json({
      message: "Unable to fetch candidates",
    });
  }
});

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

    res.json({
      candidate: toCandidate(candidate),
      weights: WEIGHTS,
    });
  } catch (error) {
    console.error("Get candidate error:", error.message);
    res.status(500).json({
      message: "Unable to fetch candidate",
    });
  }
});

router.patch("/candidates/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const allowedScoreFields = ["written", "interview1", "interview2"];
    const updates = {};

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

    if (req.body.adminStatus !== undefined) {
      if (!STATUSES.includes(req.body.adminStatus)) {
        return res.status(400).json({
          message: "Invalid admin status",
        });
      }

      updates.adminStatus = req.body.adminStatus;
    }

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
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.json({
      candidate: toCandidate(candidate),
      weights: WEIGHTS,
    });
  } catch (error) {
    console.error("Update candidate error:", error.message);
    res.status(500).json({
      message: "Unable to update candidate",
    });
  }
});

module.exports = router;