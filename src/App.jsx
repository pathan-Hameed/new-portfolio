import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";


export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
