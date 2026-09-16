import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ReplayButton({ onReplay }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={onReplay}
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0 }
      }
      animate={{ opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : 1.6,
      }}
      whileHover={{
        opacity: 1,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="
        group
        fixed
        bottom-6
        right-6
        z-50
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-[#0A0A0A]/60
        px-3.5
        py-1.5
        text-[10px]
        font-medium
        uppercase
        tracking-[0.18em]
        text-[#8A8A8A]
        shadow-sm
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-white/20
        hover:text-[#EDEDED]
        sm:bottom-8
        sm:right-10
        sm:text-[11px]
      "
      title="Return to top and replay animation"
      aria-label="Return to top and replay animation"
    >
      <span>REPLAY</span>

      <span
        className="
          text-[13px]
          leading-none
          transition-transform
          duration-500
          group-hover:rotate-180
        "
      >
        ↻
      </span>
    </motion.button>
  );
}