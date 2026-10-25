
const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

const ALLOWED_EVENTS = [
  "Dance",
  "Music",
  "Dramatics",
  "Fine Arts",
  "Photography",
  "Technical",
  "Other",
];

const SOLO_ONLY_EVENTS = [
  "Music",
  "Fine Arts",
  "Photography",
  "Technical",
  "Other",
];

const ALLOWED_TYPES = ["Solo", "Duo", "Team"];

// Validate a Google Drive URL.
function isGoogleDriveLink(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value.trim());

    return (
      url.protocol === "https:" &&
      ["drive.google.com", "docs.google.com"].includes(
        url.hostname.toLowerCase()
      )
    );
  } catch {
    return false;
  }
}

// Validate an email address.
function isValidEmail(value) {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

// Validate an array of Google Drive links.
function validateDriveLinks(value, min, max, label) {
  if (!Array.isArray(value)) {
    return {
      error: `${label} links must be provided as a list.`,
      links: [],
    };
  }

  const links = value.map((link) =>
    typeof link === "string" ? link.trim() : ""
  );

  if (links.length < min || links.length > max) {
    return {
      error: `${label} requires ${min} to ${max} Google Drive links.`,
      links: [],
    };
  }

  if (links.some((link) => !isGoogleDriveLink(link))) {
    return {
      error: `Every ${label} submission must be a valid Google Drive link.`,
      links: [],
    };
  }

  return { error: null, links };
}

// Validate team member details.
function validateMember(member) {
  if (
    !member ||
    typeof member !== "object" ||
    Array.isArray(member)
  ) {
    return "Invalid team member details.";
  }

  const { name, roll_no, branch, phone, email = "" } = member;

  if (
    ![name, roll_no, branch, phone].every(
      (value) => typeof value === "string" && value.trim()
    )
  ) {
    return "Every team member needs a name, roll number, branch, and phone.";
  }

  if (
    name.trim().length > 100 ||
    roll_no.trim().length > 30 ||
    branch.trim().length > 100
  ) {
    return "Team member details exceed the allowed length.";
  }

  if (!/^[6-9]\d{9}$/.test(phone.trim())) {
    return `Enter a valid 10-digit phone number for ${name.trim()}.`;
  }

  if (
    typeof email !== "string" ||
    (email.trim() && !isValidEmail(email))
  ) {
    return `Enter a valid email address for ${name.trim()}.`;
  }

  return null;
}

// POST /api/registrations
router.post("/", async (req, res) => {
  try {
    const {
      name,
      roll_no,
      branch,
      year,
      phone,
      email,
      events,
      eventEntries,
      trackLink,
      imageLinks,
      fineArtLinks,
      confirmed,
    } = req.body || {};

    // Validate primary participant details.
    if (
      ![name, roll_no, branch, phone, email].every(
        (value) => typeof value === "string" && value.trim()
      )
    ) {
      return res.status(400).json({
        message:
          "Name, roll number, branch, phone, and email are required.",
      });
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        message: "Name must be between 2 and 100 characters.",
      });
    }

    if (roll_no.trim().length > 30 || branch.trim().length > 100) {
      return res.status(400).json({
        message: "Roll number or branch exceeds the allowed length.",
      });
    }

    if (typeof year !== "undefined" && typeof year !== "string") {
      return res.status(400).json({
        message: "Year must be text.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Enter a valid email address.",
      });
    }

    // Validate selected events.
    if (
      !Array.isArray(events) ||
      events.length === 0 ||
      events.some((event) => !ALLOWED_EVENTS.includes(event)) ||
      new Set(events).size !== events.length
    ) {
      return res.status(400).json({
        message: "Select one or more valid, unique events.",
      });
    }

    // Accept either "event" or "eventName" from the frontend.
    // Store the field as "event" to match Registration.js.
    if (
      !Array.isArray(eventEntries) ||
      eventEntries.length !== events.length
    ) {
      return res.status(400).json({
        message:
          "Participation details are required for every selected event.",
      });
    }

    const normalizedEntries = eventEntries.map((entry) => {
      if (
        !entry ||
        typeof entry !== "object" ||
        Array.isArray(entry)
      ) {
        return null;
      }

      return {
        event: entry.event || entry.eventName,
        participationType: entry.participationType,
        teamName: entry.teamName,
        members: entry.members,
      };
    });

    if (
      normalizedEntries.some(
        (entry) => !entry || !events.includes(entry.event)
      ) ||
      new Set(normalizedEntries.map((entry) => entry.event)).size !==
        events.length ||
      events.some(
        (event) =>
          !normalizedEntries.some((entry) => entry.event === event)
      )
    ) {
      return res.status(400).json({
        message:
          "Participation details are required for every selected event.",
      });
    }

    // Validate each event's participation details.
    const cleanEventEntries = [];

    for (const entry of normalizedEntries) {
      const { event, participationType, teamName, members } = entry;

      if (!ALLOWED_TYPES.includes(participationType)) {
        return res.status(400).json({
          message: `Choose a valid participation type for ${event}.`,
        });
      }

      if (
        SOLO_ONLY_EVENTS.includes(event) &&
        participationType !== "Solo"
      ) {
        return res.status(400).json({
          message: `${event} only allows Solo participation.`,
        });
      }

      const isGroup = ["Duo", "Team"].includes(participationType);
      const cleanTeamName =
        typeof teamName === "string" ? teamName.trim() : "";

      if (isGroup && !cleanTeamName) {
        return res.status(400).json({
          message: `A team name is required for ${event}.`,
        });
      }

      if (cleanTeamName.length > 100) {
        return res.status(400).json({
          message: `Team name for ${event} is too long.`,
        });
      }

      if (!Array.isArray(members) || members.length > 19) {
        return res.status(400).json({
          message: `Invalid member list for ${event}.`,
        });
      }

      if (participationType === "Solo" && members.length !== 0) {
        return res.status(400).json({
          message: `Solo participation for ${event} cannot include extra members.`,
        });
      }

      if (participationType === "Duo" && members.length !== 1) {
        return res.status(400).json({
          message: `A Duo for ${event} must have exactly one partner.`,
        });
      }

      if (participationType === "Team" && members.length < 2) {
        return res.status(400).json({
          message: `A Team for ${event} must have at least two additional members.`,
        });
      }

      const cleanMembers = [];

      for (const member of members) {
        const memberError = validateMember(member);

        if (memberError) {
          return res.status(400).json({
            message: `${event}: ${memberError}`,
          });
        }

        cleanMembers.push({
          name: member.name.trim(),
          roll_no: member.roll_no.trim().toUpperCase(),
          branch: member.branch.trim(),
          phone: member.phone.trim(),
          email: (member.email || "").trim().toLowerCase(),
        });
      }

      cleanEventEntries.push({
        event,
        participationType,
        teamName: isGroup ? cleanTeamName : "",
        members: cleanMembers,
      });
    }

    // Dance: exactly one Google Drive audio link.
    let cleanTrackLink = "";

    if (events.includes("Dance")) {
      if (!isGoogleDriveLink(trackLink)) {
        return res.status(400).json({
          message: "Dance requires a valid Google Drive audio link.",
        });
      }

      cleanTrackLink = trackLink.trim();
    }

    // Photography: 1–10 Google Drive links.
    let cleanImageLinks = [];

    if (events.includes("Photography")) {
      const result = validateDriveLinks(
        imageLinks,
        1,
        10,
        "Photography"
      );

      if (result.error) {
        return res.status(400).json({
          message: result.error,
        });
      }

      cleanImageLinks = result.links;
    }

    // Fine Arts: 1–5 Google Drive links.
    let cleanFineArtLinks = [];

    if (events.includes("Fine Arts")) {
      const result = validateDriveLinks(
        fineArtLinks,
        1,
        5,
        "Fine Arts"
      );

      if (result.error) {
        return res.status(400).json({
          message: result.error,
        });
      }

      cleanFineArtLinks = result.links;
    }

    // Require the participant to confirm the registration.
    if (confirmed !== true) {
      return res.status(400).json({
        message: "Please confirm your registration details.",
      });
    }

    // Save the registration.
    const registration = await Registration.create({
      name: name.trim(),
      roll_no: roll_no.trim().toUpperCase(),
      branch: branch.trim(),
      year: typeof year === "string" ? year.trim() : "",
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      events,
      multipleEvents: events.length > 1,
      eventEntries: cleanEventEntries,

      // Only these three events use Drive submissions.
      trackLink: cleanTrackLink,
      imageLinks: cleanImageLinks,
      fineArtLinks: cleanFineArtLinks,

      confirmed: true,
    });

    return res.status(201).json({
      message: "Registration submitted successfully.",
      registrationId: registration._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "A registration with this roll number already exists.",
      });
    }

    if (error.name === "ValidationError") {
      console.error("Registration validation error:", error.message);

      return res.status(400).json({
        message: "Some registration details are invalid.",
        ...(process.env.NODE_ENV !== "production" && {
          details: error.message,
        }),
      });
    }

    console.error("Registration save error:", error);

    return res.status(500).json({
      message: "Could not save registration. Please try again later.",
    });
  }
});

module.exports = router;
