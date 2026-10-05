import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* =========================================================
   EVENTS DATA
========================================================= */

const events = [
  {
    number: "01",
    title: "EVENTS",
    subtitle: "A NEW BEGINNING",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/f_auto,q_auto/WhatsApp_Image_2026-09-29_at_10.42.23_PM",
    route: "/events",
  },
  {
    number: "02",
    title: "HEATS '25",
    subtitle: "CULTURAL CELEBRATION",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=90",
    route: "/events/heats-25",
  },
  {
    number: "03",
    title: "PINTURA DE PILARES",
    subtitle: "WELCOMING NEW VOICES",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=2200&q=90",
    route: "/events/orientation-26",
  },
  {
    number: "04",
    title: "ABHYUDAYA",
    subtitle: "ART MEETS ARCHITECTURE",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=2200&q=90",
    route: "/events/pintura-de-pilares",
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
  isLanding = false,
})  {
  return (
    <motion.div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-[#1D070D]
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
          MAROON COLOR TINT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#2B0A12]/5
        "
      />

      {/* =================================================
          CINEMATIC GRADIENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-[#1D070D]
          via-[#1D070D]/5
          to-transparent
        "
      />

      {/* =================================================
          SUBTLE TOP GRADIENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-[#1D070D]/50
          to-transparent
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <motion.div
        className={`
          absolute
          inset-0
          flex
          px-7
          sm:px-12
          md:px-16
          lg:px-20

          ${
            centerText
              ? "items-center justify-center text-center"
              : "items-end justify-start pb-20 text-left sm:pb-24 lg:pb-28"
          }
        `}
        style={{
          opacity: textOpacity,
          y: textY,
        }}
      >
        <div
          className="
            relative
            z-10
            w-full
            max-w-[1500px]
          "
        >
          {!centerText && (
  <div
    className="
      mb-5
      flex
      items-center
      gap-4
    "
  >
    <span
      className="
        text-[8px]
        font-medium
        uppercase
        tracking-[0.35em]
        text-[#D9B86C]
        sm:text-[9px]
      "
    >
      Cultural Sub Council
    </span>

    <span
      className="
        h-px
        w-8
        bg-[#C6A15B]/50
        sm:w-10
      "
    />

    <span
      className="
        text-[8px]
        uppercase
        tracking-[0.3em]
        text-[#F7EBD0]/50
        sm:text-[9px]
      "
    >
      Event {event.number}
    </span>
  </div>
)}

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
  className={`
    max-w-[1400px]
    font-semibold
    leading-[0.82]
    tracking-[-0.07em]
    text-[#F7EBD0]

    ${
      isLanding
        ? "text-[clamp(5rem,15vw,15rem)]"
        : "text-[clamp(3.2rem,8vw,9rem)]"
    }
  `}
>
  {event.title}
</h2>

          {/* =================================================
              SUBTITLE
          ================================================= */}

          <p
            className="
              mt-5
              text-[8px]
              uppercase
              tracking-[0.38em]
              text-[#F7EBD0]/60
              sm:mt-6
              sm:text-xs
              md:text-sm
            "
          >
            {event.subtitle}
          </p>

          {/* =================================================
              READ MORE
              
              Hidden for first screen.
              Visible only for actual events.
          ================================================= */}

          {!centerText && (
            <Link
              to={event.route}
              className="
                pointer-events-auto
                group
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-lg
                bg-[#C6A15B]
                px-5
                py-2.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#1D070D]
                transition-all
                duration-500
                hover:bg-[#D9B86C]
                hover:shadow-[0_8px_30px_rgba(198,161,91,0.25)]
                sm:mt-8
                sm:px-6
                sm:py-3
                sm:text-[9px]
                md:text-[10px]
              "
            >
              <span>Read More</span>

              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1D070D]
                  text-[#D9B86C]
                  transition-all
                  duration-500
                  group-hover:translate-x-1
                  group-hover:bg-[#2B0A12]
                "
              >
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  className="
                    transition-transform
                    duration-500
                    group-hover:translate-x-[1px]
                    group-hover:-translate-y-[1px]
                  "
                />
              </span>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
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
     PROGRESS BAR
  ======================================================= */

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  /* =======================================================
     IMAGE POSITIONS
  ======================================================= */

  // EVENT 01 — stays fixed
  const image1Y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "0%"]
  );

  // EVENT 02
  const image2Y = useTransform(
    scrollYProgress,
    [0.16, 0.40],
    ["100%", "0%"]
  );

  // EVENT 03
  const image3Y = useTransform(
    scrollYProgress,
    [0.40, 0.64],
    ["100%", "0%"]
  );

  // EVENT 04
  const image4Y = useTransform(
    scrollYProgress,
    [0.64, 0.88],
    ["100%", "0%"]
  );

  /* =======================================================
     IMAGE SCALE
  ======================================================= */

  const image1Scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.34],
    [1, 1.03, 1.12]
  );

  /* =======================================================
     TEXT OPACITY
  ======================================================= */

  // FIRST SCREEN
  const text1Opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28],
    [1, 1, 0]
  );

  // SECOND EVENT
  const text2Opacity = useTransform(
    scrollYProgress,
    [0.27, 0.43],
    [0, 1]
  );

  // THIRD EVENT
  const text3Opacity = useTransform(
    scrollYProgress,
    [0.51, 0.67],
    [0, 1]
  );

  // FOURTH EVENT
  const text4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.91],
    [0, 1]
  );

  /* =======================================================
     TEXT MOVEMENT
  ======================================================= */

  // FIRST SCREEN
  const text1Y = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28],
    ["0%", "0%", "-35%"]
  );

  // SECOND EVENT
  const text2Y = useTransform(
    scrollYProgress,
    [0.27, 0.43],
    ["20%", "0%"]
  );

  // THIRD EVENT
  const text3Y = useTransform(
    scrollYProgress,
    [0.51, 0.67],
    ["20%", "0%"]
  );

  // FOURTH EVENT
  const text4Y = useTransform(
    scrollYProgress,
    [0.75, 0.91],
    ["20%", "0%"]
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full overflow-x-clip bg-[#1D070D]">
      {/* ===================================================
          EVENTS SCROLL SECTION
      =================================================== */}

      <main
        ref={sectionRef}
        className="
          relative
          h-[500vh]
          w-full
          bg-[#1D070D]
        "
      >
        {/* =================================================
            NAVBAR
        ================================================= */}

        <Navbar/>

        {/* =================================================
            SCROLL PROGRESS
        ================================================= */}

        <motion.div
          style={{
            width: progressWidth,
          }}
          className="
            absolute
            left-0
            top-0
            z-[100]
            h-[2px]
            bg-[#C6A15B]
            shadow-[0_0_14px_rgba(198,161,91,0.5)]
          "
        />

        {/* =================================================
            STICKY VIEWPORT
        ================================================= */}

        <div
          className="
            sticky
            top-0
            h-screen
            w-full
            overflow-hidden
          "
        >
          {/* =================================================
              FULL SCREEN CONTAINER
          ================================================= */}

          <div
            className="
              relative
              h-screen
              w-screen
              overflow-hidden
              bg-[#1D070D]
            "
          >
            {/* =================================================
                EVENT 01 — LANDING SCREEN
                
                Only:
                Cultural Sub Council
                EVENTS
                A NEW BEGINNING
                
                NO READ MORE BUTTON
            ================================================= */}

            <EventLayer
  event={events[0]}
  y={image1Y}
  imageScale={image1Scale}
  textOpacity={text1Opacity}
  textY={text1Y}
  zIndex={10}
  centerText={true}
  isLanding={true}
/>

            {/* =================================================
                EVENT 02
            ================================================= */}

            <EventLayer
              event={events[1]}
              y={image2Y}
              imageScale={1}
              textOpacity={text2Opacity}
              textY={text2Y}
              zIndex={20}
            />

            {/* =================================================
                EVENT 03
            ================================================= */}

            <EventLayer
              event={events[2]}
              y={image3Y}
              imageScale={1}
              textOpacity={text3Opacity}
              textY={text3Y}
              zIndex={30}
            />

            {/* =================================================
                EVENT 04
            ================================================= */}

            <EventLayer
              event={events[3]}
              y={image4Y}
              imageScale={1}
              textOpacity={text4Opacity}
              textY={text4Y}
              zIndex={40}
            />

            {/* =================================================
                SIDE EVENT INDEX
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                right-6
                top-1/2
                z-[90]
                hidden
                -translate-y-1/2
                flex-col
                items-end
                gap-4
                lg:flex
              "
            >
              {events.map((event) => (
                <div
                  key={event.number}
                  className="
                    flex
                    items-center
                    gap-3
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-[#F7EBD0]/45
                  "
                >
                  <span>{event.number}</span>

                  <span
                    className="
                      h-px
                      w-5
                      bg-[#C6A15B]/30
                    "
                  />
                </div>
              ))}
            </div>

            

            {/* =================================================
                SCROLL LABEL
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-7
                right-7
                z-[90]
                hidden
                items-center
                gap-3
                sm:flex
                lg:right-10
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-[#F7EBD0]/40
                "
              >
                Scroll to explore
              </span>

              <span
                className="
                  h-8
                  w-px
                  bg-[#C6A15B]/30
                "
              />
            </div>
          </div>
          
        </div>
        
      </main>
<Footer />
      
    </div>
  );
}