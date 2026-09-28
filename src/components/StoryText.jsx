import React from "react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

export default function StoryText({
  story,
  activeIndex,
  total = 6,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-lg select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={story.number}
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -12 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col"
        >
          {/* =================================================
              INDEX / CHAPTER
          ================================================= */}

          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span
              className="
                font-mono
                text-xs
                tracking-[0.25em]
                text-[#C9A227]
                sm:text-sm
              "
            >
              {story.number}
            </span>

            <span className="h-[1px] w-6 bg-[#C9A227]/40 sm:w-10" />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#A99662]
                sm:text-[11px]
              "
            >
              CHAPTER {story.number} OF{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
            className="
              mb-6
              text-4xl
              font-semibold
              uppercase
              leading-[1.04]
              tracking-tight
              text-[#F5F0E6]
              sm:text-5xl
              lg:text-6xl
            "
          >
            {story.title}
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              max-w-md
              text-base
              font-normal
              leading-relaxed
              text-[#A9ADC0]
              sm:text-lg
              lg:text-xl
            "
          >
            {story.description}
          </p>

          {/* =================================================
              STEPPER
          ================================================= */}

          <div className="mt-10 flex items-center gap-2">
            {Array.from({ length: total }).map((_, idx) => (
              <span
                key={`step-${idx}`}
                className={`
                  h-[2px]
                  rounded-full
                  transition-all
                  duration-500
                  ease-out
                  ${
                    idx === activeIndex
                      ? "w-8 bg-[#C9A227]"
                      : "w-2 bg-[#C9A227]/20"
                  }
                `}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}