import React from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import ClubsPage from "./pages/Clubs";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";

import Dance from "./pages/clubs/Dance";
import Dramatics from "./pages/clubs/Dramatics";
import Music from "./pages/clubs/Music";
import FineArts from "./pages/clubs/FineArts";
import Technical from "./pages/clubs/Technical";

import Heats25 from "./pages/events/Heats25";
import Abhyudaya from "./pages/events/Abhyudaya";
import Pintura from "./pages/events/PinturaDePilares";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/clubs" element={<ClubsPage />} />

        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
         {/* Events */}
      <Route path="/events" element={<Events />} />
      <Route path="/events/heats-25" element={<Heats25 />} />
      <Route
        path="/events/Abhyudaya"
        element={<Abhyudaya/>}
      />
      <Route
        path="/events/pintura"
        element={<Pintura />}
      />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/clubs/dance"
          element={<Dance />}
        />

        <Route
          path="/clubs/music"
          element={<Music />}
        />

        <Route
          path="/clubs/dramatics"
          element={<Dramatics />}
        />

        <Route
          path="/clubs/fine-arts"
          element={<FineArts />}
        />

        <Route
          path="/clubs/technical-design"
          element={<Technical />}
        />
      </Routes>
    </>
  );
}