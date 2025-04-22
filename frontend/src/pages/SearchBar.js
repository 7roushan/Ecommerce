// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   IconButton,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   InputBase,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const SearchBar = () => {
//   const [products, setProducts] = useState([]); // Store fetched products
//   const [searchTerm, setSearchTerm] = useState(""); // Store user input
//   const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

//   // Fetch products from the backend
//   const fetchProducts = async () => {
//     if (!searchTerm.trim()) return; // Skip API call if input is empty
//     try {
//       const { data } = await axios.get(
//         `http://localhost:9000/api/products?search=${searchTerm}`
//       );
//       setProducts(data); // Update product list
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Handle search term changes and control dropdown visibility
//   useEffect(() => {
//     if (searchTerm.trim()) {
//       fetchProducts();
//       setShowDropdown(true);
//     } else {
//       setProducts([]);
//       setShowDropdown(false);
//     }
//   }, [searchTerm]);

//   return (
//     <Box sx={{ position: "relative", width: "100%", minWidth: 100 }}>
//       {/* Search Bar */}
//       <Paper
//         component="form"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           borderRadius: 2,
//           boxShadow: 1,
//           backgroundColor: "black",
//           color: "white",
//           padding: "4px 8px",
//         }}
//       >
//         <IconButton sx={{ p: 1, color: "white" }}>
//           <SearchIcon />
//         </IconButton>
//         <InputBase
//           placeholder="Search products…"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//           onFocus={() => setShowDropdown(true)} // Show dropdown on focus
//           sx={{ flex: 1, color: "white", padding: "0px" }}
//         />
//       </Paper>

//       {/* Dropdown for Product Suggestions */}
//       {showDropdown && products.length > 0 && (
//         <Paper
//           sx={{
//             position: "absolute",
//             top: "calc(100% + 4px)", // Position below the search bar
//             left: 0,
//             right: 0,
//             borderRadius: 2,
//             boxShadow: 3,
//             zIndex: 10,
//             maxHeight: 45,
//             overflowY: "auto",
//           }}
//         >
//           <List>
//             {products.map((product) => (
//               <ListItem
//                 key={product._id}
//                 button
//                 onClick={() => alert(`You selected: ${product.title}`)} // Handle item selection
//               >
//                 <ListItemText primary={product.title} />
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"; // npm install lodash.debounce

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch products (debounced)
  const fetchProducts = debounce(async (term) => {
    if (!term.trim()) return;
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/products?search=${term}`
      );
      setProducts(data.slice(0, 5)); // Limit to top 5 results
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, 300); // Debounce delay

  // Handle search term updates
  useEffect(() => {
    if (searchTerm.trim()) {
      fetchProducts(searchTerm);
    } else {
      setProducts([]);
      setShowDropdown(false);
    }
    // Cleanup debounce on unmount
    return () => fetchProducts.cancel();
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 400 }}>
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#121212",
          color: "white",
          padding: "4px 8px",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <IconButton sx={{ p: 1, color: "white" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowDropdown(true)}
          sx={{ flex: 1, color: "white" }}
        />
      </Paper>

      {/* Dropdown */}
      {showDropdown && products.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 10,
            maxHeight: 250,
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          <List dense>
            {products.map((product) => (
              <ListItem
                key={product._id}
                button
                onClick={() => handleProductClick(product._id)}
              >
                <ListItemText
                  primary={product.title}
                  secondary={product.image}

                  primaryTypographyProps={{
                    noWrap: true,
                    sx: { fontSize: 14 },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;

