import React, {
  useRef,
  useState,
} from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import StoryText from "./StoryText";

/* =========================================================
   DEFAULT STORIES
========================================================= */

const DEFAULT_STORIES = [
  {
    number: "01",
    title: "Thomso",
    description:
      "Rap competition: Rachit singh secured second position",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791320105/Screenshot_2025-11-09-19-01-41-423_com.miui.mediaviewer.jpg.jpg",
    alt: "Culture",
  },

  {
    number: "02",
    title: "ITM Gorakhpur",
    description:
      "Tem Anahat: secured 1st position, Battle of Bands, Parampara",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791345113/WhatsApp_Image_2026-10-07_at_9.15.26_AM.jpg",
    alt: "Creativity",
  },

  {
    number: "03",
    title: "Thomso",
    description:
      "Second position in dress designing",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791320185/WhatsApp_Image_2026-10-07_at_2.10.06_AM.jpg",
    alt: "Expression",
  },

  {
    number: "04",
    title: "Thomso",
    description:
      "Nukkad Natak: Team Shunya finalist competing with 25 teams who participated",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791345594/WhatsApp_Image_2026-10-07_at_9.29.21_AM.jpg",
    alt: "Collaboration",
  },

  {
    number: "05",
    title: "Kashiyatra",
    description:
      "Gargi yadav secured 3rd position in Asmita(Monoact)",
       image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791348685/WhatsApp_Image_2026-10-07_at_10.17.25_AM.jpg",
    alt: "Experience",
  },

  {
    number: "06",
    title: "Mood Indigo",
    description:
      "Finalist in Group Dance",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791345213/WhatsApp_Image_2026-10-07_at_12.33.55_AM.jpg",
    alt: "Together",
  },
];

/* =========================================================
   DESKTOP IMAGE SETTINGS
========================================================= */

const CARD_HEIGHT = 48;

/* =========================================================
   MOBILE IMAGE SETTINGS
========================================================= */

const MOBILE_CARD_HEIGHT = 38;

/* =========================================================
   SCROLL STORY
========================================================= */

export default function ScrollStory({
  stories = DEFAULT_STORIES,
  className = "",
}) {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const reduceMotion =
    useReducedMotion();

  const totalStories =
    stories.length;

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  /* =======================================================
     DESKTOP STACK MOVEMENT
  ======================================================= */

  const maxTranslate =
    Math.max(
      0,
      (totalStories - 1) *
        CARD_HEIGHT
    );

  const translateY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        "0vh",
        `-${maxTranslate}vh`,
      ]
    );

  /* =======================================================
     MOBILE STACK MOVEMENT
  ======================================================= */

  const mobileMaxTranslate =
    Math.max(
      0,
      (totalStories - 1) *
        MOBILE_CARD_HEIGHT
    );

  /*
    IMPORTANT:
    useTransform must be called at the
    top level of the component.
  */

  const mobileTranslateY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        "0vh",
        `-${mobileMaxTranslate}vh`,
      ]
    );

  /* =======================================================
     ACTIVE STORY
  ======================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const index = Math.min(
        totalStories - 1,
        Math.max(
          0,
          Math.round(
            latest *
              (totalStories - 1)
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

  /* =======================================================
     CENTER SPACER
  ======================================================= */

  const CENTER_SPACER =
    (100 - CARD_HEIGHT) / 2;

  const MOBILE_VIEWPORT_HEIGHT = 42;

const MOBILE_CENTER_SPACER =
  (MOBILE_VIEWPORT_HEIGHT -
    MOBILE_CARD_HEIGHT) / 2;

  return (
    <section
      ref={sectionRef}
      className={`
        relative
        h-[600vh]
        w-full
        bg-[#DCD3A4]
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

        {/* ===================================================
            DESKTOP / TABLET LAYOUT
        =================================================== */}

        <div
          className="
            mx-auto
            hidden
            h-full
            w-full
            max-w-7xl
            grid-cols-2
            gap-4
            px-8
            sm:px-12
            lg:grid
            lg:gap-12
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
                story={
                  stories[activeIndex]
                }
                activeIndex={
                  activeIndex
                }
                total={
                  totalStories
                }
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

             
              {/* =================================================
                  BOTTOM FADE
              ================================================= */}

             

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
                    TOP SPACER
                ================================================= */}

                <div
                  className="shrink-0"
                  style={{
                    height:
                      `${CENTER_SPACER}vh`,
                  }}
                />

                {/* =================================================
                    STORIES
                ================================================= */}

                {stories.map(
                  (
                    story,
                    index
                  ) => {

                    const active =
                      index ===
                      activeIndex;

                    return (
                      <div
                        key={
                          story.number
                        }
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

                        {/* =================================================
                            IMAGE CARD
                        ================================================= */}

                        <motion.div
                          animate={{
                            /*
                              IMPORTANT:
                              Opacity is intentionally
                              NOT animated.

                              This prevents the image
                              from fading when it enters
                              the visible region.
                            */

                            scale:
                              active
                                ? 1
                                : 0.88,
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

                          <img
                            src={
                              story.image
                            }
                            alt={
                              story.alt
                            }
                            loading={
                              index < 2
                                ? "eager"
                                : "lazy"
                            }
                            decoding="async"
                            className="
                              block
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
                              pointer-events-none
                              absolute
                              inset-0
                              bg-[#2B0A12]/20
                            "
                          />

                          {/* =================================================
                              BOTTOM GRADIENT
                          ================================================= */}

                         

                          {/* =================================================
                              LABEL
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
                                text-[#7A1B2F]
                              "
                            >
                              {
                                story.number
                              }
                            </span>

                            <h3
                              className="
                                mt-1
                                text-lg
                                font-medium
                                text-[#3A0D18]
                                sm:text-xl
                              "
                            >
                              {
                                story.title
                              }
                            </h3>

                          </div>

                        </motion.div>

                      </div>
                    );
                  }
                )}

                {/* =================================================
                    BOTTOM SPACER
                ================================================= */}

                <div
                  className="shrink-0"
                  style={{
                    height:
                      `${CENTER_SPACER}vh`,
                  }}
                />

              </motion.div>

            </div>

          </div>

        </div>

        {/* ===================================================
            MOBILE LAYOUT
        =================================================== */}

        <div
          className="
            flex
            h-full
            w-full
            flex-col
            px-5
            py-8
            sm:px-8
            lg:hidden
          "
        >

          {/* =================================================
              MOBILE TEXT
          ================================================= */}

          <div
            className="
              flex
              min-h-[35vh]
              w-full
              items-center
              justify-center
            "
          >

            <div
              className="
                w-full
                max-w-md
              "
            >

              <StoryText
                story={
                  stories[activeIndex]
                }
                activeIndex={
                  activeIndex
                }
                total={
                  totalStories
                }
              />

            </div>

          </div>

          {/* =================================================
              MOBILE IMAGE
          ================================================= */}

          <div
            className="
              relative
              flex
              min-h-0
              flex-1
              w-full
              items-center
              justify-center
            "
          >

            <div
              className="
                relative
                h-[42vh] sm:h-[45vh] md:h-[47vh]
                w-full
                max-w-[500px]
                overflow-hidden
                rounded-xl
              "
            >

              {/* =================================================
                  TOP FADE
              ================================================= */}

             

              {/* =================================================
                  BOTTOM FADE
              ================================================= */}

             

              {/* =================================================
                  MOBILE IMAGE STACK
              ================================================= */}

              <motion.div
                style={{
                  y: reduceMotion
                    ? "0vh"
                    : mobileTranslateY,
                }}
                className="
                  flex
                  flex-col
                  will-change-transform
                "
              >

                {/* =================================================
                    TOP SPACER
                ================================================= */}

                <div
                  className="shrink-0"
                  style={{
                    height:
                      `${MOBILE_CENTER_SPACER}vh`,
                  }}
                />

                {/* =================================================
                    STORIES
                ================================================= */}

                {stories.map(
                  (
                    story,
                    index
                  ) => {

                    const active =
                      index ===
                      activeIndex;

                    return (
                      <div
                        key={
                          story.number
                        }
                        className="
                          flex
                          shrink-0
                          items-center
                          justify-center
                          px-0
                        "
                        style={{
                          height:
                            `${MOBILE_CARD_HEIGHT}vh`,
                        }}
                      >

                        {/* =================================================
                            MOBILE IMAGE CARD
                        ================================================= */}

                        <motion.div
                          animate={{
                            /*
                              No opacity animation here.
                              The image remains fully visible.
                            */

                            scale:
                              active
                                ? 1
                                : 0.92,
                          }}
                          transition={{
                            duration: 0.4,
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
                            rounded-xl
                            border
                            ${
                              active
                                ? "border-[#C6A15B]/70"
                                : "border-[#C6A15B]/15"
                            }
                          `}
                        >

                          <img
                            src={
                              story.image
                            }
                            alt={
                              story.alt
                            }
                            loading={
                              index === 0
                                ? "eager"
                                : "lazy"
                            }
                            decoding="async"
                            className="
                              block
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
                              pointer-events-none
                              absolute
                              inset-0
                              bg-[#2B0A12]/15
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
                              h-24
                              bg-gradient-to-t
                              from-[#2B0A12]/90
                              via-[#2B0A12]/40
                              to-transparent
                            "
                          />

                          {/* =================================================
                              LABEL
                          ================================================= */}

                          <div
                            className="
                              absolute
                              bottom-4
                              left-4
                            "
                          >

                            <span
                              className="
                                text-[10px]
                                tracking-[0.25em]
                                text-[#7A1B2F]
                              "
                            >
                              {
                                story.number
                              }
                            </span>

                            <h3
                              className="
                                mt-1
                                text-base
                                font-medium
                                text-[#3A0D18]
                              "
                            >
                              {
                                story.title
                              }
                            </h3>

                          </div>

                        </motion.div>

                      </div>
                    );
                  }
                )}

                {/* =================================================
                    BOTTOM SPACER
                ================================================= */}

                <div
                  className="shrink-0"
                  style={{
                    height:
                      `${MOBILE_CENTER_SPACER}vh`,
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