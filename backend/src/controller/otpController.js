const Otp = require("../schema/otp"); // Import the Otp model
const nodemailer = require("nodemailer");
require("dotenv").config(); // To access environment variables

// Function to generate a 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
};

// Configure Nodemailer for sending emails
const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your app password
  },
});

// Controller to handle OTP requests
const sendOtp = async (req, res) => {
  const { email } = req.body;

  // Validate the email field
  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
    // Generate a new OTP
    const otp = generateOTP();

    // Save the OTP to the database
    const newOtp = new Otp({
      email: email,
      otp: otp,
    });

    await newOtp.save();

    // Prepare the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h4>Your OTP code is: <b>${otp}</b></h4>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    // Send the email
    mailer.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ success: false, message: "Failed to send OTP email." });
      }

      console.log("Email sent:", info.response);
      return res.status(200).json({ success: true, message: "OTP sent to your email address." });
    });
  } catch (err) {
    console.error("Error in sendOtp:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


// Controller to verify OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }
  
    try {
      // Find the OTP document in the database
      const otpRecord = await Otp.findOne({ email, otp });
  
      if (!otpRecord) {
        return res.status(400).json({ success: false, message: "Invalid OTP or email." });
      }
  
      // Check if the OTP has expired
      const currentTime = new Date();
      const timeDifference = (currentTime - otpRecord.timestamp) / 1000; // in seconds
  
      if (timeDifference > 300) { // 300 seconds = 5 minutes
        await Otp.deleteOne({ _id: otpRecord._id }); // Remove expired OTP
        return res.status(400).json({ success: false, message: "OTP has expired." });
      }
  
      // OTP is valid
      await Otp.deleteOne({ _id: otpRecord._id }); // Delete OTP after verification
      return res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (err) {
      console.error("Error in verifyOtp:", err);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  };

module.exports = { sendOtp , verifyOtp};
