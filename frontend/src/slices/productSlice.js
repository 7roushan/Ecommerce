// // Import necessary modules
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:9000/api/products";

// // Fetch all products
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Add a new product
// export const addProduct = createAsyncThunk(
//   "products/addProduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       Object.entries(productData).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       const response = await axios.post(`${API_URL}/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return response.data.newItem;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Delete a product
// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (productId, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/delete/${productId}`);
//       return productId; // Return productId for removal from the state
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Edit a product
// export const editProduct = createAsyncThunk(
//   "products/editProduct",
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${API_URL}/edit/${id}`, updatedData);
//       return response.data.updatedItem;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// // Product Slice
// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     status: "idle", // "idle" | "loading" | "succeeded" | "failed"
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Products
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Add Product
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })

//       // Delete Product
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.items = state.items.filter((product) => product._id !== action.payload);
//       })

//       // Edit Product
//       .addCase(editProduct.fulfilled, (state, action) => {
//         const index = state.items.findIndex((product) => product._id === action.payload._id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       });
//   },
// });




// export default productSlice.reducer;/




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set the API URL (ensure it's pointing to your backend)
const API_URL = "http://localhost:9000/api/products";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Return products data
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.newItem; 
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${productId}`);
      return productId; // Return productId to remove from state
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Edit a product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/edit/${id}`, updatedData);
      return response.data.updatedItem; // Return updated product
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", 
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // Update search term
    },
  },


  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add new product to state
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product._id !== action.payload); // Remove product
      })

      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update product in state
        }
      });
  },
});


export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;

