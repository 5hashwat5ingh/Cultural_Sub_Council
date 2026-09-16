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
  text = `Great experiences begin with
simple ideas, thoughtful design,
and meaningful interactions that
people remember.`,

  className = "",
  eyebrow = "PERSPECTIVE / CRAFT",

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

  /*
   * -----------------------------------------
   * WORDS FOR LINE MEASUREMENT
   * -----------------------------------------
   */

  const words = (text || "")
    .replace(/\n/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  /*
   * -----------------------------------------
   * DETECT ACTUAL VISUAL LINES
   * -----------------------------------------
   */

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
          detectedLines.push(currentLine.join(" "));
        }

        currentLine = [];
      }

      currentLine.push(word.textContent);

      currentTop = top;
    });

    if (currentLine.length) {
      detectedLines.push(currentLine.join(" "));
    }

    setLines(detectedLines);
  };

  /*
   * -----------------------------------------
   * INITIAL MEASUREMENT
   * -----------------------------------------
   */

  useLayoutEffect(() => {
    calculateLines();
  }, [text]);

  /*
   * -----------------------------------------
   * RESPONSIVE MEASUREMENT
   * -----------------------------------------
   */

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        calculateLines();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    /*
     * Recalculate when container dimensions change
     */

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

    /*
     * Recalculate after fonts load
     */

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

  /*
   * -----------------------------------------
   * FALLBACK
   * -----------------------------------------
   */

  const visibleLines =
    lines.length > 0
      ? lines
      : text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

  /*
   * -----------------------------------------
   * CONTAINER ANIMATION
   * -----------------------------------------
   */

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  /*
   * -----------------------------------------
   * LINE ANIMATION
   * -----------------------------------------
   */

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
        bg-[#0A0A0A]
        px-6
        py-32
        sm:px-12
        sm:py-40
        lg:px-20
        lg:py-52
        ${className}
      `}
    >
      <div className="relative mx-auto w-full max-w-[1100px]">

        {/* =====================================
            INVISIBLE LINE MEASUREMENT
        ===================================== */}

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
            text-[clamp(2rem,4.2vw,4.75rem)]
            font-medium
            leading-[1.08]
            tracking-[-0.035em]
          "
        >
          {words.map((word, index) => (
            <span
              key={index}
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

        {/* =====================================
            EYEBROW
        ===================================== */}

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
              duration: shouldReduceMotion ? 0 : 1.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 sm:mb-12"
          >
            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-white/40
                sm:text-xs
              "
            >
              {eyebrow}
            </span>
          </motion.div>
        )}

        {/* =====================================
            TEXT REVEAL
        ===================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="
            text-[clamp(2rem,4.2vw,4.75rem)]
            font-medium
            leading-[1.08]
            tracking-[-0.035em]
            text-[#F1F1F1]
          "
        >
          {visibleLines.map((line, index) => (
            /*
             * IMPORTANT:
             * This is the mask.
             */
            <div
              key={`${index}-${line}`}
              className="
                overflow-hidden
                py-[0.06em]
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}