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
//             top: "calc(100% + 8px)", // Position below the search bar
//             left: 0,
//             right: 0,
//             borderRadius: 2,
//             boxShadow: 3,
//             zIndex: 10,
//             maxHeight: 200,
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


import React, { useState } from "react"; 
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/productSlice";  // Import Redux action
import { Box, IconButton, Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setLocalSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setLocalSearchTerm(term);
    dispatch(setSearchTerm(term));  // Dispatch search term to Redux
  };

  return (
    <Box sx={{ position: "relative", width: "100%", minWidth: 100 }}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "black",
          color: "white",
          padding: "4px 8px",
        }}
      >
        <IconButton sx={{ p: 1, color: "white" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search products…"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1, color: "white", padding: "0px" }}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;

