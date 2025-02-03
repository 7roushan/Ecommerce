import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { loginUser, clearNotification } from "../slices/authSlice"; // remove setuser
import Sec1 from "../components/Sec1";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, severity, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(form)).unwrap();
      const { token } = response;

      saveCredentials(token);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const saveCredentials = (token) => {
    localStorage.setItem("token", token);
  };

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Box>
    <Box sx={{ p: 4 }} > <Sec1 /></Box>
    <Box sx={{ p:3,maxWidth: 400, mx: "auto" }}>
       
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Typography my={3} textAlign="right">
          I already have an account <a href="/reg">Register now</a>
        </Typography>
      </form>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
    </Box>
  );
};

export default Login;
