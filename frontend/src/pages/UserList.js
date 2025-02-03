import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Snackbar,
  Alert,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getAllUsers, deleteUser, updateUser } from "../api";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

// Reusable EditableField component
const EditableField = ({ name, label, value, onChange }) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    fullWidth
    sx={{ mb: 1 }}
  />
);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmpassword: "",
  });
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        setMessage("Error fetching users");
        setSeverity("error");
        setOpen(true);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    // Clear session or authentication details
    localStorage.clear(); // Example: Clear localStorage
    setMessage("Logged out successfully!");
    setSeverity("success");
    setOpen(true);

    // Redirect to login page
    setTimeout(() => navigate("/"), 1000);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      setMessage("User deleted successfully!");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      setMessage("Error deleting user");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleEdit = (user) => {
    setEditMode(user._id);
    setEditForm(user);
  };
  const handleUpdate = async () => {
    const { password, confirmpassword, ...userDetails } = editForm;

    try {
      await updateUser(editMode, userDetails);
      setUsers(
        users.map((user) =>
          user._id === editMode ? { ...user, ...userDetails } : user
        )
      );
      setMessage("User updated successfully!");
      setSeverity("success");
      setOpen(true);
      setEditMode(null);
    } catch (error) {
      setMessage("Error updating user");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordOpen = () => {
    setChangePasswordOpen(true);
  };

  const handleChangePasswordClose = () => {
    setChangePasswordOpen(false);
    setChangePasswordForm({ newPassword: "", confirmPassword: "" });
  };

  const handleChangePasswordSubmit = async () => {
    const { newPassword, confirmPassword } = changePasswordForm;

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      await updateUser(editMode, { password: newPassword });
      setMessage("Password updated successfully");
      setSeverity("success");
      setOpen(true);
      handleChangePasswordClose();
    } catch (error) {
      setMessage("Error changing password");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        {users.length > 0 ? users[0].firstname : "Loading..."}
      </Typography>

      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {editMode === user._id ? (
              <Modal
                open={editMode === user._id}
                onClose={() => setEditMode(null)}
                aria-labelledby="edit-user-modal-title"
                aria-describedby="edit-user-modal-description"
              >
                <Box
                  sx={{
                    padding: 4,
                    backgroundColor: "white",
                    margin: "auto",
                    borderRadius: 2,
                    width: 420,
                  }}
                >
                  <Typography variant="h6" id="edit-user-modal-title">
                    Edit User
                  </Typography>
                  <EditableField
                    name="firstname"
                    label="First Name"
                    value={editForm.firstname}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="lastname"
                    label="Last Name"
                    value={editForm.lastname}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="email"
                    label="Email"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="phone"
                    label="Phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="location"
                    label="Location"
                    value={editForm.location}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="city"
                    label="City"
                    value={editForm.city}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="state"
                    label="State"
                    value={editForm.state}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    name="pincode"
                    label="Pincode"
                    value={editForm.pincode}
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChangePasswordOpen}
                    sx={{ mt: 2 }}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpdate}
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </Modal>
            ) : (
              <>
                <ListItemText
                  primary={`${user.firstname} ${user.lastname}`}
                  secondary={user.email}
                />
                <ListItemText secondary={user.phone} />
              </>
            )}
            {editMode !== user._id && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(user)}
                sx={{ ml: 2 }}
              >
                Edit
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(user._id)}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ textTransform: "none", ml: 2 }}
            >
              Logout
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={changePasswordOpen} onClose={handleChangePasswordClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            fullWidth
            value={changePasswordForm.newPassword}
            onChange={handleChangePasswordInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={changePasswordForm.confirmPassword}
            onChange={handleChangePasswordInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePasswordClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleChangePasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserList;
