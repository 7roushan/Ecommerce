import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "../slices/productSlice";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Button,
  CardMedia,
  Box,
} from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (productId) => navigate(`/edit-product/${productId}`);
  const handleDelete = (productId) => dispatch(deleteProduct(productId));

  if (status === "loading") return <CircularProgress />;
  if (status === "failed") return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            color: "#343a40",
            fontWeight: "bold",
            mb: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Product List
        </Typography>

        {items.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#6c757d",
              background: "#f8f9fa",
              py: 3,
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            No products found. Add a new product to get started!
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {items.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  sx={{
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      product.image
                        ? `http://localhost:9000/uploads/${product.image}`
                        : "/default-image.jpg"
                    }
                    alt={product.title}
                    sx={{
                      height: 100,
                      width: "100%",
                      height: 150,
                      objectFit: "contain",
                      
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#495057",
                        textTransform: "capitalize",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        mb: 2,
                        fontSize: "0.9rem",
                        color: "#6c757d",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#007bff",
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      Price: ₹{product.price}
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(product._id)}
                        sx={{
                          backgroundColor: "#0d6efd",
                          "&:hover": {
                            backgroundColor: "#0056b3",
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(product._id)}
                        sx={{
                          backgroundColor: "#dc3545",
                          "&:hover": {
                            backgroundColor: "#b02a37",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add Product Button */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#198754",
              color: "#fff",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#157347",
              },
            }}
          >
            Add Product
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;
