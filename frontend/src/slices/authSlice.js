import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, createUser } from "../api";

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(formData);
      return { token: response.data.token, message: "Login successful!" }; // Return token and message
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Invalid credentials!");
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      await createUser(formData);
      return "User registered successfully!";
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "An error occurred!");
    }
  }
);

const initialState = {
  message: "",
  severity: "success",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.message = "";
      state.severity = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.severity = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || "Login failed";
        state.severity = "error";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.severity = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.severity = "error";
      });
  },
});

export const { clearNotification } = authSlice.actions;

export default authSlice.reducer;
