import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  Login as LoginIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../slices/cartSlice";
import SearchBar from "../pages/SearchBar";

const drawerWidth = 240;

function Navbar({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Navigation items
  const getNavItems = () =>
    [
      !isLoggedIn && { label: <LoginIcon />, path: "/login" },
      isLoggedIn &&  { label: <HomeIcon />, path: "/home" },
      { label: <AccountCircleIcon />, path: "/userlist" },
      {
        label: (
          <>
            <ShoppingCartIcon sx={{ verticalAlign: "middle" }} /> ({cartCount})
          </>
        ),
        path: "/cart",
      },
    ].filter(Boolean);

  const getAuthItems = () =>
    isLoggedIn
      ? [
          { label: "UserList", path: "/userlist" },
          { label: "User Page", path: "/user" },
          { label: "Contact Us", path: "/contactus" },
          { label: "Logout", action: handleLogout },
        ]
      : [
          { label: "Register", path: "/register" },
          { label: "Login", path: "/login" },
        ];

  const renderNavItems = (items) =>
    items.map((item, index) => (
      <Button
        key={index}
        component={item.path ? Link : "button"}
        to={item.path}
        onClick={item.action || null}
        sx={{
          color: "#fff",
          ":hover": { color: "yellow" },
          fontSize: { xs: "10px", sm: "12px", md: "14px" },
        }}
      >
        {item.label}
      </Button>
    ));

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Store
      </Typography>
      <Divider />
      <List>
        {[...getNavItems(), ...getAuthItems()].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={item.path ? Link : "button"}
              to={item.path}
              onClick={item.action || null}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
           
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "black",
        
          borderRadius: { xs: "10px", sm: "15px", md: "20px" },
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Store
          </Typography>

          {/* Desktop Navigation Items */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {renderNavItems(getNavItems())}
          </Box>

          {/* Search Bar */}
           <Box
              sx={{ marginLeft: "auto", display: { xs: "none", sm: "block" } }}
            >
              <SearchBar />
            </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
