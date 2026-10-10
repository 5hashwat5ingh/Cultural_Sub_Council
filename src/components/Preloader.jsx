
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader({ isLoading, videoKey, onComplete }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
        >
          <video
            key={videoKey}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={onComplete}
            onError={(event) => {
              console.error("Video failed to load:", event.currentTarget.error);
              onComplete();
            }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/yh0rqnnu/video/upload/v1791634126/download_1.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
