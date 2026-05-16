import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NoiseOverlay from "../components/ui/NoiseOverlay";
import CustomCursor from "../components/cursor/CustomCursor";

// 1. Move this OUTSIDE the RootLayout function
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to ensure the DOM has rendered, 
      // especially when navigating from a different page
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [hash, pathname]); // Re-run if hash or path changes

  return null;
};

function RootLayout() {
  return (
    <div className="relative overflow-hidden bg-bg-primary text-white">
      {/* 2. Render the component here so it actually runs */}
      <ScrollToHash />
      
      <Navbar />
      <NoiseOverlay />
      <CustomCursor />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;