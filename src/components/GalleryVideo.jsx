
import React, { useEffect, useRef, useState } from "react";

export default function GalleryVideo({ src, title = "Gallery video" }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsNearViewport(entry.isIntersecting);
        });
      },
      {
        rootMargin: "250px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isNearViewport || hasError) {
      if (video) video.pause();
      return;
    }

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can be blocked by browser settings.
        // The video remains available for manual playback.
      }
    };

    playVideo();

    return () => {
      video.pause();
    };
  }, [isNearViewport, hasError, src]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#1D070D]"
    >
      {/* Skeleton loading */}
      {isNearViewport && !isReady && !hasError && (
        <div
          className="absolute inset-0 z-10 min-h-[180px] overflow-hidden bg-[#1D070D]"
          aria-hidden="true"
        >
          <div className="skeleton-shimmer absolute inset-0" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C6A15B]/30 bg-[#3A0D18]/60">
              <div className="h-4 w-4 rounded-full border-2 border-[#C6A15B]/30 border-t-[#C6A15B] animate-spin" />
            </div>
          </div>
        </div>
      )}

      {/* Video */}
      {isNearViewport && !hasError && (
        <video
          ref={videoRef}
          src={src}
          title={title}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className={`block h-auto w-full object-cover transition-opacity duration-500 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setIsReady(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="flex min-h-[180px] items-center justify-center bg-[#1D070D] px-4 text-center text-sm text-[#C6A15B]/70">
          Video unavailable
        </div>
      )}
    </div>
  );
}