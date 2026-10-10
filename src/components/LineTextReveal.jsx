
import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

const UNIVERSITY_REGEX =
  /(Madan\s+Mohan\s+Malaviya\s+University\s+of\s+Technology,\s+Gorakhpur)/gi;

export default function LineTextReveal({
  text = `A vibrant hub of creativity and talent, the Cultural Sub Council of Madan Mohan Malaviya University of Technology, Gorakhpur brings the campus alive through music, dance, theatre, and performance. From HEATS to the flagship fest Abhyudaya, it provides a platform for students to express, create, and inspire.`,
  className = "",
  eyebrow = "About / CSC",
  duration = 1.9,
  delay = 0.05,
  once = false,
  amount = 0.25,
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(containerRef, {
    once,
    amount,
  });

  // Split the text around the university name BEFORE rendering.
  // This preserves the full phrase across natural browser line wraps.
  const renderHighlightedText = () => {
    const parts = (text || "").split(UNIVERSITY_REGEX);

    return parts.map((part, index) => {
      const isUniversityName =
        /^(Madan\s+Mohan\s+Malaviya\s+University\s+of\s+Technology,\s+Gorakhpur)$/i.test(
          part.trim()
        );

      if (isUniversityName) {
        return (
          <span
            key={`university-${index}`}
            className="font-serif font-bold italic"
            style={{
              color: "#3A0D18",
            }}
          >
            {part}
          </span>
        );
      }

      return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
    });
  };

  return (
    <section
      ref={containerRef}
      className={`
        relative flex w-full items-center justify-center
        overflow-hidden bg-[#DCD3A4] min-h-0 px-5 py-14
        sm:min-h-[65vh] sm:px-10 sm:py-24
        lg:min-h-[75vh] lg:px-20 lg:py-40
        ${className}
      `}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-[-8%] h-[520px] w-[520px] rounded-full bg-[#7A1B2F]/[0.10] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-[25%] h-[460px] w-[460px] rounded-full bg-[#8B1E3F]/[0.07] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/[0.14] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5EFD0]/[0.35] blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1350px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-20">
          {/* Text content */}
          <div className="relative min-w-0">
            {/* Eyebrow */}
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-6 sm:mb-8 lg:mb-9"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#8B1E3F] sm:text-xs sm:tracking-[0.28em]">
                    {eyebrow}
                  </span>
                  <span className="h-px w-8 bg-[#C6A15B]/50 sm:w-16" />
                </div>
              </motion.div>
            )}

            {/* Naturally wrapping and justified paragraph */}
            <motion.p
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 20,
              }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: shouldReduceMotion ? 1 : 0,
                      y: shouldReduceMotion ? 0 : 20,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : duration,
                delay: shouldReduceMotion ? 0 : delay + 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                w-full
                text-left text-justify
                text-[clamp(1.25rem,2.4vw,2.5rem)]
                font-medium leading-[1.25]
                tracking-[-0.025em] text-[#241018]
                [text-align-last:left]
                [overflow-wrap:normal]
                sm:text-[clamp(1.35rem,2.4vw,2.5rem)]
              "
            >
              {renderHighlightedText()}
            </motion.p>

            {/* Gold decorative line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={
                isInView
                  ? { width: "60px", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 1,
                delay: shouldReduceMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 h-[2px] bg-[#C6A15B] sm:mt-8 lg:mt-10"
            />
          </div>

          {/* Right-side image */}
          <motion.div
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              x: shouldReduceMotion ? 0 : 50,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto hidden w-full max-w-[360px] lg:block lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#7A1B2F]/15 bg-[#F5EFD0] p-1">
              <img
                src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791236689/WhatsApp_Image_2026-10-06_at_2.17.46_AM.jpg"
                alt="Cultural Sub Council performance"
                className="h-full w-full rounded-[20px] object-cover transition-transform duration-1000 hover:scale-[1.03]"
              />

              <div className="pointer-events-none absolute inset-2 rounded-[19px] border border-[#C6A15B]/30" />

              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-[#2B0A12]/20 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 h-16 w-16 border-b border-l border-[#7A1B2F]/30" />

            <div className="absolute -right-4 -top-4 h-16 w-16 border-r border-t border-[#C6A15B]/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
