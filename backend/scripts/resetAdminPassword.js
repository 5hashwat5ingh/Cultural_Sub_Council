
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

async function resetAdminPassword() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "HEATS Administrator";

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from backend/.env");
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters");
  }

  if (!email) {
    throw new Error("ADMIN_EMAIL is missing from backend/.env");
  }

  if (!password || password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await Admin.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          passwordHash,
          active: true
        }
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    console.log("Admin credentials reset successfully.");
    console.log("Authorized email:", admin.email);
    console.log("Password hash updated. Password was not displayed.");
  } finally {
    await mongoose.disconnect();
  }
}

resetAdminPassword().catch((error) => {
  console.error("Admin password reset failed:", error.message);
  process.exitCode = 1;
});
