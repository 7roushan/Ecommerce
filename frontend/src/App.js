import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import AppLayout from "./components/AppLayout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserList from "./pages/UserList";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home2 from "./pages/Home2";
import ProductCard from "./pages/ProductCard";
import SearchAppBar from "./pages/SearchBar";


function App() {
  return (
    <Router>
      
      <Routes>
        {/* Main application layout */}
        <Route path="/" element={<AppLayout />}>
          {/* Public routes */}
          <Route index element={<Home2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/search" element={<SearchAppBar/>} />

          {/* Protected routes */}
          <Route
            path="userlist"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <AddProductForm />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-product/:productId"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
