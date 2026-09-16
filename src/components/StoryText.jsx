import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * StoryText Component
 * Displays the sticky text description corresponding to the currently active image.
 * Uses AnimatePresence to perform a subtle fade + upward slide on entrance/exit.
 * 
 * @param {Object} story - The active story object { number, title, description }
 * @param {number} activeIndex - Index of currently focused image (0 to 5)
 * @param {number} total - Total count of stories
 */
export default function StoryText({ story, activeIndex, total = 6 }) {
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
          animate={{ opacity: 1, y: 0 }}
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
          {/* Index & Section Label */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#EDEDED]">
              {story.number}
            </span>
            <span className="w-6 sm:w-10 h-[1px] bg-white/20" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-[#8A8A8A]">
              CHAPTER {story.number} OF {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Story Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight uppercase text-[#EDEDED] leading-[1.04] mb-6">
            {story.title}
          </h2>

          {/* Story Description */}
          <p className="text-base sm:text-lg lg:text-xl text-[#8A8A8A] font-normal leading-relaxed max-w-md">
            {story.description}
          </p>

          {/* Subtle Stepper Indicator */}
          <div className="flex items-center gap-2 mt-10">
            {Array.from({ length: total }).map((_, idx) => (
              <span
                key={`step-${idx}`}
                className={`h-[2px] transition-all duration-500 ease-out rounded-full ${
                  idx === activeIndex
                    ? 'w-8 bg-[#EDEDED]'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
