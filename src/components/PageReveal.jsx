import React from "react";
import { motion } from "framer-motion";

export default function PageReveal() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">

      {/* ===================================== */}
      {/* LEFT CURTAIN                          */}
      {/* ===================================== */}

      <motion.div
        className="
          absolute
          left-0
          top-0
          h-full
          w-1/2
          bg-[#0A0A0A]
        "
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          delay: 1.8,
          duration: 1.1,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* ===================================== */}
      {/* RIGHT CURTAIN                         */}
      {/* ===================================== */}

      <motion.div
        className="
          absolute
          right-0
          top-0
          h-full
          w-1/2
          bg-[#0A0A0A]
        "
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{
          delay: 1.8,
          duration: 1.1,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* ===================================== */}
      {/* CENTER LINE                           */}
      {/* ===================================== */}

      <motion.div
        className="
          absolute
          left-1/2
          top-0
          z-50
          h-full
          w-[1px]
          -translate-x-1/2
          bg-white
        "
        initial={{
          height: "0%",
          opacity: 1,
        }}
        animate={{
          height: ["0%", "100%", "100%"],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 2.2,
          times: [0, 0.68, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
      />

    </div>
  );
}