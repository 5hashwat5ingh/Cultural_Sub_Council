import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  galleryItems,
  galleryCategories,
} from "../data/galleryData";

import GalleryVideo from "../components/GalleryVideo";
import LazyImage from "../components/LazyImage";

/* =========================================================
   CLOSE ICON
========================================================= */

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

/* =========================================================
   SHUFFLE ARRAY
========================================================= */

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  /* -------------------------------------------------------
     Prevent consecutive videos
  ------------------------------------------------------- */

  for (let i = 1; i < shuffled.length; i++) {
    if (
      shuffled[i].type === "video" &&
      shuffled[i - 1].type === "video"
    ) {
      for (let j = i + 1; j < shuffled.length; j++) {
        if (shuffled[j].type === "photo") {
          [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i],
          ];

          break;
        }
      }
    }
  }

  return shuffled;
};

/* =========================================================
   HERO DECORATIVE SHAPES
========================================================= */

function DecorativeShapes() {
  return (
    <>
      {/* Maroon circle */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#7A1B2F]/20
          blur-[2px]
        "
        aria-hidden="true"
      />

      {/* Gold circle */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          top-[18%]
          h-[360px]
          w-[360px]
          rounded-full
          border-[70px]
          border-[#C6A15B]/15
        "
        aria-hidden="true"
      />

      {/* Burgundy rectangle */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[8%]
          left-[12%]
          h-[180px]
          w-[300px]
          rotate-[-8deg]
          bg-[#3A0D18]/60
        "
        aria-hidden="true"
      />

      {/* Gold square */}
      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          bottom-[18%]
          h-[150px]
          w-[150px]
          rotate-[12deg]
          border
          border-[#C6A15B]/20
        "
        aria-hidden="true"
      />
    </>
  );
}

/* =========================================================
   GALLERY PAGE
========================================================= */

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [shuffledItems] = useState(() =>
    shuffleArray(galleryItems)
  );

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems =
    activeCategory === "All"
      ? shuffledItems
      : shuffledItems.filter(
          (item) =>
            item.category === activeCategory
        );

  /* =======================================================
     LOCK BODY SCROLL
  ======================================================= */

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        overflow-x-clip
        bg-[#DCD3A4]
        text-[#241018]
      "
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar Gallery />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#DCD3A4]

          px-6
          pb-20
          pt-32

          sm:px-10
          sm:pt-40

          lg:px-20
          lg:pb-28
          lg:pt-44
        "
      >

        {/* =================================================
            HERO BACKGROUND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
          aria-hidden="true"
        >
          <DecorativeShapes />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[700px]
              w-[1000px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#F5EFD0]/40
              blur-[120px]
            "
          />
        </div>

        {/* =================================================
            TOP LABEL
        ================================================= */}

        <div
          className="
            absolute
            left-6
            top-10

            sm:left-10
            sm:top-14

            lg:left-20
            lg:top-16
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.32em]
                text-[#7A1B2F]
              "
            >
              Cultural Sub-Council
            </span>
          </div>
        </div>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[78vh]
            max-w-[1500px]
            items-center
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-12

              lg:grid-cols-[1.05fr_0.95fr]
              lg:items-center
              lg:gap-20
            "
          >

            {/* =================================================
                LEFT
            ================================================= */}

            <div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  mb-8
                  flex
                  items-center
                  gap-4
                "
              >
                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-[#7A1B2F]
                  "
                >
                  OUR VISUAL ARCHIVE
                </span>

                <span
                  className="
                    h-px
                    w-12
                    bg-[#C6A15B]
                  "
                />
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  max-w-[900px]
                  text-[clamp(4rem,9vw,9rem)]
                  font-semibold
                  leading-[0.78]
                  tracking-[-0.075em]
                  text-[#241018]
                "
              >
                OUR
                <br />

                <span className="text-[#7A1B2F]">
                  MOMENTS.
                </span>
              </motion.h1>

            </div>

            {/* =================================================
                RIGHT — VERTICAL VIDEO
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="
                relative
                mx-auto
                w-full
                max-w-[400px]
              "
            >

              {/* Gold decorative circle */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-10
                  -left-10
                  h-[180px]
                  w-[180px]
                  rounded-full
                  border-[45px]
                  border-[#C6A15B]/30
                "
              />

              {/* Decorative square */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-[130px]
                  w-[130px]
                  rotate-[10deg]
                  border
                  border-[#7A1B2F]/10
                "
              />

              {/* =================================================
                  VERTICAL VIDEO
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  mx-auto
                  aspect-[9/16]
                  w-full
                  max-h-[76vh]
                  overflow-hidden
                  border
                  border-[#F7EBD0]/50
                  bg-[#2B0A12]
                  shadow-[20px_25px_0_rgba(58,13,24,0.12)]
                "
              >
                <video
                  src="https://res.cloudinary.com/yh0rqnnu/video/upload/v1791304059/download.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-5
                    border
                    border-[#F7EBD0]/30
                  "
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
        className="
          sticky
          top-0
          z-[60]
          w-full

          border-y
          border-[#7A1B2F]/15

          bg-[#DCD3A4]/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            gap-2
            overflow-x-auto

            px-5
            py-4

            sm:px-10
            lg:px-20

            [&::-webkit-scrollbar]:hidden
          "
        >
          {galleryCategories.map((category) => {
            const isActive =
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`
                  whitespace-nowrap
                  rounded-full
                  border
                  px-5
                  py-2.5
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        border-[#7A1B2F]
                        bg-[#7A1B2F]
                        text-[#F7EBD0]
                      `
                      : `
                        border-[#7A1B2F]/25
                        bg-transparent
                        text-[#3A0D18]/70

                        hover:border-[#7A1B2F]
                        hover:bg-[#7A1B2F]/10
                        hover:text-[#7A1B2F]
                      `
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
          MASONRY GALLERY — 5 COLUMNS
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#DCD3A4]

          px-3
          py-12

          sm:px-6
          sm:py-16

          lg:px-10
          lg:py-20

          xl:px-12
          xl:py-24
        "
      >

        {/* Background decoration */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-180px]
            top-[12%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#7A1B2F]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-180px]
            top-[42%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#C6A15B]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[5%]
            left-[15%]
            h-[220px]
            w-[220px]
            rounded-full
            border-[55px]
            border-[#7A1B2F]/5
          "
        />

        {/* =================================================
            GALLERY
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1800px]
          "
        >

          <motion.div
            layout
            className="
              columns-2
              gap-3

              sm:columns-3
              sm:gap-4

              md:columns-4
              md:gap-4

              lg:columns-5
              lg:gap-5
            "
          >

            <AnimatePresence mode="popLayout">

              {filteredItems.map(
                (item, index) => (
                  <motion.button
                    key={item.id}
                    layout
                    type="button"
                    onClick={() =>
                      setSelectedItem(item)
                    }
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(
                        index * 0.025,
                        0.3
                      ),
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      group
                      relative
                      mb-3
                      block
                      w-full
                      break-inside-avoid
                      overflow-hidden
                      bg-transparent
                      p-0

                      sm:mb-4
                      lg:mb-5
                    "
                  >

                    {/* =================================================
                        PHOTO
                    ================================================= */}

                    {item.type === "photo" && (
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className="
                          block
                          h-auto
                          w-full
                          object-cover

                          transition-transform
                          duration-700
                          ease-[0.22,1,0.36,1]

                          group-hover:scale-[1.02]
                        "
                      />
                    )}

                    {/* =================================================
                        VIDEO
                    ================================================= */}

                    {item.type === "video" && (
                      <GalleryVideo
                        src={item.video}
                        title={item.title}
                      />
                    )}

                  </motion.button>
                )
              )}

            </AnimatePresence>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          FULLSCREEN VIEWER
      ===================================================== */}

      <AnimatePresence>

        {selectedItem && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]

              flex
              items-center
              justify-center

              bg-[#1D070D]/95

              p-4

              backdrop-blur-xl

              sm:p-8
            "
            onClick={() =>
              setSelectedItem(null)
            }
          >

            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setSelectedItem(null)
              }
              aria-label="Close gallery"
              className="
                absolute
                right-5
                top-5
                z-30

                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-full

                border
                border-[#C6A15B]/30

                bg-[#2B0A12]/90

                text-[#F7EBD0]

                transition-all
                duration-300

                hover:border-[#C6A15B]
                hover:bg-[#C6A15B]
                hover:text-[#2B0A12]
              "
            >
              <CloseIcon />
            </button>

            {/* =================================================
                FULLSCREEN MEDIA
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{
                duration: 0.35,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                max-h-[92vh]
                max-w-6xl
                overflow-hidden
                rounded-2xl

                border
                border-[#C6A15B]/25

                bg-[#2B0A12]

                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
              "
            >

              {/* PHOTO */}

              {selectedItem.type ===
                "photo" && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="
                    max-h-[78vh]
                    max-w-[90vw]
                    object-contain
                  "
                />
              )}

              {/* VIDEO */}

              {selectedItem.type ===
                "video" && (
                <video
                  src={selectedItem.video}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  className="
                    max-h-[78vh]
                    max-w-[90vw]
                    object-contain
                  "
                />
              )}

              {/* VIEWER INFORMATION */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-6

                  border-t
                  border-[#C6A15B]/20

                  bg-[#2B0A12]

                  px-5
                  py-4

                  sm:px-7
                "
              >

                <div>

                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.25em]
                      text-[#C6A15B]
                    "
                  >
                    {selectedItem.category}
                  </p>

                  <h3
                    className="
                      mt-1
                      text-sm
                      text-[#F7EBD0]
                      sm:text-base
                    "
                  >
                    {selectedItem.title}
                  </h3>

                </div>

                <span
                  className="
                    shrink-0
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#8F7663]
                  "
                >
                  {selectedItem.type ===
                  "video"
                    ? "Video"
                    : "Photography"}
                </span>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </main>
  );
}