// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   useMediaQuery,
//   Card,
//   CardMedia,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import img from "../../asscerts/icon5.png";
// import image from "../../asscerts/images/img8.jpg";

// const Gotravel = () => {
//   const [open, setOpen] = useState(false);
//   const isMobile = useMediaQuery("(max-width:600px)");

//   return (
//     <Box my={5} sx={{ backgroundColor: "#008cba", p: 4, color: "#fff" }}>
//       <Grid container spacing={3} alignItems="center">
//         {/* Left Side - Video Section */}
//         <Grid
//           item
//           xs={12}
//           md={4}
//           sx={{ display: "flex", justifyContent: "center" }}
//         >
//           <Box
//             sx={{
//               position: "relative",
//               width: "100%",
//               maxWidth: "450px",
//               borderRadius: 2,
//               overflow: "hidden",
//               cursor: "pointer",
//             }}
//             onClick={() => setOpen(true)}
//           >
//             <Card>
//               <CardMedia component="img" image={image} alt="Gallery Image" />
//             </Card>
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 color: "white",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
//                 fontSize: "3rem",
//               }}
//             >
//               <PlayCircleIcon fontSize="large" />
//             </IconButton>
//           </Box>
//         </Grid>

//         {/* Right Side - Text and Information */}
//         <Grid item xs={12} md={8}>
//           <Typography
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               fontSize: "0.8rem",
//             }}
//           >
//             <Box
//               sx={{ backgroundColor: "white", height: "1px", width: "1cm" }}
//             />
//             CALLBACK FOR MORE
//           </Typography>

//           <Typography variant="h5" fontWeight="bold">
//             GO TRAVEL. DISCOVER. REMEMBER US!!
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 2, fontSize: "0.7rem" }}>
//             <strong>
//               Iconic Travel offers the best, most affordable tour packages to
//               our reliable clients, providing experiences that help people break
//               away from daily routines.
//             </strong>
//           </Typography>

//           {/* Stats Section */}
//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             {[
//               "10+ Years in Industry",
//               "250K+ Satisfied Customers",
//               "10+ Qualified Staff",
//               "250+ Worldwide Locations",
//             ].map((text, index) => (
//               <Grid item xs={6} sm={6} md={6} key={index}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {text.split(" ")[0]}
//                 </Typography>
//                 <Typography variant="body2" fontSize="0.7rem">
//                   {text.split(" ").slice(1).join(" ")}
//                 </Typography>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Contact Section */}
//           <Grid
//             container
//             sx={{
//               position: "absolute",
//               backgroundColor: "#fff",
//               color: "#008cba",
//               p: 2,
//               borderRadius: 1,
//               mt: 0.5,
//               textAlign: "center",
//               alignItems: "center",
//               display: "inline-flex",
//               width: "auto",
//               boxShadow: 3,
//             }}
//           >
//             <Grid item xs="auto">
//               <img
//                 src={img}
//                 alt="Company Logo"
//                 style={{ width: isMobile ? "20px" : "25px", height: "auto" }}
//               />
//             </Grid>
//             <Grid item xs>
//               <Typography variant="body1" fontWeight="bold">
//                 Have any doubt? Call Us
//               </Typography>
//               <Typography variant="h6" color="red" fontWeight="bold">
//                 +91-8130883907
//               </Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Video Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: 600,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 2,
//             borderRadius: 2,
//           }}
//         >
//           <iframe
//             width="100%"
//             height="315"
//             src="https://www.youtube.com/embed/IUN664s7N-c"
//             title="Travel Video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Gotravel;
