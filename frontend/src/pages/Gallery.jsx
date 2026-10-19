
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";

import {
  galleryItems,
  galleryCategories,
} from "../data/galleryData";

// =========================================================
// CONSTANTS & HELPERS
// =========================================================

const HERO_VIDEO =
  "https://res.cloudinary.com/yh0rqnnu/video/upload/v1791304059/download.mp4";

function getYouTubeId(url = "") {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0];
    }

    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtube-nocookie.com")
    ) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }

      const match = parsed.pathname.match(
        /\/(?:embed|shorts|live)\/([^/?]+)/
      );

      return match?.[1] || null;
    }
  } catch {
    return null;
  }

  return null;
}

function getYouTubeEmbedUrl(url, { preview = false } = {}) {
  const id = getYouTubeId(url);

  if (!id) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
  });

  if (preview) {
    params.set("mute", "1");
    params.set("controls", "0");
    params.set("loop", "1");
    params.set("playlist", id);
  } else {
    params.set("controls", "1");
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Avoid consecutive videos where possible.
  for (let i = 1; i < shuffled.length; i++) {
    if (
      shuffled[i].type === "video" &&
      shuffled[i - 1].type === "video"
    ) {
      const photoIndex = shuffled.findIndex(
        (item, index) =>
          index > i && item.type === "photo"
      );

      if (photoIndex !== -1) {
        [shuffled[i], shuffled[photoIndex]] = [
          shuffled[photoIndex],
          shuffled[i],
        ];
      }
    }
  }

  return shuffled;
}

// =========================================================
// CLOSE ICON
// =========================================================

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// =========================================================
// DECORATIVE SHAPES
// =========================================================

function DecorativeShapes() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-32 top-20
        h-[420px] w-[420px] rounded-full bg-[#7A1B2F]/20 blur-[2px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-24 top-[18%]
        h-[360px] w-[360px] rounded-full border-[70px]
        border-[#C6A15B]/15"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-[8%] left-[12%]
        h-[180px] w-[300px] rotate-[-8deg] bg-[#3A0D18]/60"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-[18%] right-[12%]
        h-[150px] w-[150px] rotate-[12deg]
        border border-[#C6A15B]/20"
        aria-hidden="true"
      />
    </>
  );
}

// =========================================================
// YOUTUBE GALLERY PREVIEW
// =========================================================

function GalleryYouTube({ src, title }) {
  const embedUrl = getYouTubeEmbedUrl(src, {
    preview: true,
  });

  if (!embedUrl) {
    return (
      <div
        className="flex aspect-[9/16] w-full items-center
        justify-center bg-[#3A0D18] p-4 text-center
        text-sm text-[#F7EBD0]"
      >
        Video unavailable
      </div>
    );
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#2B0A12]">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {/* Keeps the gallery tile clickable. */}
      <div
        className="pointer-events-none absolute inset-0
        border border-[#F7EBD0]/10"
        aria-hidden="true"
      />
    </div>
  );
}

// =========================================================
// GALLERY PAGE
// =========================================================

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  // Shuffle once when the page mounts.
  const [shuffledItems] = useState(() =>
    shuffleArray(galleryItems)
  );

  const filteredItems =
    activeCategory === "All"
      ? shuffledItems
      : shuffledItems.filter(
          (item) => item.category === activeCategory
        );

  // Lock body scrolling when the viewer is open.
  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  // Close viewer with Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#DCD3A4] text-[#241018]">
      {/* NAVBAR */}
      <Navbar Gallery />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative min-h-screen overflow-hidden bg-[#DCD3A4]
        px-6 pb-20 pt-32 sm:px-10 sm:pt-40
        lg:px-20 lg:pb-28 lg:pt-44"
      >
        {/* HERO BACKGROUND */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <DecorativeShapes />

          <div
            className="absolute left-1/2 top-1/2 h-[700px] w-[1000px]
            -translate-x-1/2 -translate-y-1/2 rounded-full
            bg-[#F5EFD0]/40 blur-[120px]"
          />
        </div>

        {/* HERO CONTENT */}
        <div
          className="relative z-10 mx-auto flex min-h-[78vh]
          max-w-[1500px] items-center"
        >
          <div
            className="grid w-full grid-cols-1 gap-12
            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-center lg:gap-20"
          >
            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 flex items-center gap-4"
              >
                <span
                  className="text-[9px] uppercase tracking-[0.3em]
                  text-[#7A1B2F]"
                >
                  OUR VISUAL ARCHIVE
                </span>

                <span className="h-px w-12 bg-[#C6A15B]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[900px] text-[clamp(4rem,9vw,9rem)]
                font-semibold leading-[0.78] tracking-[-0.075em]
                text-[#241018]"
              >
                OUR
                <br />
                <span className="text-[#7A1B2F]">
                  MOMENTS.
                </span>
              </motion.h1>
            </div>

            {/* RIGHT — HERO VIDEO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mx-auto w-full max-w-[400px]"
            >
              <div
                className="pointer-events-none absolute -bottom-10
                -left-10 h-[180px] w-[180px] rounded-full
                border-[45px] border-[#C6A15B]/30"
              />

              <div
                className="pointer-events-none absolute -right-8 -top-8
                h-[130px] w-[130px] rotate-[10deg]
                border border-[#7A1B2F]/10"
              />

              <div
                className="relative z-10 mx-auto aspect-[9/16] w-full
                max-h-[76vh] overflow-hidden
                border border-[#F7EBD0]/50 bg-[#2B0A12]
                shadow-[20px_25px_0_rgba(58,13,24,0.12)]"
              >
                <video
                  src={HERO_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div
                  className="pointer-events-none absolute inset-5
                  border border-[#F7EBD0]/30"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTER
      ===================================================== */}

      <section
        className="sticky top-0 z-[60] w-full border-y
        border-[#7A1B2F]/15 bg-[#DCD3A4]/95 backdrop-blur-xl"
      >
        <div
          className="mx-auto flex max-w-[1500px] gap-2 overflow-x-auto
          px-5 py-4 sm:px-10 lg:px-20
          [&::-webkit-scrollbar]:hidden"
        >
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`
                  whitespace-nowrap rounded-full border px-5 py-2.5
                  text-[9px] uppercase tracking-[0.2em]
                  transition-colors duration-200
                  ${
                    isActive
                      ? "border-[#7A1B2F] bg-[#7A1B2F] text-[#F7EBD0]"
                      : "border-[#7A1B2F]/25 bg-transparent text-[#3A0D18]/70 hover:border-[#7A1B2F] hover:bg-[#7A1B2F]/10 hover:text-[#7A1B2F]"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          MASONRY GALLERY
      ===================================================== */}

      <section
        className="relative overflow-hidden bg-[#DCD3A4]
        px-3 py-12 sm:px-6 sm:py-16
        lg:px-2 lg:py-20 xl:px-2 xl:py-24"
      >
        {/* BACKGROUND DECORATION */}
        <div
          className="pointer-events-none absolute left-[-180px]
          top-[12%] h-[420px] w-[420px] rounded-full
          bg-[#7A1B2F]/10"
        />

        <div
          className="pointer-events-none absolute right-[-180px]
          top-[42%] h-[420px] w-[420px] rounded-full
          bg-[#C6A15B]/10"
        />

        <div
          className="pointer-events-none absolute bottom-[5%]
          left-[15%] h-[220px] w-[220px] rounded-full
          border-[55px] border-[#7A1B2F]/5"
        />

        {/* MASONRY GRID */}
        <div className="relative z-10 mx-auto max-w-[1800px]">
          <div
            className="columns-2 gap-1 sm:columns-3 sm:gap-2
            lg:columns-4 lg:gap-2"
          >
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                aria-label={`Open ${item.title}`}
                className="group relative mb-1 block w-full
                break-inside-avoid overflow-hidden bg-transparent
                p-0 text-left sm:mb-2 lg:mb-2"
              >
                {/* PHOTO */}
                {item.type === "photo" && (
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="block h-auto w-full object-cover"
                  />
                )}

                {/* YOUTUBE VIDEO */}
                {item.type === "video" && (
                  <GalleryYouTube
                    src={item.video}
                    title={item.title}
                  />
                )}

                {/* HOVER OVERLAY */}
                <span
                  className="pointer-events-none absolute inset-0
                  bg-[#2B0A12]/0 transition-colors duration-300
                  group-hover:bg-[#2B0A12]/10"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-[#3A0D18]">
                No moments found
              </p>

              <p className="mt-2 text-sm text-[#3A0D18]/65">
                Try selecting another category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FULLSCREEN VIEWER
      ===================================================== */}

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center
            justify-center bg-[#1D070D]/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-30 flex h-11 w-11
              items-center justify-center rounded-full
              border border-[#C6A15B]/30 bg-[#2B0A12]/90
              text-[#F7EBD0] transition-colors duration-200
              hover:border-[#C6A15B] hover:bg-[#C6A15B]
              hover:text-[#2B0A12]"
            >
              <CloseIcon />
            </button>

            {/* FULLSCREEN MEDIA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[92vh] max-w-6xl
              overflow-hidden rounded-2xl
              border border-[#C6A15B]/25 bg-[#2B0A12]
              shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
            >
              {/* PHOTO */}
              {selectedItem.type === "photo" && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[78vh] max-w-[90vw] object-contain"
                />
              )}

              {/* YOUTUBE VIDEO */}
              {selectedItem.type === "video" && (
                <div className="aspect-video w-[90vw] max-w-5xl sm:w-[80vw]">
                  {getYouTubeEmbedUrl(selectedItem.video) ? (
                    <iframe
  src={getYouTubeEmbedUrl(item.video)}
  title={item.title}
  allow="autoplay; encrypted-media; picture-in-picture"
  allowFullScreen={false}
  style={{
    width: "100%",
    height: "100%",
    border: "none",
    pointerEvents: "none",
  }}
/>
                  ) : (
                    <div className="flex h-full items-center justify-center p-8 text-[#F7EBD0]">
                      This video link is invalid or unsupported.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
