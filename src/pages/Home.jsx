import React, {
  useCallback,
  useState,
} from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextReveal from "../components/TypingText";
import LineTextReveal from "../components/LineTextReveal";
import ScrollStory from "../components/ScrollStory";
import FacultyMessages from "../components/FacultyMessages";
import Preloader from "../components/Preloader";

/* ============================================================
   HERO IMAGE
============================================================ */

const HERO_IMAGE = "/hero-festival.png";

/* ============================================================
   LANTERNS
============================================================ */

const LANTERNS = [
  {
    id: 1,
    left: "37%",
    top: "40%",
    size: 95,
    color: "rgba(255, 166, 55, 0.55)",
    delay: 0,
    duration: 3.8,
  },
  {
    id: 2,
    left: "62%",
    top: "33%",
    size: 110,
    color: "rgba(255, 191, 74, 0.58)",
    delay: 0.5,
    duration: 4.2,
  },
  {
    id: 3,
    left: "74%",
    top: "28%",
    size: 105,
    color: "rgba(255, 140, 45, 0.62)",
    delay: 1,
    duration: 3.6,
  },
  {
    id: 4,
    left: "83%",
    top: "39%",
    size: 115,
    color: "rgba(255, 173, 61, 0.55)",
    delay: 0.7,
    duration: 4.5,
  },
  {
    id: 5,
    left: "55%",
    top: "49%",
    size: 75,
    color: "rgba(255, 192, 86, 0.4)",
    delay: 1.3,
    duration: 3.9,
  },
  {
    id: 6,
    left: "48%",
    top: "31%",
    size: 68,
    color: "rgba(255, 211, 120, 0.42)",
    delay: 1.8,
    duration: 4.1,
  },
];

/* ============================================================
   LARGE FESTIVAL PARTICLES
============================================================ */

const FESTIVAL_PARTICLES = Array.from(
  { length: 70 },
  (_, index) => {
    const x =
      4 + ((index * 37) % 92);

    const y =
      5 + ((index * 29) % 88);

    const size =
      index % 11 === 0
        ? 4
        : index % 5 === 0
        ? 3
        : 1.5 + (index % 2);

    const delay =
      (index % 12) * 0.35;

    const duration =
      3.5 + (index % 7) * 0.65;

    const drift =
      -18 + ((index * 13) % 37);

    const brightness =
      0.35 + (index % 6) * 0.1;

    let type = "normal";

    if (index % 9 === 0) {
      type = "bright";
    } else if (index % 4 === 0) {
      type = "soft";
    }

    return {
      id: index,
      left: `${x}%`,
      top: `${y}%`,
      size,
      delay,
      duration,
      drift,
      brightness,
      type,
    };
  }
);

/* ============================================================
   MICRO DUST
============================================================ */

const DUST_PARTICLES = Array.from(
  { length: 110 },
  (_, index) => {
    const x =
      2 + ((index * 47) % 96);

    const y =
      2 + ((index * 31) % 94);

    const delay =
      (index % 18) * 0.22;

    const duration =
      4.5 + (index % 6) * 0.65;

    const drift =
      -10 + ((index * 17) % 21);

    return {
      id: index,
      left: `${x}%`,
      top: `${y}%`,
      delay,
      duration,
      drift,
    };
  }
);

/* ============================================================
   LANTERN GLOW
============================================================ */

function LanternGlow({
  lantern,
  reduceMotion,
  mouseX,
  mouseY,
}) {
  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        z-[4]
        rounded-full
      "
      style={{
        left: lantern.left,
        top: lantern.top,
        width: lantern.size,
        height: lantern.size,

        x: reduceMotion
          ? 0
          : mouseX,

        y: reduceMotion
          ? 0
          : mouseY,

        translateX: "-50%",
        translateY: "-50%",

        background: `radial-gradient(
          circle,
          ${lantern.color} 0%,
          rgba(255, 160, 45, 0.22) 28%,
          rgba(255, 130, 30, 0.08) 48%,
          transparent 72%
        )`,

        filter: "blur(7px)",
      }}
      animate={
        reduceMotion
          ? {
              opacity: 0.65,
              scale: 1,
            }
          : {
              opacity: [
                0.5,
                0.9,
                0.6,
                0.85,
                0.5,
              ],
              scale: [
                0.9,
                1.08,
                0.96,
                1.05,
                0.9,
              ],
            }
      }
      transition={{
        duration: lantern.duration,
        delay: lantern.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ============================================================
   PARTICLES
============================================================ */

function FestivalParticles({
  reduceMotion,
}) {
  return (
    <>
      {/* ======================================================
          LARGE GLOWING PARTICLES
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[6]
          overflow-hidden
        "
        aria-hidden="true"
      >
        {FESTIVAL_PARTICLES.map(
          (particle) => (
            <motion.span
              key={particle.id}
              className="
                absolute
                rounded-full
                bg-[#FFD98A]
              "
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,

                boxShadow:
                  particle.type === "bright"
                    ? `
                      0 0 4px rgba(255,220,140,1),
                      0 0 10px rgba(255,190,75,0.95),
                      0 0 20px rgba(255,150,40,0.7)
                    `
                    : particle.type === "soft"
                    ? `
                      0 0 5px rgba(255,210,120,0.7),
                      0 0 12px rgba(255,170,55,0.4)
                    `
                    : `
                      0 0 4px rgba(255,210,120,0.65),
                      0 0 9px rgba(255,165,45,0.35)
                    `,
              }}
              animate={
                reduceMotion
                  ? {
                      opacity:
                        particle.brightness,
                    }
                  : {
                      x: [
                        0,
                        particle.drift,
                        particle.drift * -0.45,
                        particle.drift * 0.65,
                        0,
                      ],

                      y: [
                        0,
                        -18,
                        -42,
                        -65,
                        -82,
                      ],

                      opacity:
                        particle.type === "bright"
                          ? [
                              0.05,
                              0.9,
                              0.45,
                              1,
                              0,
                            ]
                          : [
                              0.05,
                              particle.brightness,
                              0.25,
                              particle.brightness,
                              0,
                            ],

                      scale:
                        particle.type === "bright"
                          ? [
                              0.5,
                              1.25,
                              0.75,
                              1.4,
                              0.3,
                            ]
                          : [
                              0.7,
                              1,
                              0.8,
                              1.05,
                              0.35,
                            ],
                    }
              }
              transition={{
                duration:
                  particle.duration,
                delay:
                  particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )
        )}
      </div>

      {/* ======================================================
          MICRO DUST
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          overflow-hidden
        "
        aria-hidden="true"
      >
        {DUST_PARTICLES.map(
          (particle) => (
            <motion.span
              key={`dust-${particle.id}`}
              className="
                absolute
                h-[1px]
                w-[1px]
                rounded-full
                bg-[#FFE9B0]
              "
              style={{
                left: particle.left,
                top: particle.top,
                boxShadow:
                  "0 0 5px rgba(255,210,120,0.7)",
              }}
              animate={
                reduceMotion
                  ? {
                      opacity: 0.2,
                    }
                  : {
                      opacity: [
                        0,
                        0.25,
                        0.55,
                        0.15,
                        0,
                      ],

                      y: [
                        0,
                        -10,
                        -25,
                        -40,
                      ],

                      x: [
                        0,
                        particle.drift * 0.3,
                        particle.drift,
                        particle.drift * 0.5,
                      ],
                    }
              }
              transition={{
                duration:
                  particle.duration,
                delay:
                  particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )
        )}
      </div>
    </>
  );
}

/* ============================================================
   HOME PAGE
============================================================ */

export default function Home() {
  const [animationKey] =
    useState(0);

  const shouldReduceMotion =
    useReducedMotion();

  /* ==========================================================
     MOUSE PARALLAX
  ========================================================== */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const smoothX =
    useSpring(mouseX, {
      stiffness: 70,
      damping: 20,
      mass: 0.8,
    });

  const smoothY =
    useSpring(mouseY, {
      stiffness: 70,
      damping: 20,
      mass: 0.8,
    });

  const handleMouseMove =
    useCallback(
      (event) => {
        if (shouldReduceMotion) {
          return;
        }

        const rect =
          event.currentTarget.getBoundingClientRect();

        const x =
          (event.clientX -
            rect.left) /
            rect.width -
          0.5;

        const y =
          (event.clientY -
            rect.top) /
            rect.height -
          0.5;

        mouseX.set(x * 12);
        mouseY.set(y * 9);
      },
      [
        mouseX,
        mouseY,
        shouldReduceMotion,
      ]
    );

  const handleMouseLeave =
    useCallback(() => {
      mouseX.set(0);
      mouseY.set(0);
    }, [mouseX, mouseY]);

  /* ==========================================================
     MANIFESTO
  ========================================================== */

  const paragraphText =
    "A vibrant hub of creativity and talent, the Cultural Sub Council of Madan Mohan Malaviya University of Technology, Gorakhpur brings the campus alive through music, dance, theatre, and performance. From HEATS to the flagship fest Abhyudaya, it provides a platform for students to express, create, and inspire.";

  return (
    <div
      className="
        relative
        mt-[-40px]
        min-h-screen
        w-full
        overflow-x-clip
        bg-[#2D0E05]
        font-sans
       text-[12px]
    text-[#2B0A12]
        
        selection:bg-[#C9A24D]
        selection:text-[#1D070D]
      "
    >

      {/* ======================================================
          SUBTLE GLOBAL GRAIN
      ====================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[100]
          opacity-[0.035]
          mix-blend-soft-light
          bg-grain
        "
        aria-hidden="true"
      />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        key={animationKey}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          bg-[#1D070D]
        "
      >

        {/* ====================================================
            FESTIVAL IMAGE
        ==================================================== */}

       <motion.div
  className="
    absolute
    inset-[-2%]
    z-0
    overflow-hidden
  "
  animate={
    shouldReduceMotion
      ? {
          scale: 1,
        }
      : {
          scale: [
            1,
            1.018,
            1,
          ],
        }
  }
  transition={{
    duration: 18,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    x: shouldReduceMotion
      ? 0
      : smoothX,
    y: shouldReduceMotion
      ? 0
      : smoothY,
  }}
>
  <video
    src="https://res.cloudinary.com/yh0rqnnu/video/upload/v1791223934/savefromins.com__The_spark_is_lit._The_stage_is_calling._Abhyudaya_is_ready_to_unfold.____The_calm_before_the_storm_begins_now._A_spark_of_art_culture_and_creativity_is_about_to_ignite_something_unforge.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="
      h-full
      min-h-screen
      w-full
      select-none
      object-cover
      object-center
    "
  />
</motion.div>

        {/* ====================================================
            VERY SUBTLE IMAGE DEPTH
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            bg-black/10
          "
          aria-hidden="true"
        />

        {/* ====================================================
            LANTERN GLOWS
        ==================================================== */}

        {LANTERNS.map(
          (lantern) => (
            <LanternGlow
              key={lantern.id}
              lantern={lantern}
              reduceMotion={
                shouldReduceMotion
              }
              mouseX={smoothX}
              mouseY={smoothY}
            />
          )
        )}

        {/* ====================================================
            WARM LIGHT BLOOM
        ==================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            right-[11%]
            top-[15%]
            z-[3]
            h-44
            w-44
            rounded-full
          "
          style={{
            background:
              "radial-gradient(circle, rgba(255,175,65,0.15) 0%, rgba(255,145,30,0.06) 38%, transparent 72%)",
            filter: "blur(14px)",
          }}
          animate={
            shouldReduceMotion
              ? {
                  opacity: 0.5,
                }
              : {
                  opacity: [
                    0.3,
                    0.75,
                    0.4,
                    0.7,
                    0.3,
                  ],
                  scale: [
                    0.9,
                    1.15,
                    0.95,
                    1.08,
                    0.9,
                  ],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ====================================================
            FESTIVAL PARTICLES
        ==================================================== */}

        <FestivalParticles
          reduceMotion={
            shouldReduceMotion
          }
        />

        {/* ====================================================
            PAGE REVEAL
            <Preloader />
        ==================================================== */}

       

        {/* ====================================================
            NAVBAR
        ==================================================== */}

        <div
          className="
            relative
            z-40
          "
        >
          <Navbar />
        </div>

        {/* ====================================================
            HERO CONTENT
        ==================================================== */}

        <main
          id="home"
          className="
            relative
            z-20
            flex
            min-h-screen
            items-center
            px-6
            pb-20
            pt-24

            sm:px-12

            lg:px-20
            lg:pt-20

            xl:px-28
          "
        >

          

          {/* ==================================================
              HERO CONTENT
          ================================================== */}

          <div
            className="
              mx-auto
              w-full
              max-w-[1500px]
              lg:ml-[4%]
              xl:ml-[6%]
            "
          >
            <div
              className="
                w-full
                max-w-[720px]
              "
            >

              

              {/* ==============================================
                  MAIN TITLE
              ============================================== */}

              <div
                className="
                  relative
                  mt-10
                  mb-7
                  max-w-[720px]
                  sm:mb-9
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -left-5
                    top-2
                    hidden
                    h-2
                    w-2
                    rotate-45
                    border
                    border-[#D9B86C]
                    shadow-[0_0_12px_rgba(217,184,108,0.8)]
                    lg:block
                  "
                />

                <TextReveal
                  text={`A Stage
For Every Expression`}
                  as="h1"
                  className="
                    text-[clamp(3.1rem,7.4vw,8.5rem)]
                    font-semibold
                    leading-[0.94]
                    tracking-[-0.035em]
                    text-[#F8E2C5]
                    drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]
                  "
                  delay={0.5}
                  duration={0.9}
                  stagger={0.1}
                  ease={[
                    0.22,
                    1,
                    0.36,
                    1,
                  ]}
                />
              </div>

             
              {/* ==============================================
                  DESCRIPTION
              ============================================== */}

              <motion.p
                initial={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 0.75,
                  delay:
                    shouldReduceMotion
                      ? 0
                      : 1.25,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  max-w-[510px]
                  text-xs
                  leading-7
                  text-[#FFF4DF]
                  mt-[60px]
                  drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]
                  sm:text-base
                  sm:leading-8
                  lg:text-lg
                "
              >
                A collective of minds, talents,
                and stories shaping the cultural
                spirit of our campus.
              </motion.p>

             

              {/* ==============================================
                  EXPLORE EVENTS
              ============================================== */}

             <motion.div
  initial={
    shouldReduceMotion
      ? {
          opacity: 1,
          y: 0,
        }
      : {
          opacity: 0,
          y: 15,
        }
  }
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: shouldReduceMotion ? 0 : 0.7,
    delay: shouldReduceMotion ? 0 : 1.6,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    mt-9
    sm:mt-11
  "
>
  <a
    href="/events"
    className="
      group
      inline-flex
      items-center
      justify-center
      gap-3
      rounded-full
      border
      border-[#C6A15B]/50
      bg-transparent
      px-5
      py-3
      text-xs
      uppercase
      tracking-[0.2em]
      text-[#F7EBD0]
      transition-all
      duration-300
      hover:border-[#D9B86C]
      hover:bg-[#C6A15B]
      hover:text-[#2B0A12]
      sm:px-6
      sm:py-3.5
    "
  >
    <span>
      Explore Events
    </span>

    <span
      className="
        text-base
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    >
      →
    </span>
  </a>
</motion.div>
            </div>
          </div>

          
          

          {/* ==================================================
              HERO → MANIFESTO TRANSITION
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              z-30
              h-28
              w-full
              bg-gradient-to-t
              from-[#0E0504]
              via-[#0E0504]/35
              to-transparent
            "
            aria-hidden="true"
          />
        </main>
      </section>

      {/* ======================================================
          MANIFESTO
      ====================================================== */}

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

        {/* Atmospheric maroon glow */}

        <div
          className="
            pointer-events-none
            absolute
            -top-40
            left-1/2
            h-[520px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-[#7A1B2F]/20
            blur-[150px]
          "
        />

        {/* Warm gold atmosphere */}

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
        />

        <div
          className="
            relative
            z-10
          "
        >
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

      {/* ======================================================
          FACULTY
      ====================================================== */}

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

        {/* Right atmospheric glow */}

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
        />

        <div
          className="
            relative
            z-10
          "
        >
          <FacultyMessages />
        </div>
      </section>

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