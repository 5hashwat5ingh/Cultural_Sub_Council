const mongoose = require("mongoose");

const EVENT_OPTIONS = [
  "Dance",
  "Music",
  "Dramatics",
  "Fine Arts",
  "Photography",
  "Technical",
  "Other",
];

const PARTICIPATION_TYPES = ["Solo", "Duo", "Team"];

// Team member details
const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    roll_no: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 30,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      validate: {
        validator(value) {
          return (
            !value ||
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          );
        },
        message: "Please enter a valid team member email.",
      },
    },
  },
  { _id: false }
);

// Participation information for each selected event
const eventEntrySchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      enum: EVENT_OPTIONS,
    },
    participationType: {
      type: String,
      required: true,
      enum: PARTICIPATION_TYPES,
      default: "Solo",
    },
    teamName: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    members: {
      type: [memberSchema],
      default: [],
    },
  },
  { _id: false }
);

// Main registration model
const registrationSchema = new mongoose.Schema(
  {
    // Primary participant
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    roll_no: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 30,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    year: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    // Selected events
    events: {
      type: [
        {
          type: String,
          enum: EVENT_OPTIONS,
        },
      ],
      required: true,
      validate: [
        {
          validator(value) {
            return Array.isArray(value) && value.length > 0;
          },
          message: "At least one event must be selected.",
        },
        {
          validator(value) {
            return (
              Array.isArray(value) &&
              new Set(value).size === value.length
            );
          },
          message: "Duplicate events are not allowed.",
        },
      ],
    },
    multipleEvents: {
      type: Boolean,
      default: false,
    },

    // Current frontend and route use eventEntries
    eventEntries: {
      type: [eventEntrySchema],
      required: true,
      validate: {
        validator(entries) {
          if (!Array.isArray(entries) || entries.length === 0) {
            return false;
          }

          const eventNames = entries.map(
            (entry) => entry.eventName
          );

          return new Set(eventNames).size === eventNames.length;
        },
        message:
          "Each selected event must have one unique entry.",
      },
    },

    // Legacy fields retained for compatibility with older records
    // and any existing admin code that still reads these properties.
    participationType: {
      type: String,
      enum: [...PARTICIPATION_TYPES, null],
      default: undefined,
    },
    teamName: {
      type: String,
      trim: true,
      default: "",
    },
    members: {
      type: [memberSchema],
      default: undefined,
    },

    // Event-specific submissions
    trackLink: {
      type: String,
      trim: true,
      default: "",
    },
    imageLinks: {
      type: [String],
      default: [],
    },
    fineArtLinks: {
      type: [String],
      default: [],
    },

    // Participant confirmation
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Admin dashboard fields
    adminStatus: {
      type: String,
      default: "Pending",
      trim: true,
    },
    scores: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },
    lastUpdatedBy: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Keep the saved multipleEvents value consistent with events.
registrationSchema.pre("validate", function () {
  if (Array.isArray(this.events)) {
    this.multipleEvents = this.events.length > 1;
  }
});

// Prevent the same student from submitting multiple registrations.
// Remove this index if your event rules permit multiple registrations
// from the same roll number.
registrationSchema.index(
  { roll_no: 1 },
  { unique: true, name: "unique_registration_roll_no" }
);

module.exports =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
