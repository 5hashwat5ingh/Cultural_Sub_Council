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
    description: "Turning thoughts into something people can feel.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Expression",
  },
  {
    number: "04",
    title: "Collaboration",
    description: "Different perspectives creating something greater.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    alt: "Collaboration",
  },
  {
    number: "05",
    title: "Experience",
    description: "Creating moments worth remembering.",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    alt: "Experience",
  },
  {
    number: "06",
    title: "Together",
    description: "Building memories that stay with us.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    alt: "Together",
  },
];

/*
  IMAGE DIMENSIONS

  156vh = total visible image viewport height.
  Each story occupies 1/3 of that viewport.
*/
const VIEWPORT_HEIGHT = 156;
const SLOT_HEIGHT = VIEWPORT_HEIGHT / 3;

export default function ScrollStory({
  stories = DEFAULT_STORIES,
  className = "",
}) {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  const totalStories = stories.length;

  /*
    Total distance the image stack needs to travel.
  */
  const maxTranslate = (totalStories - 1) * SLOT_HEIGHT;

  /*
    Track scrolling through the entire section.
  */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
    Move the image stack upward as the user scrolls.
  */
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", `-${maxTranslate}vh`]
  );

  /*
    Detect which story is currently active.
  */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      totalStories - 1,
      Math.round(latest * (totalStories - 1))
    );

    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  return (
    <section
      ref={sectionRef}
      className={`relative h-[600vh] w-full bg-[#0A0A0A] ${className}`}
    >
      {/* =========================================================
          STICKY VIEWPORT
      ========================================================= */}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
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
          {/* =====================================================
              LEFT TEXT
              ===================================================== */}

          <div className="relative h-screen min-w-0">
            {/*
              This container is exactly h-screen.

              The text is positioned at 50% of the viewport,
              NOT relative to the 156vh image container.
            */}
            <div className="absolute left-0 top-1/2 w-full max-w-xl -translate-y-1/2">
              <StoryText
                story={stories[activeIndex]}
                activeIndex={activeIndex}
                total={totalStories}
              />
            </div>
          </div>

          {/* =====================================================
              RIGHT IMAGE AREA
              ===================================================== */}

          <div className="flex h-full min-w-0 items-center justify-center">
            <div
              className="
                relative
                w-full
                max-w-[540px]
                overflow-hidden
                rounded-2xl
              "
              style={{
                height: `${VIEWPORT_HEIGHT}vh`,
              }}
            >
              {/* =================================================
                  TOP GRADIENT MASK
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  z-20
                  h-20
                  bg-gradient-to-b
                  from-[#0A0A0A]
                  to-transparent
                "
              />

              {/* =================================================
                  BOTTOM GRADIENT MASK
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-20
                  h-20
                  bg-gradient-to-t
                  from-[#0A0A0A]
                  to-transparent
                "
              />

              {/* =================================================
                  IMAGE STACK
              ================================================= */}

              <motion.div
                style={{
                  y: reduceMotion ? "0vh" : translateY,
                }}
                className="flex flex-col will-change-transform"
              >
                {/* =================================================
                    TOP SPACER
                ================================================= */}

                <div
                  className="shrink-0"
                  style={{
                    height: `${SLOT_HEIGHT}vh`,
                  }}
                />

                {/* =================================================
                    STORIES
                ================================================= */}

                {stories.map((story, index) => {
                  const active = index === activeIndex;

                  return (
                    <div
                      key={story.number}
                      className="
                        flex
                        shrink-0
                        items-center
                        justify-center
                        p-2
                      "
                      style={{
                        height: `${SLOT_HEIGHT}vh`,
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: active ? 1 : 0.88,
                          opacity: active ? 1 : 0.35,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
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
                              ? "border-white/30"
                              : "border-white/10"
                          }
                        `}
                      >
                        {/* IMAGE */}

                        <img
                          src={story.image}
                          alt={story.alt}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                        {/* DARK OVERLAY */}

                        <div className="absolute inset-0 bg-black/10" />

                        {/* IMAGE LABEL */}

                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs tracking-[0.3em] text-white/80">
                            {story.number}
                          </span>

                          <h3 className="text-lg font-medium text-white">
                            {story.title}
                          </h3>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}

                {/* =================================================
                    BOTTOM SPACER
                ================================================= */}

                <div
                  className="shrink-0"
                  style={{
                    height: `${SLOT_HEIGHT}vh`,
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