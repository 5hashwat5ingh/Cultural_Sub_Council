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

function isValidDriveLink(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["drive.google.com", "docs.google.com"].includes(
        url.hostname
      )
    );
  } catch {
    return false;
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateMember(member) {
  if (!member || typeof member !== "object" || Array.isArray(member)) {
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
    email &&
    (typeof email !== "string" || !isValidEmail(email.trim()))
  ) {
    return `Enter a valid email address for ${name.trim()}.`;
  }

  return null;
}

router.post("/", async (req, res) => {
  try {
    const {
      name,
      roll_no,
      branch,
      phone,
      email,
      events,
      eventEntries,
      trackLink,
      imageLinks,
      fineArtLinks,
      confirmed,
    } = req.body || {};

    // Validate main participant
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

    if (roll_no.trim().length > 30) {
      return res.status(400).json({
        message: "Roll number must not exceed 30 characters.",
      });
    }

    if (branch.trim().length > 100) {
      return res.status(400).json({
        message: "Branch must not exceed 100 characters.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        message: "Enter a valid email address.",
      });
    }

    // Validate selected events
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

    // Require one entry per selected event
    if (
      !Array.isArray(eventEntries) ||
      eventEntries.length !== events.length ||
      eventEntries.some(
        (entry) =>
          !entry ||
          typeof entry !== "object" ||
          Array.isArray(entry) ||
          !events.includes(entry.eventName)
      ) ||
      new Set(eventEntries.map((entry) => entry.eventName)).size !==
        events.length ||
      events.some(
        (event) =>
          !eventEntries.some((entry) => entry.eventName === event)
      )
    ) {
      return res.status(400).json({
        message:
          "Participation details are required for every selected event.",
      });
    }

    const cleanEventEntries = [];

    for (const entry of eventEntries) {
      const {
        eventName,
        participationType,
        teamName,
        members,
      } = entry;

      if (!ALLOWED_TYPES.includes(participationType)) {
        return res.status(400).json({
          message: `Choose a valid participation type for ${eventName}.`,
        });
      }

      if (
        SOLO_ONLY_EVENTS.includes(eventName) &&
        participationType !== "Solo"
      ) {
        return res.status(400).json({
          message: `${eventName} only allows Solo participation.`,
        });
      }

      const group = ["Duo", "Team"].includes(participationType);
      const cleanTeamName =
        typeof teamName === "string" ? teamName.trim() : "";

      if (group && !cleanTeamName) {
        return res.status(400).json({
          message: `A team name is required for ${eventName}.`,
        });
      }

      if (
        !Array.isArray(members) ||
        members.length > 19
      ) {
        return res.status(400).json({
          message: `Invalid member list for ${eventName}.`,
        });
      }

      if (participationType === "Solo" && members.length !== 0) {
        return res.status(400).json({
          message: `Solo participation for ${eventName} cannot include additional members.`,
        });
      }

      if (
        participationType === "Duo" &&
        members.length !== 1
      ) {
        return res.status(400).json({
          message: `A Duo for ${eventName} must have exactly one partner.`,
        });
      }

      if (
        participationType === "Team" &&
        members.length < 2
      ) {
        return res.status(400).json({
          message: `A Team for ${eventName} must have at least two additional members.`,
        });
      }

      const cleanMembers = [];

      for (const member of members) {
        const error = validateMember(member);

        if (error) {
          return res.status(400).json({
            message: `${eventName}: ${error}`,
          });
        }

        cleanMembers.push({
          name: member.name.trim(),
          roll_no: member.roll_no.trim().toUpperCase(),
          branch: member.branch.trim(),
          phone: member.phone.trim(),
          email:
            typeof member.email === "string"
              ? member.email.trim().toLowerCase()
              : "",
        });
      }

      cleanEventEntries.push({
        eventName,
        participationType,
        teamName: group ? cleanTeamName : "",
        members: cleanMembers,
      });
    }

    // Dance audio
    let cleanTrackLink = "";

    if (events.includes("Dance")) {
      if (
        typeof trackLink !== "string" ||
        !isGoogleDriveLink(trackLink.trim())
      ) {
        return res.status(400).json({
          message:
            "Provide an HTTPS Google Drive link for the Dance audio.",
        });
      }

      cleanTrackLink = trackLink.trim();
    }

    // Photography links
    let cleanImageLinks = [];

    if (events.includes("Photography")) {
      if (
        !Array.isArray(imageLinks) ||
        imageLinks.length < 1 ||
        imageLinks.length > 10 ||
        imageLinks.some(
          (link) =>
            typeof link !== "string" ||
            !isGoogleDriveLink(link.trim())
        )
      ) {
        return res.status(400).json({
          message:
            "Provide 1 to 10 valid HTTPS Google Drive links for Photography.",
        });
      }

      cleanImageLinks = imageLinks.map((link) => link.trim());
    }

    // Fine Arts links
    let cleanFineArtLinks = [];

    if (events.includes("Fine Arts")) {
      if (
        !Array.isArray(fineArtLinks) ||
        fineArtLinks.length < 1 ||
        fineArtLinks.length > 5 ||
        fineArtLinks.some(
          (link) =>
            typeof link !== "string" ||
            !isGoogleDriveLink(link.trim())
        )
      ) {
        return res.status(400).json({
          message:
            "Provide 1 to 5 valid HTTPS Google Drive links for Fine Arts.",
        });
      }

      cleanFineArtLinks = fineArtLinks.map((link) => link.trim());
    }

    if (confirmed !== true) {
      return res.status(400).json({
        message: "Please confirm your registration details.",
      });
    }

    // Save registration
    const registration = await Registration.create({
      name: name.trim(),
      roll_no: roll_no.trim().toUpperCase(),
      branch: branch.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      events,
      multipleEvents: events.length > 1,
      eventEntries: cleanEventEntries,
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
          "A registration with these details already exists.",
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
      message:
        "Could not save registration. Please try again later.",
    });
  }
});

module.exports = router;