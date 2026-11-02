const mongoose = require("mongoose");

const registrationSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
      required: true,
    },

    registrationOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RegistrationSetting",
  registrationSettingSchema
);