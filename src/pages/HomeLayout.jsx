import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../customHooks";

function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default HomeLayout;
