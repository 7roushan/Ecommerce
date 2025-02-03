// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/userRoutes");
const userRoutes = require("./routes/RegisterRoutes")
const otpRoutes = require("./routes/otpRoutes"); 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use("/uploads", express.static("./uploads"));

// Product routes
app.use("/api/products", productRoutes);

//user routes 
 app.use("/api/users", userRoutes);

 // Use OTP routes
app.use("/api/otp", otpRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
