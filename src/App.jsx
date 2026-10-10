
import React from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import ClubsPage from "./pages/Clubs";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";

import AppLayout from "./layouts/AppLayout";
import ClubPage from "./pages/clubs/ClubPage";
import { clubsData } from "./data/clubsData";

import EventTemplate from "./pages/events/EventTemplate";
import { eventsData } from "./data/eventsData";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* AppLayout wraps every page */}
        <Route element={<AppLayout />}>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />

          {/* Club pages */}
          <Route
            path="/clubs/dance"
            element={<ClubPage club={clubsData.dance} />}
          />
          <Route
            path="/clubs/dramatics"
            element={<ClubPage club={clubsData.dramatics} />}
          />
          <Route
            path="/clubs/music"
            element={<ClubPage club={clubsData.music} />}
          />
          <Route
            path="/clubs/fine-arts"
            element={<ClubPage club={clubsData.fineArts} />}
          />
          <Route
            path="/clubs/technical-design"
            element={<ClubPage club={clubsData.technical} />}
          />

          {/* Event pages */}
          <Route
            path="/events/heats-25"
            element={<EventTemplate event={eventsData.heats25} />}
          />
          <Route
            path="/events/Abhyudaya"
            element={<EventTemplate event={eventsData.abhyudaya} />}
          />
          <Route
            path="/events/pintura"
            element={<EventTemplate event={eventsData.pintura} />}
          />
        </Route>
      </Routes>
    </>
  );
}
