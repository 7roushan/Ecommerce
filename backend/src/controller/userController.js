const Product = require("../schema/product");

// Get all products
exports.getItems = async (req, res) => {
  try {
    const items = await Product.find();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Product.find();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: error.message });
  }
};

// Add a new product
exports.addItem = async (req, res) => {
  const { title, description, brand, model, color, category, discount, price } =
    req.body;

  try {
    const newItem = new Product({
      title,
      description,
      brand,
      price,
      model,
      color,
      category,
      discount,
      image: req.file ? req.file.filename : undefined,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item", error: error.message });
  }
};

// Edit an existing product
exports.editItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, brand, model, color, category, discount, price } =
    req.body;

  try {
    const updatedItem = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        brand,
        price,
        model,
        color,
        category,
        discount,
        image: req.file ? req.file.filename : undefined, // Update image if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update item", error: error.message });
  }
};

// Delete a product
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Product.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete item", error: error.message });
  }
};
  

exports.getItems = async (req, res) => {
  
  try {
    const search = req.query.search || ""; // Get the search term from query
    const regex = new RegExp(search, "i"); // Case-insensitive regex for search
    const products = await Product.find({
      $or: [
        { title: regex },
        { description: regex },
        { brand: regex },
        { category: regex },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};