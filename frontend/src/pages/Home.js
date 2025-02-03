import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import ReplyIcon from '@mui/icons-material/Reply';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Modal styles
const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: "80%",
  maxWidth: "500px",
};

const ProductCard = ({ product, onHover }) => {
  const imageSrc = useMemo(
    () =>
      product.image
        ? `http://localhost:9000/uploads/${product.image}`
        : "/default-image.jpg",
    [product.image]
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 345,
        minHeight: 50,
        boxShadow: 3,
        borderRadius: 2,
        position: "relative",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 8,
        },
      }}
      onClick={() => onHover(product)}
    >
      <CardMedia
        component="img"
        image={imageSrc}
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
    </Card>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(
        addToCart({
          id: product._id,
          title: product.title,
          image: product.image,
          description: product.description,
          price: product.price,
        })
      );
    },
    [dispatch]
  );

  const handleModalClose = () => setHoveredProduct(null);

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Welcome to Our Store
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={4} key={product._id}>
              <ProductCard product={product} onHover={setHoveredProduct} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal for hovered product */}
      <Modal
        open={!!hoveredProduct}
        onClose={handleModalClose}
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
      >
        <Box sx={modalStyles}>
          {hoveredProduct && (
            <>
              <Typography id="product-modal-title" variant="h6">
                {hoveredProduct.title}
              </Typography>
              <CardMedia
                component="img"
                image={`http://localhost:9000/uploads/${hoveredProduct.image}`}
                alt={hoveredProduct.title}
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  mb: 2,
                }}
              />
              <Typography
                id="product-modal-description"
                variant="body1"
                sx={{ fontSize: "12px" }}
              >
                {hoveredProduct.description}
              </Typography>
              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button variant="contained" onClick={handleModalClose}>
                <ReplyIcon/>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFA41C', 
                    color: '#111',             
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#F08804', 
                    },
                  }}
                  onClick={() => handleAddToCart(hoveredProduct)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "secondary.main", color: "white" }}
                  onClick={() => navigate("/cart")}
                >
                <ShoppingCartIcon/>
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
