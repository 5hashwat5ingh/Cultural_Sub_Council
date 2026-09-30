import React, { useRef, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import StoryText from "./StoryText";


const DEFAULT_STORIES = [
  {
    number: "01",
    title: "Culture",
    description: "Where ideas become experiences.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    alt: "Culture",
  },

  {
    number: "02",
    title: "Creativity",
    description: "Giving imagination a place to breathe.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
    alt: "Creativity",
  },

  {
    number: "03",
    title: "Expression",
    description:
      "Turning thoughts into something people can feel.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Expression",
  },

  {
    number: "04",
    title: "Collaboration",
    description:
      "Different perspectives creating something greater.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    alt: "Collaboration",
  },

  {
    number: "05",
    title: "Experience",
    description:
      "Creating moments worth remembering.",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    alt: "Experience",
  },

  {
    number: "06",
    title: "Together",
    description:
      "Building memories that stay with us.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    alt: "Together",
  },
];


/* =========================================================
   IMAGE STACK SETTINGS
========================================================= */

/*
  Card height in viewport units.

  48vh gives enough space around the image while keeping
  the active card clearly centered.
*/

const CARD_HEIGHT = 48;


/* =========================================================
   SCROLL STORY
========================================================= */

export default function ScrollStory({
  stories = DEFAULT_STORIES,
  className = "",
}) {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  const totalStories = stories.length;


  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });


  /* =========================================================
     TOTAL STACK MOVEMENT
  ========================================================= */

  const maxTranslate =
    (totalStories - 1) * CARD_HEIGHT;


  /* =========================================================
     IMAGE STACK Y POSITION
  ========================================================= */

  const translateY = useTransform(
    scrollYProgress,

    [0, 1],

    [
      "0vh",
      `-${maxTranslate}vh`,
    ]
  );


  /* =========================================================
     ACTIVE STORY
  ========================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {

      const index = Math.min(
        totalStories - 1,

        Math.max(
          0,

          Math.round(
            latest * (totalStories - 1)
          )
        )
      );

      setActiveIndex((prev) =>
        prev === index
          ? prev
          : index
      );
    }
  );


  /* =========================================================
     CENTER SPACER
  ========================================================= */

  /*
    Browser viewport = 100vh

    Card = 48vh

    Remaining space = 52vh

    Half above + half below = 26vh
  */

  const CENTER_SPACER =
    (100 - CARD_HEIGHT) / 2;


  return (

    <section
      ref={sectionRef}

      className={`
        relative
        h-[600vh]
        w-full
        bg-[#2B0A12]
        ${className}
      `}
    >

      {/* =====================================================
          STICKY VIEWPORT
      ===================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
      >

        <div
          className="
            mx-auto
            grid
            h-full
            w-full
            max-w-7xl
            grid-cols-1
            gap-10
            px-6
            sm:px-12
            lg:grid-cols-2
            lg:px-20
          "
        >

          {/* =================================================
              LEFT TEXT
          ================================================= */}

          <div
            className="
              relative
              h-screen
              min-w-0
            "
          >

            <div
              className="
                absolute
                left-0
                top-1/2
                w-full
                max-w-xl
                -translate-y-1/2
              "
            >

              <StoryText
                story={stories[activeIndex]}
                activeIndex={activeIndex}
                total={totalStories}
              />

            </div>

          </div>


          {/* =================================================
              RIGHT IMAGE AREA
          ================================================= */}

          <div
            className="
              relative
              flex
              h-screen
              min-w-0
              items-center
              justify-center
            "
          >

            {/* =================================================
                IMAGE VIEWPORT
            ================================================= */}

            <div
              className="
                relative
                h-screen
                w-full
                max-w-[620px]
                overflow-hidden
              "
            >

              {/* =================================================
                  TOP FADE
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  z-30
                  h-28
                  bg-gradient-to-b
                  from-[#2B0A12]
                  via-[#2B0A12]/70
                  to-transparent
                "
              />


              {/* =================================================
                  BOTTOM FADE
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-30
                  h-28
                  bg-gradient-to-t
                  from-[#2B0A12]
                  via-[#2B0A12]/70
                  to-transparent
                "
              />


              {/* =================================================
                  IMAGE STACK
              ================================================= */}

              <motion.div
                style={{
                  y: reduceMotion
                    ? "0vh"
                    : translateY,
                }}

                className="
                  flex
                  flex-col
                  will-change-transform
                "
              >

                {/* =================================================
                    TOP CENTER SPACER
                ================================================= */}

                <div
                  className="
                    shrink-0
                  "
                  style={{
                    height:
                      `${CENTER_SPACER}vh`,
                  }}
                />


                {/* =================================================
                    STORIES
                ================================================= */}

                {stories.map(
                  (story, index) => {

                    const active =
                      index === activeIndex;

                    return (

                      <div
                        key={story.number}

                        className="
                          flex
                          shrink-0
                          items-center
                          justify-center
                          px-2
                        "

                        style={{
                          height:
                            `${CARD_HEIGHT}vh`,
                        }}
                      >

                        <motion.div
                          animate={{
                            scale:
                              active
                                ? 1
                                : 0.88,

                            opacity:
                              active
                                ? 1
                                : 0.35,
                          }}

                          transition={{
                            duration: 0.45,

                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}

                          className={`
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            ${
                              active
                                ? "border-[#C6A15B]/70"
                                : "border-[#C6A15B]/15"
                            }
                          `}
                        >

                          {/* =================================================
                              IMAGE
                          ================================================= */}

                          <img
                            src={story.image}
                            alt={story.alt}

                            loading={
                              index < 2
                                ? "eager"
                                : "lazy"
                            }

                            decoding="async"

                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />


                          {/* =================================================
                              MAROON OVERLAY
                          ================================================= */}

                          <div
                            className="
                              absolute
                              inset-0
                              bg-[#2B0A12]/20
                            "
                          />


                          {/* =================================================
                              BOTTOM GRADIENT
                          ================================================= */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-x-0
                              bottom-0
                              h-40
                              bg-gradient-to-t
                              from-[#2B0A12]/90
                              via-[#2B0A12]/40
                              to-transparent
                            "
                          />


                          {/* =================================================
                              IMAGE LABEL
                          ================================================= */}

                          <div
                            className="
                              absolute
                              bottom-5
                              left-5
                            "
                          >

                            <span
                              className="
                                text-xs
                                tracking-[0.3em]
                                text-[#D9B86C]
                              "
                            >
                              {story.number}
                            </span>

                            <h3
                              className="
                                mt-1
                                text-lg
                                font-medium
                                text-[#F7EBD0]
                                sm:text-xl
                              "
                            >
                              {story.title}
                            </h3>

                          </div>

                        </motion.div>

                      </div>

                    );
                  }
                )}


                {/* =================================================
                    BOTTOM CENTER SPACER
                ================================================= */}

                <div
                  className="
                    shrink-0
                  "

                  style={{
                    height:
                      `${CENTER_SPACER}vh`,
                  }}
                />

              </motion.div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}