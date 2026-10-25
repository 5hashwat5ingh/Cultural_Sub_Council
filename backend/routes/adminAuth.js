const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  Send,
  Verify,
  Logout,
} = require("../controllers/adminOtpController");

const router = express.Router();

const requestOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many OTP requests. Try again later.",
  },
});

const verifyOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many verification attempts. Try again later.",
  },
});

router.post("/request-otp", requestOtpLimiter, Send);
router.post("/verify-otp", verifyOtpLimiter, Verify);
router.post("/logout", Logout);

module.exports = router;