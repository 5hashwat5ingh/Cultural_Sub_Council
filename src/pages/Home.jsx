import React, { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextReveal from "../components/TypingText";
import LineTextReveal from "../components/LineTextReveal";
import ScrollStory from "../components/ScrollStory";
import FacultyMessages from "../components/FacultyMessages";
import PageReveal from "../components/PageReveal";

export default function Home() {
  const [animationKey, setAnimationKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  

  const paragraphText =
    "Great experiences begin with simple ideas, thoughtful design, and meaningful interactions that people remember.";

  return (
    <div
      className="
        relative
        w-full
        overflow-x-clip
        bg-[#2B0A12]
        text-[#F8F1DF]
        font-sans
        selection:bg-[#C9A24D]
        selection:text-[#081A33]
      "
    >
      {/* =====================================================
          GRAIN
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-10
          bg-grain
        "
        aria-hidden="true"
      />

      {/* =====================================================
          MAROON AMBIENT GLOW
      ===================================================== */}

      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.45 }
            : {
                x: ["-2%", "3%", "-1%", "-2%"],
                y: ["-2%", "2%", "-3%", "-2%"],
                scale: [1, 1.05, 0.98, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          fixed
          left-[5%]
          top-[8%]
          z-0
          h-[45vw]
          w-[45vw]
          min-h-[320px]
          min-w-[320px]
          max-h-[650px]
          max-w-[650px]
          rounded-full
          bg-maroon-radial
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* =====================================================
          GOLD AMBIENT GLOW
      ===================================================== */}

      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.25 }
            : {
                x: ["2%", "-2%", "1%", "2%"],
                y: ["2%", "-1%", "2%", "2%"],
                scale: [1, 1.04, 0.97, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          fixed
          bottom-[5%]
          right-[3%]
          z-0
          h-[35vw]
          w-[35vw]
          max-h-[500px]
          max-w-[500px]
          rounded-full
          bg-gold-radial
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <div
        key={animationKey}
        className="
          relative
          z-20
          min-h-screen
          overflow-hidden
          bg-[#2B0A12]
        "
      >
        {/* =================================================
            HERO GRADIENT OVERLAY
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            bg-gradient-to-r
            from-[#2B0A12]
            via-[#2B0A12]/75
            to-transparent
          "
          aria-hidden="true"
        />

        <PageReveal />

        <Navbar Home />

        <main
          id="home"
          className="
            relative
            z-10
            flex
            min-h-screen
            items-center
            px-6
            pb-20
            pt-24
            sm:px-12
            lg:px-20
            xl:px-28
          "
        >
          {/* =================================================
              HERITAGE ARCHITECTURAL LINES
          ================================================= */}

          {/* =================================================
              TOP LEFT ORNAMENT
          ================================================= */}

          {/* =================================================
              BOTTOM RIGHT ORNAMENT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-20
              right-6
              hidden
              h-16
              w-16
              border-b
              border-r
              border-[#C9A24D]/30
              lg:block
            "
          />

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div
            className="
              mx-auto
              w-full
              max-w-6xl
              text-left
              lg:ml-[4%]
              xl:ml-[6%]
            "
          >
            {/* =================================================
                EYEBROW
            ================================================= */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 14 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: shouldReduceMotion ? 0 : 0.3,
              }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-[0.5px]
                    w-10
                    bg-[#C9A24D]
                    sm:w-18
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.24em]
                    text-[#C9A24D]
                    sm:text-xs
                  "
                >
                  CREATE • PERFORM • BELONG.
                </span>
              </div>
            </motion.div>

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <div className="mb-8 sm:mb-10">
  <TextReveal
    text={"A Stage \nFor Every Expression"}
    as="h1"
    className="
      text-[clamp(3.1rem,7.4vw,8.5rem)]
      font-semibold
      leading-[0.94]
      tracking-[-0.02em]
      text-[#F8F1DF]
    "
    delay={0.5}
    duration={0.9}
    stagger={0.1}
    ease={[0.22, 1, 0.36, 1]}
  />
</div>

            {/* =================================================
                HERITAGE ORNAMENT
            ================================================= */}

            <div className="mb-7 flex items-center gap-2">
              <span className="h-px w-8 bg-[#C9A24D]/60" />

              <span className="h-1.5 w-1.5 rotate-45 bg-[#D9B86C]" />

              <span className="h-px w-12 bg-[#C9A24D]/25" />
            </div>

            {/* =================================================
                SUBTITLE
            ================================================= */}

            <motion.p
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: shouldReduceMotion ? 0 : 1.15,
              }}
              className="
                mb-10
                max-w-xl
                text-base
                font-normal
                leading-relaxed
                text-[#D8C7AA]
                sm:mb-12
                sm:text-lg
                lg:text-xl
              "
            >
              A collective of minds, talents, and stories shaping the
              cultural spirit of our campus.
            </motion.p>
          </div>

          {/* =================================================
              SCROLL INDICATOR
          ================================================= */}

          
        </main>
      </div>

      {/* =====================================================
          MANIFESTO
      ===================================================== */}

      <section
        id="manifesto"
        className="
          relative
          m-0
          w-full
          bg-[#2B0A12]
          p-0
        "
      >
        <LineTextReveal
          text={paragraphText}
          eyebrow="PERSPECTIVE / CRAFT"
          duration={0.85}
          stagger={0.12}
          delay={0.3}
          amount={0.3}
        />
      </section>

      {/* =====================================================
          FACULTY
      ===================================================== */}

      <section
        id="messages"
        className="
          relative
          m-0
          w-full
          bg-[#2B0A12]
          p-0
        "
      >
        <FacultyMessages />
      </section>

      {/* =====================================================
          SCROLL STORY
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