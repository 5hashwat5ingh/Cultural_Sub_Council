import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

export default function LineTextReveal({
  text = `A vibrant hub of creativity and talent, the Cultural Sub Council of Madan Mohan Malaviya University of Technology, Gorakhpur brings the campus alive through music, dance, theatre, and performance. From HEATS to the flagship fest Abhyudaya, it provides a platform for students to express, create, and inspire.
`,

  className = "",

  eyebrow = "About / CSC",

  duration = 1.9,

  stagger = 0.12,

  delay = 0.05,

  once = false,

  amount = 0.25,
}) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);

  const [lines, setLines] = useState([]);

  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(containerRef, {
    once,
    amount,
  });

  /* =========================================================
     WORDS FOR LINE MEASUREMENT
  ========================================================= */

  const words = (text || "")
    .replace(/\n/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  /* =========================================================
     DETECT ACTUAL VISUAL LINES
  ========================================================= */

  const calculateLines = () => {
    const container = measureRef.current;

    if (!container) return;

    const wordElements =
      container.querySelectorAll(".measure-word");

    if (!wordElements.length) return;

    const detectedLines = [];

    let currentLine = [];
    let currentTop = null;

    wordElements.forEach((word) => {
      const top = word.offsetTop;

      if (
        currentTop !== null &&
        Math.abs(top - currentTop) > 2
      ) {
        if (currentLine.length) {
          detectedLines.push(
            currentLine.join(" ")
          );
        }

        currentLine = [];
      }

      currentLine.push(word.textContent);
      currentTop = top;
    });

    if (currentLine.length) {
      detectedLines.push(
        currentLine.join(" ")
      );
    }

    setLines(detectedLines);
  };

  /* =========================================================
     INITIAL MEASUREMENT
  ========================================================= */

  useLayoutEffect(() => {
    calculateLines();
  }, [text]);

  /* =========================================================
     RESPONSIVE MEASUREMENT
  ========================================================= */

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        calculateLines();
      }, 100);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    let observer;

    if (
      typeof ResizeObserver !== "undefined" &&
      measureRef.current
    ) {
      observer = new ResizeObserver(() => {
        calculateLines();
      });

      observer.observe(measureRef.current);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        calculateLines();
      });
    }

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      clearTimeout(resizeTimer);

      if (observer) {
        observer.disconnect();
      }
    };
  }, [text]);

  /* =========================================================
     FALLBACK
  ========================================================= */

  const visibleLines =
    lines.length > 0
      ? lines
      : text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

  /* =========================================================
     CONTAINER ANIMATION
  ========================================================= */

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  /* =========================================================
     LINE ANIMATION
  ========================================================= */

  const lineVariants = {
    hidden: {
      y: shouldReduceMotion ? "0%" : "115%",
      opacity: shouldReduceMotion ? 1 : 0,
    },

    visible: {
      y: "0%",
      opacity: 1,

      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className={`
        relative
        flex
        min-h-[75vh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#DCD3A4]
        px-6
        py-24
        sm:px-12
        sm:py-32
        lg:px-20
        lg:py-40
        ${className}
      `}
    >
      {/* =====================================================
          BACKGROUND — SOFT MAROON TINT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-12%]
          top-[-8%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#7A1B2F]/[0.10]
          blur-[120px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SECONDARY MAROON TINT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-12%]
          top-[25%]
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#8B1E3F]/[0.07]
          blur-[120px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SOFT GOLD GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-15%]
          right-[-5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#C6A15B]/[0.14]
          blur-[120px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SOFT LIGHT CENTER
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F5EFD0]/[0.35]
          blur-[130px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1350px]
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[1fr_360px]
            lg:gap-16
            xl:grid-cols-[1fr_430px]
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT — TEXT CONTENT
          ================================================= */}

          <div className="min-w-0">
            {/* =================================================
                INVISIBLE LINE MEASUREMENT
            ================================================= */}

            <div
              ref={measureRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                w-full
                select-none
                opacity-0
                text-[clamp(1.15rem,2.4vw,2.5rem)]
                font-medium
                leading-[1.15]
                tracking-[-0.025em]
              "
            >
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="
                    measure-word
                    inline-block
                    mr-[0.27em]
                  "
                >
                  {word}
                </span>
              ))}
            </div>

            {/* =================================================
                EYEBROW
            ================================================= */}

            {eyebrow && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 15,
                      }
                }
                transition={{
                  duration: shouldReduceMotion
                    ? 0
                    : 1.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mb-7
                  sm:mb-9
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.28em]
                      text-[#8B1E3F]
                      sm:text-xs
                    "
                  >
                    {eyebrow}
                  </span>

                  <span
                    className="
                      h-px
                      w-10
                      bg-[#C6A15B]/50
                      sm:w-16
                    "
                  />
                </div>
              </motion.div>
            )}

            {/* =================================================
                TEXT REVEAL
            ================================================= */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={
                isInView
                  ? "visible"
                  : "hidden"
              }
              className="
                text-[clamp(1.15rem,2.4vw,2.5rem)]
                font-medium
                leading-[1.15]
                tracking-[-0.025em]
                text-[#241018]
              "
            >
              {visibleLines.map(
                (line, index) => (
                  <div
                    key={`${index}-${line}`}
                    className="
                      overflow-hidden
                      py-[0.04em]
                    "
                  >
                    <motion.div
                      variants={lineVariants}
                      className="
                        block
                        transform-gpu
                        will-change-transform
                      "
                    >
                      {line}
                    </motion.div>
                  </div>
                )
              )}
            </motion.div>

            {/* =================================================
                GOLD DECORATIVE LINE
            ================================================= */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={
                isInView
                  ? {
                      width: "72px",
                      opacity: 1,
                    }
                  : {
                      width: 0,
                      opacity: 0,
                    }
              }
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 1,
                delay: shouldReduceMotion
                  ? 0
                  : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-8
                h-[2px]
                bg-[#C6A15B]
                sm:mt-10
              "
            />
          </div>

          {/* =================================================
              RIGHT — IMAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[360px]
              lg:max-w-none
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-[24px]
                border
                border-[#7A1B2F]/15
                bg-[#F5EFD0]
                p-1
                             "
            >
              <img
                src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791236689/WhatsApp_Image_2026-10-06_at_2.17.46_AM.jpg"
                alt="Cultural Sub Council"
                className="
                  h-full
                  w-full
                  rounded-[20px]
                  object-cover
                  transition-transform
                  duration-1000
                  hover:scale-[1.03]
                "
              />

              {/* INNER GOLD FRAME */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-2
                  rounded-[19px]
                  border
                  border-[#C6A15B]/30
                "
              />

              {/* SOFT IMAGE OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[24px]
                  bg-gradient-to-t
                  from-[#2B0A12]/20
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* SMALL DECORATIVE LINE */}

            <div
              className="
                absolute
                -bottom-4
                -left-4
                h-16
                w-16
                border-b
                border-l
                border-[#7A1B2F]/30
              "
            />

            <div
              className="
                absolute
                -right-4
                -top-4
                h-16
                w-16
                border-r
                border-t
                border-[#C6A15B]/50
              "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}