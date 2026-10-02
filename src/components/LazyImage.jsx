import React, {
  useEffect,
  useRef,
  useState,
} from "react";

export default function LazyImage({
  src,
  alt,
  className = "",
}) {
  const containerRef = useRef(null);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  const [loaded, setLoaded] =
    useState(false);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);

            observer.disconnect();
          }
        },
        {
          /*
            Start loading 300px before
            the image reaches viewport.
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

  return (
    <div
      ref={containerRef}
      className="
        relative
        min-h-[180px]
        w-full
        overflow-hidden
        bg-[#3A0D18]
      "
    >

      {/* =====================================================
          LOADING BACKGROUND
      ===================================================== */}

      {!loaded && !error && (
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-[#3A0D18]
          "
        >
          <div
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-[#C6A15B]/20
              border-t-[#C6A15B]
            "
          />
        </div>
      )}

      {/* =====================================================
          IMAGE
      ===================================================== */}

      {shouldLoad && !error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`
            block
            h-auto
            min-h-[180px]
            w-full
            object-cover

            transition-all
            duration-700
            ease-out

            ${
              loaded
                ? "scale-100 opacity-100"
                : "scale-[1.02] opacity-0"
            }

            ${className}
          `}
        />
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="
            flex
            min-h-[180px]
            w-full
            items-center
            justify-center
            bg-[#3A0D18]
            px-5
            text-center
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#8F7663]
            "
          >
            Image unavailable
          </span>
        </div>
      )}

    </div>
  );
}