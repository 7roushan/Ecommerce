const express = require("express");
const { sendOtp , verifyOtp } = require("../controller/otpController");
const router = express.Router();

// POST route to send OTP
router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

module.exports = router;
