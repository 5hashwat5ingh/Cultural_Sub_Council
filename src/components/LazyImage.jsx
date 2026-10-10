
import React, { useEffect, useRef, useState } from "react";

export default function LazyImage({ src, alt = "", className = "" }) {
  const containerRef = useRef(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "300px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
    >
      {/* Skeleton loading background */}
      {!loaded && !error && (
        <div
          className="absolute inset-0 z-10 min-h-[180px] overflow-hidden bg-[#3A0D18]"
          aria-hidden="true"
        >
          <div className="skeleton-shimmer absolute inset-0" />

          <div className="absolute inset-0 flex flex-col justify-end gap-3 p-4">
            <div className="h-2 w-1/3 rounded-full bg-[#C6A15B]/15" />
            <div className="h-2 w-2/3 rounded-full bg-[#C6A15B]/15" />
          </div>
        </div>
      )}

      {/* Image */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`${className} ${
            loaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="flex min-h-[180px] items-center justify-center bg-[#3A0D18] px-4 text-center text-sm text-[#C6A15B]/70">
          Image unavailable
        </div>
      )}
    </div>
  );
}