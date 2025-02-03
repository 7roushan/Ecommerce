const express = require("express");
const router = express.Router();
const upload = require("../middleware/uplodefolder");

const {
  getItems,
  addItem,
  editItem,
  deleteItem,
} = require("../controller/userController");

// Get all products
router.get("/", getItems);

// Add a new product
router.post("/add", upload.single("image"), addItem);

// Edit a product
router.put("/edit/:id", upload.single("image"), editItem);

// Delete a product
router.delete("/delete/:id", deleteItem);

module.exports = router;
