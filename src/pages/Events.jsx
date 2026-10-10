
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* =========================================================
   EVENTS DATA
========================================================= */

const events = [
  {
    number: "00",
    title: "EVENTS",
    subtitle: "WHERE CULTURE COMES ALIVE",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/f_auto,q_auto/WhatsApp_Image_2026-09-29_at_10.42.23_PM",
    route: "/events",
  },
  {
    number: "01",
    title: "HEATS '25",
    subtitle: "A STAGE FOR EVERY FRESHER",
    description:
      "Heats is a vibrant cultural event where freshers get the opportunity to step into the spotlight, showcase their talents, express their creativity, and begin their college journey with confidence.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791238377/WhatsApp_Image_2026-10-06_at_3.39.05_AM.png",
    route: "/events/heats-25",
  },
  {
    number: "02",
    title: "PINTURA DE PILARES",
    subtitle: "TURNING PILLARS INTO CANVASES",
    description:
      "Pintura de Pilares (PDP) is a pillar-painting competition that transforms ordinary campus pillars into creative expressions of art. It gives participants a space to communicate ideas, explore visual storytelling, and add colour to the campus.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791240149/Untitled_design_6.png",
    route: "/events/Pintura",
  },
  {
    number: "03",
    title: "ABHYUDAYA",
    subtitle: "OUR ANNUAL COLLEGE FEST",
    description:
      "Abhyudaya is the annual fest of the college, bringing together students, creativity, and campus spirit. It celebrates talent and participation through a shared cultural experience that makes college life memorable.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791238734/WhatsApp_Image_2026-10-06_at_3.33.19_AM.png",
    route: "/events/Abhyudaya",
  },
];

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({ event, index }) {
  const isFirst = index === 0;

  return (
    <section
      className="sticky top-0 h-screen min-h-[600px] w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 bg-[#1D070D]">
        <img
          src={event.image}
          alt={event.title}
          draggable="false"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* LEFT-TO-RIGHT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D070D]/80 via-[#1D070D]/30 to-transparent" />

        {/* TOP GRADIENT */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1D070D]/60 to-transparent" />

        {/* BOTTOM GRADIENT */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1D070D]/65 to-transparent" />
      </div>

      {/* FIRST SLIDE — CENTERED INTRODUCTION */}
      {isFirst ? (
        <div className="absolute inset-0 flex items-center justify-center px-6 py-20 text-center sm:px-12">
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
            <div className="mb-7 flex items-center justify-center gap-4"></div>

           <h1 className="font-serif text-[clamp(5rem,16vw,13rem)] font-medium italic leading-[0.8] tracking-[-0.07em] text-[#F7EBD0]">
  Events<span className="not-italic text-[#C6A15B]">.</span>
</h1>

            <div className="my-8 h-px w-20 bg-[#C6A15B]/80 sm:my-10 sm:w-28" />

            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[#F7EBD0] sm:text-base md:text-lg">
              Where Culture Comes Alive
            </h2>

            <div className="mt-9 flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#F7EBD0]/65 sm:mt-12"></div>
          </div>
        </div>
      ) : (
        /* INDIVIDUAL EVENT CONTENT */
        <div className="absolute inset-0 flex items-end px-6 pb-24 sm:px-12 sm:pb-28 md:px-16 lg:px-20 lg:pb-28">
          <div className="relative z-10 w-full max-w-[1500px]">
            {/* EVENT NUMBER */}
            <div className="mb-5 flex items-center gap-4">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C6A15B] sm:text-xs">
                {event.number}
              </span>

              <div className="h-px w-10 bg-[#C6A15B]/60 sm:w-16" />

              <span className="text-[8px] uppercase tracking-[0.3em] text-[#F7EBD0]/70 sm:text-[10px]">
                Cultural Sub Council
              </span>
            </div>

            {/* EVENT TITLE */}
            <h2 className="max-w-[1200px] text-[clamp(2.8rem,8vw,8rem)] font-semibold leading-[0.85] tracking-[-0.07em] text-[#F7EBD0]">
              {event.title}
            </h2>

            {/* EVENT SUBTITLE */}
            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.3em] text-[#C6A15B] sm:mt-6 sm:text-xs md:text-sm">
              {event.subtitle}
            </p>

            {/* EVENT DESCRIPTION */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#F7EBD0]/85 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              {event.description}
            </p>

            {/* READ MORE */}
            <Link
              to={event.route}
              className="group mt-7 inline-flex items-center gap-3 rounded-lg bg-[#C6A15B] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1D070D] transition-all duration-300 hover:bg-[#D9B86C] hover:shadow-[0_8px_30px_rgba(198,161,91,0.25)] sm:mt-8 sm:px-6 sm:text-[10px]"
            >
              <span>Read More</span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D070D] text-[#D9B86C] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* SIDE INDEX */}
      <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex md:right-8">
        {events.map((item, i) => (
          <div
            key={item.number}
            aria-label={`Event ${item.number}`}
            className={`transition-all duration-500 ${
              i === index
                ? "h-10 w-[2px] bg-[#C6A15B]"
                : "h-5 w-px bg-[#F7EBD0]/40"
            }`}
          />
        ))}
      </div>

      {/* SLIDE NUMBER */}
     
    </section>
  );
}

/* =========================================================
   EVENTS PAGE
========================================================= */

export default function Events() {
  return (
    <div className="w-full overflow-x-clip bg-[#1D070D]">
      {/* NAVBAR — KEEP FIXED ON EVENTS PAGE */}
      <Navbar Home />

      {/* STICKY, FULL-SCREEN EVENT STACK */}
      <main className="relative w-full bg-[#1D070D]">
        {events.map((event, index) => (
          <EventCard
            key={event.number}
            event={event}
            index={index}
          />
        ))}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}