const RegistrationSetting = require("../models/RegistrationSetting");

const requireRegistrationOpen = async (req, res, next) => {
  try {
    const setting = await RegistrationSetting.findOne({
      key: "global",
    }).lean();

    // Default to OPEN if no setting exists yet.
    if (setting && setting.registrationOpen === false) {
      return res.status(403).json({
        success: false,
        registrationOpen: false,
        message: "Registrations for HEATS '26 are currently closed.",
      });
    }

    next();
  } catch (error) {
    console.error("Registration status middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify registration status.",
    });
  }
};

module.exports = { requireRegistrationOpen };