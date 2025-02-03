import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProduct } from "../slices/productSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@mui/material";

const EditProduct = () => {
  const { productId } = useParams(); // Access productId from the route
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    category: "",
    discount: "",
    price: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/products/${productId}`);
        const data = await response.json();
        setProductData({
          title: data.title,
          description: data.description,
          brand: data.brand,
          model: data.model,
          color: data.color,
          category: data.category,
          discount: data.discount,
          price: data.price,
          image: null, // File upload will be handled separately
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = new FormData();
  
    Object.keys(productData).forEach((key) => {
      if (key === "image" && productData.image) {
        // Append the image file only if it's provided
        updatedData.append(key, productData[key]);
      } else if (productData[key] !== "") {
        // Append only fields with new values
        updatedData.append(key, productData[key]);
      }
    });
  
    dispatch(editProduct({ id: productId, updatedData }))
      .then(() => {
        navigate("/products"); // Redirect to the product list after editing
      })
      .catch((err) => console.error("Failed to update product:", err));
  };
   if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={productData.model}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Discount"
              name="discount"
              type="number"
              value={productData.discount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
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
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProduct;
