import React from "react";
import { Routes, Route } from "react-router-dom";

// ============================================================
// GLOBAL COMPONENTS
// ============================================================

import ScrollToTop from "./components/ScrollToTop";

// ============================================================
// MAIN PAGES
// ============================================================

import Home from "./pages/Home";
import ClubsPage from "./pages/Clubs";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";

// ============================================================
// CLUB PAGE
// ============================================================

import ClubPage from "./pages/clubs/ClubPage";

// ============================================================
// CLUB DATA
// ============================================================

import { clubsData } from "./data/clubsData";

// ============================================================
// EVENT PAGES
// ============================================================

import EventTemplate from "./pages/events/EventTemplate";
import { eventsData } from "./data/eventsData";

// ============================================================
// APP
// ============================================================

export default function App() {
  return (
    <>
      {/* =====================================================
          SCROLL TO TOP
      ===================================================== */}

      <ScrollToTop />

      {/* =====================================================
          ROUTES
      ===================================================== */}

      <Routes>

        {/* ===================================================
            HOME
        =================================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ===================================================
            MAIN PAGES
        =================================================== */}

        <Route
          path="/clubs"
          element={<ClubsPage />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/registration"
          element={<Registration />}
        /> 

        {/* ===================================================
            CLUB PAGES
            All clubs now use the same reusable ClubPage
            component and receive their content from clubsData.
        =================================================== */}

        <Route
          path="/clubs/dance"
          element={
            <ClubPage club={clubsData.dance} />
          }
        />

        <Route
          path="/clubs/dramatics"
          element={
            <ClubPage club={clubsData.dramatics} />
          }
        />

        <Route
          path="/clubs/music"
          element={
            <ClubPage club={clubsData.music} />
          }
        />

        <Route
          path="/clubs/fine-arts"
          element={
            <ClubPage club={clubsData.fineArts} />
          }
        />

        <Route
          path="/clubs/technical-design"
          element={
            <ClubPage club={clubsData.technical} />
          }
        />


        {/* ===================================================
            EVENT PAGES
        =================================================== */}

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

      </Routes>
    </>
  );
}