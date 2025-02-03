import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#0F1111", color: "#fff", paddingTop: 5, paddingBottom: 3 }}>
      <Grid container spacing={4} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* First Column - Useful Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Quick Links</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>About Us</Link>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>Contact Us</Link>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>Privacy Policy</Link>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>Terms of Service</Link>
          </Box>
        </Grid>

        {/* Second Column - Customer Support */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Customer Support</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>FAQ</Link>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>Returns & Exchanges</Link>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>Shipping</Link>
            <Link href="#" sx={{ display: "block", color: "#B0B0B0", textDecoration: "none", marginBottom: 1 }}>Track Order</Link>
          </Box>
        </Grid>

        {/* Third Column - Social Media Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Follow Us</Typography>
          <Box sx={{ marginTop: 2 }}>
            <IconButton color="inherit" sx={{ marginRight: 2 }}>
              <Facebook />
            </IconButton>
            <IconButton color="inherit" sx={{ marginRight: 2 }}>
              <Instagram />
            </IconButton>
            <IconButton color="inherit" sx={{ marginRight: 2 }}>
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <YouTube />
            </IconButton>
          </Box>
        </Grid>

        {/* Fourth Column - Contact Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Contact Us</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography sx={{ color: "#B0B0B0" }}>Phone: +123 456 7890</Typography>
            <Typography sx={{ color: "#B0B0B0" }}>Email: support@yourstore.com</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box sx={{ textAlign: "center", marginTop: 5, paddingTop: 2, borderTop: "1px solid #B0B0B0" }}>
        <Typography sx={{ color: "#B0B0B0", fontSize: "0.875rem" }}>
          &copy; 2025 Your Store. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
