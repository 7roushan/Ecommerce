import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import { registerUser, clearNotification } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const formFields = {
  personal: [
    { label: "First Name", name: "firstname", required: true },
    { label: "Last Name", name: "lastname", required: true },
    { label: "Phone", name: "phone", type: "number", required: true },
    { label: "Email", name: "email", type: "email", required: true },
  ],
  location: [
    {
      name: "location",
      label: "Building/Street/Society",
      fullWidth: true,
      required: true,
    },
    { name: "city", label: "City", required: true },
    { name: "district", label: "District", required: true },
    { name: "state", label: "State", required: true },
    { name: "pincode", label: "Pincode", type: "number", required: true },
  ],
  security: [
    { label: "Password", name: "password", type: "password", required: true },
    {
      label: "Confirm Password",
      name: "confirmpassword",
      type: "password",
      required: true,
    },
  ],
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, severity, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState(() =>
    Object.values(formFields)
      .flat()
      .reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {})
  );
  const [profileImage, setProfileImage] = useState(null); // State for the image
  const [errors, setErrors] = useState({}); // To store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};

    Object.values(formFields)
      .flat()
      .forEach(({ name, required }) => {
        if (required && !form[name]) {
          newErrors[name] = "This field is required";
        }
      });

    // Validate pincode
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    // Validate email format
    if (form.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Validate phone number
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Validate passwords
    if (form.password !== form.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    dispatch(registerUser(data)).then((response) => {
      if (response.type === "register/registerUser/fulfilled") {
        window.location.reload();
        navigate("/login");
      }
    });
  };

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        {Object.keys(formFields).map((section) => (
          <Box key={section} sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Typography>
            <Grid container spacing={2}>
              {formFields[section].map(
                ({ label, name, type = "text", required, fullWidth }) => (
                  <Grid item xs={12} sm={fullWidth ? 12 : 6} key={name}>
                    <TextField
                      label={label}
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange}
                      fullWidth
                      required={required}
                      disabled={loading}
                      error={Boolean(errors[name])}
                      helperText={errors[name] || ""}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        ))}

        <Box my={3}>
          <Button variant="outlined" component="label">
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {profileImage && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {profileImage.name}
            </Typography>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
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
  );
};

export default Register;
