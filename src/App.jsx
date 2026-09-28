import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ClubsPage from "./pages/Clubs";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Dance from "./components/Dance";
import Dramatics from "./components/Dramatics";
import Music from "./components/Music";
import FineArts from "./components/FineArts";
import Technical from "./components/Technical";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clubs" element={<ClubsPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/clubs/dance" element={<Dance />} />
      <Route path="/clubs/music" element={<Music />} />
      <Route path="/clubs/dramatics" element={<Dramatics />} />
      <Route path="/clubs/fine-arts" element={<FineArts />} />
      <Route path="/clubs/technical-design" element={<Technical />} />
    </Routes>
  );
}