import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { TextField, Button, Container, Grid } from "@mui/material";
import { addProduct } from "../slices/productSlice";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    category: "",
    discount: "",
    price: "",
    image: null,
    imagePreview: null, // State for previewing the uploaded image
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file), // Generate a preview URL
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData)); // Dispatch the add product action
    navigate("/products"); // Navigate to the /products page after form submission
  };

  return (
    <Container maxWidth="sm">
      <h2>Add Product</h2> 
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Brand"
              fullWidth
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Model"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Color"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Discount"
              fullWidth
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              fullWidth
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              size="large"
            >
              Upload Image
              <input
                type="file"
                name="image"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Grid>

          {/* Preview box for the uploaded image */}
          {formData.imagePreview && (
            <Grid item xs={12}>
              <div
                style={{
                  width: "200px",
                  height: "100px",
                  borderRadius:"60% 40%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button  variant="contained" color="primary" fullWidth type="submit">
              Add Product
            </Button>

            <Button sx={{my:2}}
              variant="contained"
              color="secondary"
              onClick={() => navigate("/products")} // Navigate to root when clicked
            >
              list
            </Button>

          </Grid>

         
        </Grid>
      </form>
    </Container>
  );
};

export default AddProductForm;
