import axios from "axios";

// Axios instance
export const API = axios.create({
  baseURL: "http://localhost:9000/api/users", // Adjust base URL if needed
});

// Add Authorization Header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login API
// //export const loginUserAPI = async (email, password) => {
//   const response = await API.post("/api/users/login", { email, password });
//   return response.data;
// };

// Fetch Profile API using token
// export const fetchUserProfile = async () => {
//   try {
//     const response = await API.get("/me"); // Use your correct API endpoint for fetching user data
//     return response.data; // Return user data
//   } catch (error) {
//     throw error; // Throw error if the request fails
//   }
// };

// Example API methods
export const getAllUsers = () => API.get("/");

export const getUserById = (id) => API.get(`/${id}`);

export const createUser = (userData) => API.post("/register", userData);

export const loginUserAPI = (credentials) => API.post("/login", credentials); // For login action

export const updateUser = (id, userData) => API.put(`/${id}`, userData);

export const deleteUser = (id) => API.delete(`/${id}`);

export const Upload = () => API.post("/upload");

// export const getLoggedInUser = async () => {
//   try {
//     const response = await API.get(`/me`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
