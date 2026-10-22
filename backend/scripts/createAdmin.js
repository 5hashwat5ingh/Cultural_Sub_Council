
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "HEATS Administrator";

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from .env.");
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Set JWT_SECRET to a unique secret of at least 32 characters.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Set a valid ADMIN_EMAIL in .env.");
  }

  if (!password || password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log(`Admin account already exists for ${email}.`);
      console.log("No password or account changes were made.");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      passwordHash,
      active: true
    });

    console.log(`Admin account created for ${email}.`);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin().catch((error) => {
  console.error("Could not create admin:", error.message);
  process.exitCode = 1;
});
