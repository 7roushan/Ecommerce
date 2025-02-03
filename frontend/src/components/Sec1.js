import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import img from "../photo/img1.png";

const Sec1 = () => {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa" }}>
      <Grid
        container
        spacing={{ xs: 2 }}
        alignItems="center"
        justifyContent="space-evenly"
      >
        {/* Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={img}
            alt="Winter Collection"
            sx={{
              width: "100%",
              maxWidth: 350,
              borderRadius: 2,
              marginLeft: "30px",
            }}
          />
        </Grid>

        {/* Text Content */}
        <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
          <Typography
            variant="h4"
            color="primary"
            fontStyle="italic"
            gutterBottom
          >
            60% Discount
          </Typography>
          <Typography variant="h2" color="text.primary" gutterBottom>
            Winter Collection
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Best Cloth Collection By 2025!
          </Typography>
          <Typography variant="contained" color="primary" size="large">
            Shop Now
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sec1;
