import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Footer/>

    </div>
  );
}

export default AppLayout;
