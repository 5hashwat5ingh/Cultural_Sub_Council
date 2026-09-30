import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TextReveal Component
 *
 * Reusable masked text reveal with Framer Motion.
 *
 * Splits input text by lines and words, wrapping each word
 * in an overflow-hidden container and animating it upward
 * with a smooth cubic-bezier curve.
 */

export default function TextReveal({
  text,
  as: Component = "h1",
  className = "",
  delay = 0.5,
  duration = 0.9,
  stagger = 0.09,
  ease = [0.22, 1, 0.36, 1],
}) {
  const shouldReduceMotion = useReducedMotion();

  /* =========================================================
     NORMALIZE TEXT
  ========================================================= */

  const lines = Array.isArray(text)
    ? text
    : typeof text === "string"
    ? text.split("\n")
    : [String(text)];


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
     WORD ANIMATION
  ========================================================= */

  const wordVariants = {
    hidden: {
      y: shouldReduceMotion ? "0%" : "110%",
      opacity: shouldReduceMotion ? 1 : 0,
    },

    visible: {
      y: "0%",
      opacity: 1,

      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        ease,
      },
    },
  };


  /* =========================================================
     MOTION COMPONENT
  ========================================================= */

  const MotionComponent = motion[Component] || motion.h1;


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={
        Array.isArray(text)
          ? text.join(" ")
          : text
      }
    >

      {lines.map((line, lineIdx) => {
        const words = line.trim().split(/\s+/);

        return (
          <span
            key={`line-${lineIdx}`}
            className="
              block
              overflow-visible
            "
          >

            {words.map((word, wordIdx) => (
              <span
                key={`word-${lineIdx}-${wordIdx}`}
                className="
                  inline-block
                  overflow-hidden
                  align-baseline
                  mr-[0.26em]
                  last:mr-0
                  pb-[0.18em]
                  -mb-[0.18em]
                "
              >

                <motion.span
                  variants={wordVariants}
                  className="
                    inline-block
                    will-change-transform
                  "
                >
                  {word}
                </motion.span>

              </span>
            ))}

          </span>
        );
      })}

    </MotionComponent>
  );
}