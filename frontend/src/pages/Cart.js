import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, deleteFromCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Use useEffect to reload the cart items on page load
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      storedCartItems.forEach((item) => {
        const existingProduct = cartProducts.find(
          (product) => product.id === item.id
        );
        if (!existingProduct) {
          dispatch(addToCart(item));
        }
      });
    }
  }, [dispatch, cartProducts]);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ id: productId }));
  };

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">
          Your Cart ({cartProducts.length} items)
        </Typography>
       
        <Button
          variant="contained"
          sx={{ borderRadius: 5,
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
          disabled={cartProducts.length === 0}
          onClick={() => navigate("/home")}
        >
           Proceed to Buy
        </Button>
      </Box>

      {/* Cart Items */}
      {cartProducts.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    product?.image
                      ? `http://localhost:9000/uploads/${product?.image}`
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
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{product.price} × {product.quantity}
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    In stock
                  </Typography>
                  {/* Actions */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <Add />
                    </IconButton>
                    <Typography>{product.quantity}</Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      <Remove />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteFromCart(product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Total Section */}
      {cartProducts.length > 0 && (
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>
          
        </Box>
      )}
    </Box>
  );
};

export default Cart;
