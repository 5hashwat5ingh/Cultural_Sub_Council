import React, { useEffect, useRef, useState } from "react";

export default function GalleryVideo({ src, title }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        rootMargin: "250px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isNearViewport) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch {
          // Autoplay may be blocked by browser
        }
      };

      playVideo();
    } else {
      video.pause();
    }
  }, [isNearViewport]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#1D070D]"
    >
      {isNearViewport && !hasError && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={() => setIsReady(true)}
          onError={() => setHasError(true)}
          className={`
            absolute inset-0
            h-full w-full
            object-cover
            transition-opacity duration-500
            ${isReady ? "opacity-100" : "opacity-0"}
          `}
          aria-label={title}
        />
      )}

      {/* Loading */}
      {isNearViewport && !isReady && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1D070D]">
          <div
            className="
              h-6 w-6
              animate-spin
              rounded-full
              border-2
              border-[#C6A15B]/20
              border-t-[#C6A15B]
            "
          />
        </div>
      )}

      {/* Error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3A0D18] px-5 text-center">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#8F7663]">
            Video unavailable
          </span>
        </div>
      )}
    </div>
  );
}