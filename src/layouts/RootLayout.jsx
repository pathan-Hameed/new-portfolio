import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
import NoiseOverlay from "../components/ui/NoiseOverlay";
import CustomCursor from "../components/cursor/CustomCursor";

function RootLayout() {
  return (
    <div className="relative overflow-hidden bg-bg-primary text-white">
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
