require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.disable("x-powered-by");

const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters.");
}

if (!process.env.ADMIN_EMAIL) {
  throw new Error("ADMIN_EMAIL is missing from environment variables.");
}

if (!CLIENT_URL) {
  throw new Error("CLIENT_URL is missing from environment variables.");
}
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:5174",
  "http://localhost:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5173",
].filter(Boolean).map((origin) => origin.replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "HEATS Registration API is running.",
    health: "/api/health",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "HEATS Registration API",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Reuse the MongoDB connection across requests.
let dbConnectionPromise;

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

// Connect to MongoDB before handling API requests.
app.use("/api", async (req, res, next) => {
  try {
    await ensureDatabaseConnection();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(503).json({
      message: "Database temporarily unavailable.",
    });
  }
});

app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
    method: req.method,
    path: req.originalUrl,
  });
});

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

  return res.status(500).json({
    message: "Internal server error.",
  });
});

// Export the Express application for Vercel.
module.exports = app;

// Start a persistent server only when running locally.
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