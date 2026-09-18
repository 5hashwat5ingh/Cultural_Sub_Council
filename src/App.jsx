import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ClubsPage from "./pages/Clubs";
import Events from "./pages/Events";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clubs" element={<ClubsPage />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}