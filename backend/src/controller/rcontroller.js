const User = require("../schema/User"); // Adjust the path if needed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





const registerUser = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    email,
    location,
    city,
    state,
    pincode,
    password,
    confirmpassword,
  } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      location,
      city,
      state,
      pincode,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });
    if (req.file) {
      newUser.profileImage = req.file.filename;
    }
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or phone already exists" });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log("Token received:", token);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      location,
      city,
      state,
      pincode,
      password,
      confirmpassword,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update only provided fields
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (city) user.city = city;
    if (state) user.state = state;
    if (pincode) user.pincode = pincode;

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (confirmpassword) {
      user.confirmpassword = await bcrypt.hash(confirmpassword, 10);
    }

    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      error: "An error occurred while updating the user",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.id).select(
      "-password -confirmpassword"
    ); // Exclude sensitive fields
    if (!user) return res.status(404).json({ error: "User not found" });

    // Send user data back to the client
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting logged-in user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
};

const genrateRandom4Digit = async () => {
  return Math.floor(1000 + Math.random() * 9000);
};




module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getLoggedInUser,
  
};
