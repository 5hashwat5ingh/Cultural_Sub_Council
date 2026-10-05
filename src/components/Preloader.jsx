import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const videoRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleLoaded = () => {
      video.play().catch(() => {
        // Browser fallback if autoplay is blocked
        setTimeout(() => {
          setIsFinished(true);
        }, 5000);
      });
    };

    const handleEnded = () => {
      setIsFinished(true);
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="
            fixed
            inset-0
            z-[99999]
            h-screen
            w-screen
            overflow-hidden
            bg-[#160907]
          "
        >
          {/* PRELOADER VIDEO */}

          <video
            ref={videoRef}
            src="/preloader.mp4"
            muted
            playsInline
            autoPlay
            preload="auto"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Optional subtle cinematic overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/5
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}