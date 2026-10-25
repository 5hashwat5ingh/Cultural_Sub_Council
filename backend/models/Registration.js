
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    roll_no: {
      type: String,
      trim: true,
      default: "",
    },
    branch: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
  },
  { _id: false }
);

const eventEntrySchema = new mongoose.Schema(
  {
    event: {
      type: String,
      enum: [
        "Dance",
        "Music",
        "Dramatics",
        "Fine Arts",
        "Photography",
        "Technical",
        "Other",
      ],
      required: true,
    },
    participationType: {
      type: String,
      enum: ["Solo", "Duo", "Team"],
      required: true,
    },
    teamName: {
      type: String,
      trim: true,
      default: "",
    },
    members: {
      type: [memberSchema],
      default: [],
    },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    // Primary participant details
    name: {
      type: String,
      required: true,
      trim: true,
    },

    roll_no: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Selected events
    events: {
      type: [
        {
          type: String,
          enum: [
            "Dance",
            "Music",
            "Dramatics",
            "Fine Arts",
            "Photography",
            "Technical",
            "Other",
          ],
        },
      ],
      required: true,
      validate: {
        validator: function (events) {
          return Array.isArray(events) && events.length > 0;
        },
        message: "At least one event must be selected.",
      },
    },

    multipleEvents: {
      type: Boolean,
      default: false,
    },

    // Event-wise participation details
    eventEntries: {
      type: [eventEntrySchema],
      default: [],
    },

    // Legacy participation fields
    participationType: {
      type: String,
      enum: ["Solo", "Duo", "Team", ""],
      default: "",
    },

    teamName: {
      type: String,
      trim: true,
      default: "",
    },

    members: {
      type: [memberSchema],
      default: [],
    },

    // Event-specific submissions
    // Dance: one Google Drive link for the audio track
    trackLink: {
      type: String,
      trim: true,
      default: "",
    },

    // Photography: Google Drive image links
    imageLinks: {
      type: [String],
      default: [],
    },

    // Fine Arts: Google Drive artwork links
    fineArtLinks: {
      type: [String],
      default: [],
    },

    // Registration confirmation
    confirmed: {
      type: Boolean,
      default: false,
    },

    // Admin evaluation fields
    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Shortlisted",
        "Selected",
        "Rejected",
      ],
      default: "Pending",
    },

    scores: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    lastUpdatedBy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// One registration per roll number
registrationSchema.index(
  { roll_no: 1 },
  {
    unique: true,
    name: "unique_registration_roll_no",
  }
);

module.exports =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
