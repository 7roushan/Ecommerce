import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import token from "../pages/ProtectedRoute"

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  

  const handleBuyNowClick = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
        position: "relative", // Ensure button placement works
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={
          product.image
            ? `http://localhost:9000/uploads/${product.image}`
            : "/default-image.jpg"
        }
        alt={product.title}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />

      {/* Product Content */}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <CurrencyRupeeIcon color="primary" sx={{ mr: 0.5 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.price}
          </Typography>
        </Box>
      </CardContent>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          position: "relative",
        }}
      ></Box>

      {/* Buy Now Button (Visible on Hover) */}
      {isHovered && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            position: "absolute",
            bottom: "16px",
            right: "16px",
          }}
          onClick={handleBuyNowClick} // Use the new handler
        >
          Buy Now
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
