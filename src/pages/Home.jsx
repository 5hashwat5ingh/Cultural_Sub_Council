
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LineTextReveal from "../components/LineTextReveal";
import ScrollStory from "../components/ScrollStory";
import FacultyMessages from "../components/FacultyMessages";

/* =========================================================
   HERO SLIDES
========================================================= */

const heroSlides = [
  {
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791573509/Symmetrical_University_Gate_at_Night.png",
    alt: "Fine arts club",
  },
  {
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791571548/Atal_Bhawan_Illuminated_at_Night1.png",
    alt: "Atal Bhawan",
  },
  {
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791571892/Illuminated_Malaviya_Block_Entrance.png",
    alt: "MMMUT Block",
  },
  {
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791572378/Festive_Multipurpose_Hall_at_Night.png",
    alt: "MPH",
  },
  {
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791573015/Vibrant_EDM_Concert_Under_Stadium_Lights.png",
    alt: "Music club performance",
  },
];

/* =========================================================
   HERO IMAGE SLIDER
========================================================= */

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Automatically advance the slider every 4 seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const showSlide = (index) => {
    setCurrent((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      id="home"
      className="
        relative
        h-screen
        min-h-[500px]
        w-full
        overflow-hidden
        bg-[#1D070D]
      "
      aria-label="Cultural Sub Council image slideshow"
    >
      {/* =====================================================
          SLIDING IMAGES
      ===================================================== */}

      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={current}
          src={heroSlides[current].image}
          alt={heroSlides[current].alt}
          draggable={false}
          initial={{
            opacity: 0,
            x: shouldReduceMotion ? 0 : 70,
            scale: shouldReduceMotion ? 1 : 1.03,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: shouldReduceMotion ? 0 : -70,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            select-none
          "
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
      </AnimatePresence>

      {/* =====================================================
          SUBTLE OVERLAY
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/10
        "
        aria-hidden="true"
      />

      {/* =====================================================
          BOTTOM GRADIENT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-32
          bg-gradient-to-t
          from-[#1D070D]/30
          to-transparent
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SLIDE INDICATORS
      ===================================================== */}

     

      {/* =====================================================
          SLIDE COUNTER
      ===================================================== */}

      
    </section>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  const paragraphText =
    "A vibrant hub of creativity and talent, the Cultural Sub Council of Madan Mohan Malaviya University of Technology, Gorakhpur brings the campus alive through music, dance, theatre, and performance. From HEATS to the flagship fest Abhyudaya, it provides a platform for students to express, create, and inspire.";

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-x-clip
        bg-[#2B0A12]
        font-sans
        text-[#F7EBD0]
        selection:bg-[#C6A15B]
        selection:text-[#2B0A12]
      "
    >
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative w-full">
        <Navbar />
        <HeroSlider />
      </section>

      {/* =====================================================
          MANIFESTO / ABOUT
      ===================================================== */}

      <section
        id="manifesto"
        className="
          relative
          m-0
          min-h-[48vh]
          w-full
          overflow-hidden
          bg-[#0E0504]
        "
      >
        {/* Maroon atmospheric glow */}
        <div
          className="
            pointer-events-none
            absolute
            -top-40
            left-1/2
            h-[520px]
            w-[900px]
            max-w-full
            -translate-x-1/2
            rounded-full
            bg-[#7A1B2F]/20
            blur-[150px]
          "
          aria-hidden="true"
        />

        {/* Warm gold glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-[12%]
            top-20
            h-40
            w-40
            rounded-full
            bg-[#F8C85E]/5
            blur-[90px]
          "
          aria-hidden="true"
        />

        <div className="relative z-10">
          <LineTextReveal
            text={paragraphText}
            eyebrow="About / CSC"
            duration={0.85}
            stagger={0.12}
            delay={0.3}
            amount={0.3}
          />
        </div>
      </section>

      {/* =====================================================
          FACULTY MESSAGES
      ===================================================== */}

      <section
        id="messages"
        className="
          relative
          m-0
          w-full
          overflow-hidden
          bg-[#320B15]
        "
      >
        {/* Right maroon glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-20
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#7A1B2F]/20
            blur-[150px]
          "
          aria-hidden="true"
        />

        {/* Left gold glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            bottom-0
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#F8C85E]/5
            blur-[130px]
          "
          aria-hidden="true"
        />

        <div className="relative z-10">
          <FacultyMessages />
        </div>
      </section>

      {/* =====================================================
          SCROLL STORY AND FOOTER
      ===================================================== */}

      <section
        id="work"
        className="
          relative
          m-0
          w-full
          bg-[#2B0A12]
          p-0
        "
      >
        <ScrollStory />
        <Footer />
      </section>
    </div>
  );
}
