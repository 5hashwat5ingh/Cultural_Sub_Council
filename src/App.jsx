import React, { useState, useCallback } from "react";

import { motion, useReducedMotion } from "framer-motion";

import Navbar from "./components/Navbar";
import TextReveal from "./components/TextReveal";
import LineTextReveal from "./components/LineTextReveal";
import ScrollStory from "./components/ScrollStory";
import ReplayButton from "./components/ReplayButton";
import FacultyMessages from "./components/FacultyMessages";
import PageReveal from "./components/PageReveal";

export default function App() {
  const [animationKey, setAnimationKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleReplay = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  const paragraphText =
    "Great experiences begin with simple ideas, thoughtful design, and meaningful interactions that people remember.";

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-x-clip
        bg-[#0A0A0A]
        text-[#EDEDED]
        font-sans
        selection:bg-[#EDEDED]
        selection:text-[#0A0A0A]
      "
    >
      {/* ========================================= */}
      {/* BACKGROUND GRAIN                         */}
      {/* ========================================= */}

      <div
        className="
          fixed
          inset-0
          z-10
          pointer-events-none
          bg-grain
        "
        aria-hidden="true"
      />

      {/* ========================================= */}
      {/* AMBIENT GLOW                             */}
      {/* ========================================= */}

      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.6 }
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
          fixed
          top-[20%]
          left-[15%]
          z-0
          h-[45vw]
          w-[45vw]
          min-h-[320px]
          min-w-[320px]
          max-h-[650px]
          max-w-[650px]
          rounded-full
          pointer-events-none
          bg-ambient-radial
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* Secondary Glow */}

      <div
        className="
          fixed
          bottom-[10%]
          right-[10%]
          z-0
          h-[35vw]
          w-[35vw]
          max-h-[450px]
          max-w-[450px]
          rounded-full
          pointer-events-none
          bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,rgba(10,10,10,0)_70%)]
          blur-2xl
        "
        aria-hidden="true"
      />

      {/* ========================================= */}
      {/* HERO                                      */}
      {/* ========================================= */}

      <div
        key={animationKey}
        className="
          relative
          z-20
          min-h-screen
        "
      >
        <PageReveal />

        <Navbar />

        <main
          id="Homek"
          className="
            relative
            flex
            min-h-screen
            items-center
            px-6
            pt-24
            pb-20
            sm:px-12
            lg:px-20
            xl:px-28
          "
        >
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
            {/* Eyebrow */}

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
              <span
                className="
                  inline-block
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.24em]
                  text-[#8A8A8A]
                  sm:text-xs
                "
              >
                CREATE • PERFORM • BELONG.
              </span>
            </motion.div>

            {/* Main Heading */}

            <div className="mb-8 sm:mb-10">
              <TextReveal
                text={"A Stage \nFor Every Expression"}
                as="h1"
                className="
                  text-[clamp(3.1rem,7.4vw,8.5rem)]
                  font-semibold
                  leading-[0.94]
                  tracking-[-0.035em]
                  text-[#EDEDED]
                "
                delay={0.5}
                duration={0.9}
                stagger={0.1}
                ease={[0.22, 1, 0.36, 1]}
              />
            </div>

            {/* Subtitle */}

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
                text-[#8A8A8A]
                sm:mb-12
                sm:text-lg
                lg:text-xl
              "
            >
              A collective of minds, talents, and stories shaping the
              cultural spirit of our campus.
            </motion.p>
          </div>

          {/* Scroll Indicator */}

          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 1.7,
            }}
            className="
              absolute
              bottom-8
              left-6
              flex
              items-center
              gap-3
              text-[10px]
              uppercase
              tracking-[0.24em]
              text-[#737373]
              sm:left-12
              sm:text-[11px]
              lg:left-28
            "
          >
            <span>Scroll</span>

            <span className="animate-bounce text-[13px] leading-none">
              ↓
            </span>
          </motion.div>
        </main>
      </div>


      {/* ========================================= */}
      {/* INTRO / MANIFESTO                         */}
      {/* ========================================= */}

      <section
        id="manifesto"
        className="relative z-20"
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


      {/* ========================================= */}
      {/* FACULTY MESSAGES                          */}
      {/* ========================================= */}

      <section
        id="messages"
        className="relative z-20"
      >
        <FacultyMessages />
      </section>


      {/* ========================================= */}
      {/* SCROLL STORY                              */}
      {/* ========================================= */}

      <section
        id="work"
        className="relative z-20"
      >
        <ScrollStory />
      </section>


      {/* ========================================= */}
      {/* FOOTER / CONTACT                          */}
      {/* ========================================= */}

      <footer
        id="contact"
        className="
          relative
          z-20
          border-t
          border-white/5
          bg-[#0A0A0A]
          px-6
          py-20
          sm:px-12
          lg:px-20
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-start
            justify-between
            gap-10
            md:flex-row
            md:items-end
          "
        >
          <div>
            <span
              className="
                mb-3
                block
                text-xs
                uppercase
                tracking-[0.25em]
                text-[#8A8A8A]
              "
            >
              Get in Touch
            </span>

            <p
              className="
                text-2xl
                font-medium
                tracking-tight
                text-[#EDEDED]
                sm:text-4xl
              "
            >
              Cultural Sub Council
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              gap-8
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#8A8A8A]
              sm:flex-row
              sm:gap-12
            "
          >
            <a
              href="#work"
              className="transition-colors hover:text-[#EDEDED]"
            >
              Clubs
            </a>

            <a
              href="#manifesto"
              className="transition-colors hover:text-[#EDEDED]"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition-colors hover:text-[#EDEDED]"
            >
              Contact
            </a>

            <span className="text-[#555]">
              © 2026 Cultural Sub Council
            </span>
          </div>
        </div>
      </footer>


      {/* ========================================= */}
      {/* REPLAY                                    */}
      {/* ========================================= */}

      <ReplayButton onReplay={handleReplay} />
    </div>
  );
}