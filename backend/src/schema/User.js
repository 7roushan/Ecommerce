const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[6-9]\d{9}$/.test(value.toString());
      },
      message:
        "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits long",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return value.endsWith("@gmail.com");
      },
      message: "Email must end with @gmail.com",
    },
  },

  location: { type: String, required: true },
  profileImage: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[1-9]\d{5}$/.test(value.toString());
      },
      message: "Pincod must be 6 digits",
    },
  },
  password: { type: String, required: [true, "Password is required"] },
  confirmpassword: {
    type: String,
    required: [true, "Confirm password is required"],
  },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
