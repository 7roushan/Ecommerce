const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getLoggedInUser,
  
} = require("../controller/rcontroller"); // Ensure the path is correct
const upload = require("../middleware/uplodefolder");

// Routes
router.post("/register", upload.single("profileImage"), registerUser); // Handle user registration
router.post("/login", loginUser); // Handle user login
router.get("/", getAllUsers); // Fetch all users
router.put("/:id", updateUser); // Update user details
router.delete("/:id", deleteUser); // Delete a user
router.get("/me", getLoggedInUser); // Fetch the logged-in user's data


module.exports = router;
