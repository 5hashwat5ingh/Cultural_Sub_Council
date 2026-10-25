
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");

// This file must exist if OTP authentication is handled separately.
// If your OTP routes are already inside adminRoutes.js, remove this import
// and the corresponding app.use("/api/admin/auth", adminAuthRoutes) below.
const adminAuthRoutes = require("./routes/adminAuth");

const app = express();

app.disable("x-powered-by");

const PORT = Number(process.env.PORT) || 5000;

const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Validate required environment variables.
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters.");
}

if (!ADMIN_EMAIL) {
  throw new Error("ADMIN_EMAIL is missing from environment variables.");
}

if (!CLIENT_URL) {
  throw new Error("CLIENT_URL is missing from environment variables.");
}

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

// Allowed frontend origins.
const allowedOrigins = [
  CLIENT_URL,
  "https://cultural-sub-council-ay5bp7d48.vercel.app",
  "https://cultural-sub-council-seven.vercel.app",
  "https://cultural-sub-council-git-main-shashwat-singhs-projects-663f3556.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
]
  .filter(Boolean)
  .map((origin) => origin.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header may include health checks
      // or server-to-server requests.
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      console.error("CORS blocked origin:", origin);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Root endpoint.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "HEATS Registration API is running.",
    health: "/api/health",
  });
});

// Health endpoint.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "HEATS Registration API",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Reuse the MongoDB connection between serverless invocations.
let dbConnectionPromise = null;

async function ensureDatabaseConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((error) => {
      dbConnectionPromise = null;
      throw error;
    });
  }

  await dbConnectionPromise;
}

// Ensure MongoDB is connected before processing API requests.
app.use("/api", async (req, res, next) => {
  try {
    await ensureDatabaseConnection();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    return res.status(503).json({
      message: "Database temporarily unavailable.",
    });
  }
});

// API routes.
app.use("/api/registrations", registrationRoutes);

// Admin OTP authentication routes:
// POST /api/admin/auth/request-otp
// POST /api/admin/auth/verify-otp
// POST /api/admin/auth/logout
app.use("/api/admin/auth", adminAuthRoutes);

// Existing admin management routes.
app.use("/api/admin", adminRoutes);

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
    method: req.method,
    path: req.originalUrl,
  });
});

// Central error handler.
app.use((error, req, res, next) => {
  console.error("API error:", error);

  if (res.headersSent) {
    return next(error);
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Invalid JSON request body.",
    });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({
      message: "Request body is too large.",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Request validation failed.",
    });
  }

  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      message: "Origin not allowed.",
    });
  }

  return res.status(500).json({
    message: "Internal server error.",
  });
});

// Export the Express app for Vercel.
module.exports = app;

// Start a persistent server when running locally.
if (require.main === module) {
  ensureDatabaseConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`HEATS API running at http://localhost:${PORT}`);
        console.log(`Frontend origin: ${CLIENT_URL}`);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error.message);
      process.exitCode = 1;
    });
}
