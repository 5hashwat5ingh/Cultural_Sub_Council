
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const adminAuthRoutes = require("./routes/adminAuth");
const adminRoutes = require("./routes/adminRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

app.disable("x-powered-by");

const PORT = Number(process.env.PORT) || 5000;

// Validate required environment variables.
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters.");
}

if (!process.env.ADMIN_EMAIL) {
  throw new Error("ADMIN_EMAIL is missing from environment variables.");
}

if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is missing from environment variables.");
}

// Allowed frontend origins.
const allowedOrigins = [
  process.env.CLIENT_URL,
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

// Reuse MongoDB connection between requests.
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

// Connect to MongoDB before processing API requests.
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

// Registration routes.
app.use("/api/registrations", registrationRoutes);

// Admin authentication routes.
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

// Export the app for Vercel or other hosting platforms.
module.exports = app;

// Start a server when running locally.
if (require.main === module) {
  ensureDatabaseConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`HEATS API running at http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Server startup failed:", error.message);
      process.exitCode = 1;
    });
}
