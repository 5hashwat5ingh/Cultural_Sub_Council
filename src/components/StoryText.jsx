
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function StoryText({
  story,
  activeIndex = 0,
  total = 1,
}) {
  const reduceMotion = useReducedMotion();

  if (!story) return null;

  return (
    <motion.div
      key={story.number}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full min-w-0"
    >
      {/* SECTION LABEL */}
      <div className="mb-3 flex items-center gap-2 sm:mb-5 lg:mb-6">
        <span className="h-px w-7 shrink-0 bg-[#7A1B2F] sm:w-9" />
        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#7A1B2F] sm:text-[9px] sm:tracking-[0.28em]">
          Achievement Archive
        </span>
      </div>

      {/* EVENT TITLE */}
      <h2 className="max-w-xl break-words font-serif text-[2rem] leading-[0.98] tracking-[-0.045em] text-[#3A0D18] sm:text-5xl lg:text-6xl">
        {story.title}
      </h2>

      {/* LOCATION */}
      {story.location && (
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7A1B2F] sm:text-xs sm:tracking-[0.2em]">
          {story.location}
        </p>
      )}

      {/* COMPETITION NAME */}
      {story.subtitle && (
        <p className="mt-2 text-[10px] font-medium uppercase leading-relaxed tracking-[0.12em] text-[#7A1B2F] sm:mt-4 sm:text-sm sm:tracking-[0.2em]">
          {story.subtitle}
        </p>
      )}

      {/* ACHIEVEMENT BADGE */}
      <div className="mt-3 inline-flex max-w-full items-center gap-2 border border-[#7A1B2F]/20 bg-[#F7EBD0]/60 px-3 py-2 sm:mt-6 sm:gap-3 sm:px-4 sm:py-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7A1B2F] text-[#F7EBD0] sm:h-8 sm:w-8"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 0-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="min-w-0">
          <p className="text-[7px] uppercase tracking-[0.16em] text-[#3A0D18]/60 sm:text-[8px] sm:tracking-[0.2em]">
            Achievement
          </p>
          <p className="mt-0.5 break-words text-xs font-semibold leading-snug text-[#7A1B2F] sm:mt-1 sm:text-base">
            {story.achievement}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-3 max-w-lg sm:mt-7">
        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#3A0D18]/60 sm:text-[9px] sm:tracking-[0.22em]">
          The Story Behind the Result
        </p>

        <div className="mb-2 mt-2 h-px w-10 bg-[#C6A15B] sm:mb-4 sm:mt-3 sm:w-14" />

        <p className="text-xs leading-[1.55] text-[#3A0D18]/80 sm:text-base sm:leading-8">
          {story.description}
        </p>
      </div>

      {/* PERSON / TEAM */}
      {story.person && (
        <div className="mt-3 mb-19 border-l-2 border-[#C6A15B] bg-[#F7EBD0]/40 py-2 pl-3 pr-2 sm:mt-7 sm:py-3 sm:pl-4">
          <p className="text-[8px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#3A0D18]/70 sm:text-[9px] sm:tracking-[0.22em]">
            Representing our cultural community
          </p>

          <p className="mt-1 break-words text-sm font-semibold leading-snug text-[#3A0D18] sm:mt-2 sm:text-base">
            {story.person}
          </p>
        </div>
      )}

      {/* BOTTOM DECORATION */}
     
    </motion.div>
  );
}
