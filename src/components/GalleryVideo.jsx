import React, {
  useEffect,
  useRef,
  useState,
} from "react";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M8 5.5L18 12L8 18.5V5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function GalleryVideo({
  src,
  thumbnail,
  title,
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isNearViewport, setIsNearViewport] =
    useState(false);

  const [hasError, setHasError] =
    useState(false);

  /* =======================================================
     OBSERVE VIEWPORT
  ======================================================= */

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsNearViewport(
            entry.isIntersecting
          );
        },
        {
          /*
            Start loading slightly before the video
            actually enters the screen.
          */
          rootMargin: "300px 0px",
          threshold: 0.01,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     PLAY WHEN NEAR VIEWPORT
  ======================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isNearViewport) {
      return;
    }

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        /*
          Some browsers may prevent autoplay.
          The thumbnail remains visible.
        */
      }
    };

    playVideo();
  }, [isNearViewport]);

  /* =======================================================
     PAUSE WHEN OUTSIDE VIEWPORT
  ======================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video || isNearViewport) {
      return;
    }

    video.pause();
  }, [isNearViewport]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >

      {/* =================================================
          THUMBNAIL
      ================================================= */}

      <img
        src={thumbnail}
        alt={title}
        loading="lazy"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* =================================================
          ACTUAL VIDEO

          Only rendered when the card is close to
          the viewport.
      ================================================= */}

      {isNearViewport && !hasError && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      )}

      {/* =================================================
          PLAY INDICATOR
      ================================================= */}

      <div
        className="
          absolute
          right-4
          top-4
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-white/40
          bg-[#2B0A12]/50
          text-white
          backdrop-blur-md
          transition-all
          duration-300
        "
      >
        <PlayIcon />
      </div>

    </div>
  );
}