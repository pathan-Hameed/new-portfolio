import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ServiceDetail from "./components/sections/ServiceDetail";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        </Route>
      </Routes>
    </div>
  );
}
