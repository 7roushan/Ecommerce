
import { createSlice } from '@reduxjs/toolkit';

// Initialize state from localStorage if available
const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const saveToLocalStorage = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity = 1
      }

      saveToLocalStorage(state.items); // Save updated cart to localStorage
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity
        } else {
          state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item
        }
      }

      saveToLocalStorage(state.items); // Save updated cart to localStorage
    },
    deleteFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item completely

      saveToLocalStorage(state.items); // Save updated cart to localStorage
    },
  },
});

// Selector for the total count of items in the cart
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0); // Sum all item quantities

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
