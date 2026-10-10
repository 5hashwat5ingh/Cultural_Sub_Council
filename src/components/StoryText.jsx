
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
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 16 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      {/* SECTION LABEL */}

      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-9 bg-[#7A1B2F]" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7A1B2F]">
          Achievement Archive
        </span>
      </div>

      {/* STORY NUMBER */}


      {/* EVENT TITLE */}

      <h2 className="max-w-xl text-4xl font-serif leading-[0.98] tracking-[-0.045em] text-[#3A0D18] sm:text-5xl lg:text-6xl">
        {story.title}
      </h2>
       <span className="text-s font-semibold uppercase tracking-[0.2em] text-[#7A1B2F]">
          {story.location}
        </span>

      {/* COMPETITION NAME */}

      {story.subtitle && (
        <p className="mt-4 text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-[#7A1B2F] sm:text-sm">
          {story.subtitle}
        </p>
      )}

      {/* ACHIEVEMENT BADGE */}

      <div className="mt-6 inline-flex max-w-full items-center gap-3 border border-[#7A1B2F]/20 bg-[#F7EBD0]/45 px-4 py-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7A1B2F] text-[#F7EBD0]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="min-w-0">
          <p className="text-[8px] uppercase tracking-[0.2em] text-[#3A0D18]/55">
            Achievement
          </p>

          <p className="mt-1 text-sm font-semibold text-[#7A1B2F] sm:text-base">
            {story.achievement}
          </p>
        </div>
      </div>

      {/* ACHIEVEMENT DESCRIPTION */}

      <div className="mt-7 max-w-lg">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#3A0D18]/60">
          The Story Behind the Result
        </p>

        <div className="mb-4 mt-3 h-px w-14 bg-[#C6A15B]" />

        <p className="text-sm leading-7 text-[#3A0D18]/80 sm:text-base sm:leading-8">
          {story.description}
        </p>
      </div>

      {/* PERSON / TEAM */}

      {story.person && (
        <div className="mt-7 border-l-2 border-[#C6A15B] pl-4">
          <p className="text-[8px] uppercase tracking-[0.22em] text-[#3A0D18]/55">
            Representing our cultural community
          </p>

          <p className="mt-2 text-sm font-medium text-[#3A0D18] sm:text-base">
            {story.person}
          </p>
        </div>
      )}

      {/* BOTTOM DECORATION */}

      <div className="mt-8 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7A1B2F]" />
        <span className="h-px w-12 bg-[#C6A15B]/70" />
        <span className="h-px w-5 bg-[#7A1B2F]/30" />
      </div>
    </motion.div>
  );
}