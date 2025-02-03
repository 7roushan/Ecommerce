import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Sec1 from "../components/Sec1";
import ProductCard from "../pages/ProductCard";

const Home2 = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

 

  return (
    <Box>
      <Box sx={{ p: 4 }}>
        <Sec1 />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Welcome to Our Store
        </Typography>
        {status === "loading" && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        )}
        {status === "failed" && (
          <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
            Error: {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product}  />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home2;
