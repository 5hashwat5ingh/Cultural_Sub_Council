import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* =========================================================
   EVENTS
========================================================= */

const events = [
  {
    number: "01",
    title: "EVENTS",
    subtitle: "A NEW BEGINNING",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=90",
  },
  {
    number: "02",
    title: "HEATS '25",
    subtitle: "CULTURAL CELEBRATION",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=90",
  },
  {
    number: "03",
    title: "ORIENTATION '26",
    subtitle: "WELCOMING NEW VOICES",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=2200&q=90",
  },
  {
    number: "04",
    title: "PINTURA DE PILARES",
    subtitle: "ART MEETS ARCHITECTURE",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=2200&q=90",
  },
];

/* =========================================================
   EVENT LAYER
========================================================= */

function EventLayer({
  event,
  y,
  imageScale,
  textOpacity,
  textY,
  zIndex,
  centerText = false,
}) {
  return (
    <motion.div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-black
      "
      style={{
        y,
        zIndex,
      }}
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <motion.img
        src={event.image}
        alt={event.title}
        draggable="false"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          will-change-transform
        "
        style={{
          scale: imageScale,
        }}
      />

      {/* =================================================
          DARK OVERLAY
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/20
        "
      />

      {/* =================================================
          GRADIENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/85
          via-black/20
          to-transparent
        "
      />

      {/* =================================================
          TEXT
      ================================================= */}

      <motion.div
        className={`
          pointer-events-none
          absolute
          inset-0
          flex
          px-6
          sm:px-10
          md:px-16

          ${
            centerText
              ? "items-center justify-center text-center"
              : "items-end justify-start pb-14 text-left sm:pb-20 md:pb-24"
          }
        `}
        style={{
          opacity: textOpacity,
          y: textY,
        }}
      >
        <div className="text-white">

          {/* EVENT NUMBER */}

          <p
            className="
              mb-4
              text-[10px]
              font-medium
              uppercase
              tracking-[0.45em]
              text-white/60
              sm:text-xs
            "
          >
            Event {event.number}
          </p>

          {/* EVENT TITLE */}

          <h2
            className="
              max-w-[1000px]
              text-5xl
              font-semibold
              leading-[0.9]
              tracking-[-0.06em]
              sm:text-6xl
              md:text-8xl
              lg:text-9xl
            "
          >
            {event.title}
          </h2>

          {/* EVENT SUBTITLE */}

          <p
            className="
              mt-5
              text-[10px]
              uppercase
              tracking-[0.4em]
              text-white/60
              sm:text-xs
              md:text-sm
            "
          >
            {event.subtitle}
          </p>

        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="relative w-full bg-black text-white">

      {/* TOP BORDER */}

      <div className="mx-6 border-t border-white/10 sm:mx-10 md:mx-16" />

      <div className="px-6 py-16 sm:px-10 md:px-16 md:py-20">

        {/* =================================================
            TOP FOOTER
        ================================================= */}

        <div className="grid gap-12 md:grid-cols-2">

          {/* BRAND */}

          <div>
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.4em]
                text-white/40
              "
            >
              Cultural Sub Council
            </p>

            <h2
              className="
                mt-6
                max-w-3xl
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.05em]
                sm:text-5xl
                md:text-7xl
              "
            >
              Culture creates
              <br />

              <span className="text-white/40">
                memories.
              </span>
            </h2>
          </div>

          {/* NAVIGATION */}

          <div className="flex flex-col md:items-end">

            <p
              className="
                mb-6
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/40
              "
            >
              Explore
            </p>

            <nav className="flex flex-col gap-3 md:items-end">

              <a
                href="/"
                className="
                  text-sm
                  text-white/70
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Home
              </a>

              <a
                href="/#institution"
                className="
                  text-sm
                  text-white/70
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Institution
              </a>

              <a
                href="/#gallery"
                className="
                  text-sm
                  text-white/70
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Gallery
              </a>

              <a
                href="/events"
                className="
                  text-sm
                  text-white
                  transition-colors
                  duration-300
                "
              >
                Events
              </a>

              <a
                href="/#contact"
                className="
                  text-sm
                  text-white/70
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Contact
              </a>

            </nav>
          </div>
        </div>

        {/* MIDDLE LINE */}

        <div className="my-16 border-t border-white/10 md:my-20" />

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-6
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p>
            © {new Date().getFullYear()} Cultural Sub Council
          </p>

          <p>
            MMMUT · Gorakhpur
          </p>

          <p>
            All Rights Reserved
          </p>

        </div>

      </div>
    </footer>
  );
}

/* =========================================================
   EVENTS PAGE
========================================================= */

export default function Events() {
  const sectionRef = useRef(null);

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* =======================================================
     IMAGE POSITIONS
  ======================================================= */

  // IMAGE 1 — stays fixed

  const image1Y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "0%"]
  );

  // IMAGE 2

  const image2Y = useTransform(
    scrollYProgress,
    [0.16, 0.40],
    ["100%", "0%"]
  );

  // IMAGE 3

  const image3Y = useTransform(
    scrollYProgress,
    [0.40, 0.64],
    ["100%", "0%"]
  );

  // IMAGE 4

  const image4Y = useTransform(
    scrollYProgress,
    [0.64, 0.88],
    ["100%", "0%"]
  );

  /* =======================================================
     FIRST IMAGE — ZOOM
  ======================================================= */

  /*
    ONLY FIRST IMAGE ZOOMS.

    The text itself does NOT zoom.
  */

  const image1Scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.34],
    [1, 1.03, 1.12]
  );

  /* =======================================================
     TEXT OPACITY
  ======================================================= */

  /*
    FIRST TEXT

    IMPORTANT:

    At scrollYProgress = 0
    opacity = 1

    So the text is visible immediately
    when the page opens.
  */

  const text1Opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28],
    [1, 1, 0]
  );

  /*
    SECOND TEXT

    Appears while IMAGE 2 is entering.
  */

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.27, 0.43],
    [0, 1]
  );

  /*
    THIRD TEXT
  */

  const text3Opacity = useTransform(
    scrollYProgress,
    [0.51, 0.67],
    [0, 1]
  );

  /*
    FOURTH TEXT
  */

  const text4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.91],
    [0, 1]
  );

  /* =======================================================
     TEXT MOVEMENT
  ======================================================= */

  /*
    FIRST TEXT

    It remains completely still initially.

    Then, near the transition,
    it moves upward and fades away.
  */

  const text1Y = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28],
    ["0%", "0%", "-35%"]
  );

  /*
    SECOND TEXT

    Comes slightly upward.
  */

  const text2Y = useTransform(
    scrollYProgress,
    [0.27, 0.43],
    ["20%", "0%"]
  );

  /*
    THIRD TEXT
  */

  const text3Y = useTransform(
    scrollYProgress,
    [0.51, 0.67],
    ["20%", "0%"]
  );

  /*
    FOURTH TEXT
  */

  const text4Y = useTransform(
    scrollYProgress,
    [0.75, 0.91],
    ["20%", "0%"]
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full bg-black">

      {/* ===================================================
          EVENTS SCROLL SECTION
      =================================================== */}

      <main
        ref={sectionRef}
        className="
          relative
          h-[500vh]
          w-full
          bg-black
        "
      >

        {/* STICKY VIEWPORT */}

        <div
          className="
            sticky
            top-0
            h-screen
            w-full
            overflow-hidden
          "
        >

          {/* FULL SCREEN CONTAINER */}

          <div
            className="
              relative
              h-screen
              w-screen
              overflow-hidden
              bg-black
            "
          >

            {/* =============================================
                EVENT 01
                CENTER TEXT
            ============================================= */}

            <EventLayer
              event={events[0]}
              y={image1Y}
              imageScale={image1Scale}
              textOpacity={text1Opacity}
              textY={text1Y}
              zIndex={10}
              centerText={true}
            />

            {/* =============================================
                EVENT 02
                BOTTOM LEFT TEXT
            ============================================= */}

            <EventLayer
              event={events[1]}
              y={image2Y}
              imageScale={1}
              textOpacity={text2Opacity}
              textY={text2Y}
              zIndex={20}
            />

            {/* =============================================
                EVENT 03
                BOTTOM LEFT TEXT
            ============================================= */}

            <EventLayer
              event={events[2]}
              y={image3Y}
              imageScale={1}
              textOpacity={text3Opacity}
              textY={text3Y}
              zIndex={30}
            />

            {/* =============================================
                EVENT 04
                BOTTOM LEFT TEXT
            ============================================= */}

            <EventLayer
              event={events[3]}
              y={image4Y}
              imageScale={1}
              textOpacity={text4Opacity}
              textY={text4Y}
              zIndex={40}
            />

          </div>
        </div>
      </main>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <Footer />

    </div>
  );
}