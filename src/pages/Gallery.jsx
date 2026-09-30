import React, {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Navbar from "../components/Navbar";
import {
  galleryItems,
  galleryCategories,
} from "../data/galleryData";

import GalleryVideo from "../components/GalleryVideo";





/* =========================================================
   ICON
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
   GALLERY PAGE
========================================================= */

export default function Gallery() {
  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");

  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeCategory
        );


  /* =======================================================
     LOCK BODY SCROLL
  ======================================================= */

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow =
        "hidden";
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
     GRID SIZE
  ======================================================= */

  const getGridClass = (item) => {
    switch (item.size) {
      case "tall":
        return "col-span-1 row-span-2";

      case "wide":
        return "col-span-2 row-span-1";

      case "large":
        return "col-span-2 row-span-2";

      case "normal":
      default:
        return "col-span-1 row-span-1";
    }
  };


  return (
    
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#2B0A12]
        text-[#F7EBD0]
      "
    >
<Navbar Gallery/>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          min-h-[75vh]
          overflow-hidden
          bg-[#2B0A12]
          px-6
          pb-20
          pt-32
          sm:px-10
          sm:pt-40
          lg:px-20
          lg:pb-28
          lg:pt-48
        "
      >

        {/* Maroon glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-10%]
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#7A1B2F]/40
            blur-[140px]
          "
        />

        {/* Gold glow */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-5%]
            top-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/10
            blur-[140px]
          "
        />

        {/* Subtle bottom glow */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-200px]
            left-1/2
            h-[450px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#C6A15B]/5
            blur-[120px]
          "
        />


        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[65vh]
            max-w-7xl
            items-end
          "
        >

          <div>

            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                mb-7
                flex
                items-center
                gap-4
              "
            >

              <span
                className="
                  h-px
                  w-12
                  bg-[#C6A15B]
                "
              />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-[#D9B86C]
                "
              >
                Cultural Sub-Council / Gallery
              </span>

            </motion.div>


            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.1,
              }}
              className="
                max-w-6xl
                text-[clamp(4rem,11vw,10rem)]
                font-semibold
                leading-[0.78]
                tracking-[-0.07em]
                text-[#F7EBD0]
              "
            >
              OUR
              <br />

              <span className="text-[#C6A15B]">
                MOMENTS.
              </span>

            </motion.h1>


            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
              className="
                mt-10
                max-w-2xl
                text-base
                leading-[1.8]
                text-[#D8C7AA]
                sm:text-lg
              "
            >
              A visual collection of performances,
              celebrations, creativity and the
              moments that shape the Cultural
              Sub-Council.
            </motion.p>


            {/* Bottom details */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              className="
                mt-12
                flex
                flex-wrap
                items-center
                gap-x-7
                gap-y-3
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-[#8F7663]
              "
            >

              <span>Performances</span>

              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C6A15B]
                "
              />

              <span>Creativity</span>

              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C6A15B]
                "
              />

              <span>Memories</span>

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
          z-40
          border-y
          border-[#C6A15B]/20
          bg-[#2B0A12]/95
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            gap-2
            overflow-x-auto
            px-5
            py-4
            sm:px-10
            lg:px-20
          "
        >

          {galleryCategories.map(
            (category) => {

              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      category
                    )
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
                        ? "border-[#C6A15B] bg-[#C6A15B] text-[#2B0A12] shadow-[0_0_25px_rgba(198,161,91,0.12)]"
                        : "border-[#C6A15B]/25 bg-transparent text-[#D8C7AA] hover:border-[#C6A15B]/70 hover:bg-[#3A0D18] hover:text-[#D9B86C]"
                    }
                  `}
                >
                  {category}
                </button>
              );
            }
          )}

        </div>
      </section>


      {/* =====================================================
          MIXED GALLERY
      ===================================================== */}

      <section
        className="
          bg-[#2B0A12]
          px-1.5
          py-8
          sm:px-5
          sm:py-12
          lg:px-10
          lg:py-16
        "
      >

        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >

          <motion.div
            layout
            className="
              grid
              auto-rows-[130px]
              grid-cols-3
              gap-1.5

              sm:auto-rows-[190px]
              sm:gap-2

              lg:auto-rows-[245px]
            "
          >

            <AnimatePresence
              mode="popLayout"
            >

              {filteredItems.map(
                (item, index) => {

                  const gridClass =
                    getGridClass(item);

                  return (
                    <motion.button
                      key={item.id}
                      layout
                      type="button"
                      onClick={() =>
                        setSelectedItem(
                          item
                        )
                      }
                      initial={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(
                          index * 0.025,
                          0.25
                        ),
                      }}
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-[3px]
                        bg-[#3A0D18]
                        ${gridClass}
                      `}
                    >

                      {/* =====================================
                          PHOTO
                      ===================================== */}

                      {item.type ===
                        "photo" && (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-105
                          "
                        />
                      )}


                      {/* =====================================
                          VIDEO PREVIEW
                      ===================================== */}

                      {item.type ===
                        "video" && (
                        <GalleryVideo
                          src={item.video}
                          thumbnail={
                            item.thumbnail
                          }
                          title={
                            item.title
                          }
                        />
                      )}


                      {/* =====================================
                          HOVER OVERLAY
                      ===================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-[#2B0A12]/10
                          transition-all
                          duration-500
                          group-hover:bg-[#2B0A12]/45
                        "
                      />


                      {/* =====================================
                          GOLD BORDER
                      ===================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          border
                          border-transparent
                          transition-all
                          duration-500
                          group-hover:border-[#D9B86C]/80
                        "
                      />


                      {/* =====================================
                          HOVER INFORMATION
                      ===================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-x-0
                          bottom-0
                          translate-y-4
                          bg-gradient-to-t
                          from-[#1D070D]/90
                          via-[#1D070D]/40
                          to-transparent
                          p-4
                          pt-12
                          opacity-0
                          transition-all
                          duration-500
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          sm:p-5
                          sm:pt-16
                        "
                      >

                        <p
                          className="
                            text-[8px]
                            uppercase
                            tracking-[0.25em]
                            text-[#D9B86C]
                          "
                        >
                          {item.category}
                        </p>

                        <h3
                          className="
                            mt-1
                            text-sm
                            font-medium
                            text-[#F7EBD0]
                            sm:text-base
                          "
                        >
                          {item.title}
                        </h3>

                      </div>

                    </motion.button>
                  );
                }
              )}

            </AnimatePresence>

          </motion.div>


          {/* Gallery footer */}

          

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

            {/* Close */}

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


            {/* Media */}

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

              {/* Photo */}

              {selectedItem.type ===
                "photo" && (
                <img
                  src={
                    selectedItem.image
                  }
                  alt={
                    selectedItem.title
                  }
                  className="
                    max-h-[78vh]
                    max-w-[90vw]
                    object-contain
                  "
                />
              )}


              {/* Video */}

              {selectedItem.type ===
                "video" && (
                <video
                  src={
                    selectedItem.video
                  }
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="
                    max-h-[78vh]
                    max-w-[90vw]
                    object-contain
                  "
                />
              )}


              {/* Information */}

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
                    {
                      selectedItem.category
                    }
                  </p>

                  <h3
                    className="
                      mt-1
                      text-sm
                      text-[#F7EBD0]
                      sm:text-base
                    "
                  >
                    {
                      selectedItem.title
                    }
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
      <footer
              id="contact"
              className="
                relative
                z-20
                m-0
                w-full
                border-t
                border-[#C9A24D]/20
                bg-[#1D070D]
                px-6
                py-16
                sm:px-12
                sm:py-20
                lg:px-20
                lg:py-24
              "
            >
      
              <div
                className="
                  mx-auto
                  flex
                  max-w-7xl
                  flex-col
                  items-start
                  justify-between
                  gap-10
                  md:flex-row
                  md:items-end
                "
              >
      
                {/* Footer Brand */}
      
                <div>
      
                  <div className="mb-3 flex items-center gap-3">
      
                    <span className="h-2 w-2 rotate-45 bg-[#C9A24D]" />
      
                    <span
                      className="
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        text-[#C9A24D]
                      "
                    >
                      Get in Touch
                    </span>
      
                  </div>
      
                  <p
                    className="
                      text-2xl
                      font-medium
                      tracking-tight
                      text-[#F7EBD0]
                      sm:text-4xl
                    "
                  >
                    Cultural Sub Council
                  </p>
      
                </div>
      
                {/* Footer Links */}
      
                <div
                  className="
                    flex
                    flex-col
                    gap-8
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#D8C7AA]
                    sm:flex-row
                    sm:gap-12
                  "
                >
      
                  <a
                    href="#work"
                    className="
                      transition-colors
                      duration-300
                      hover:text-[#C6A15B]
                    "
                  >
                    Clubs
                  </a>
      
                  <a
                    href="#manifesto"
                    className="
                      transition-colors
                      duration-300
                      hover:text-[#C9A24D]
                    "
                  >
                    About
                  </a>
      
                  <a
                    href="#contact"
                    className="
                      transition-colors
                      duration-300
                      hover:text-[#C9A24D]
                    "
                  >
                    Contact
                  </a>
      
                  <span className="text-[#8F7663]">
                    © {new Date().getFullYear()} Cultural Sub Council
                  </span>
      
                </div>
      
              </div>
      
            </footer>

    </main>
  );
}