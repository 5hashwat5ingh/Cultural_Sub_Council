
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
    title: "Thomso",
    location: "IIT Roorkee",
    subtitle: "Rap Competition",
    achievement: "Second Position",
    person: "Rachit Singh",
    description:
      "Rachit Singh secured second position in the Rap Competition at Thomso, showcasing his talent and performance on an inter-college cultural stage.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791320105/Screenshot_2025-11-09-19-01-41-423_com.miui.mediaviewer.jpg.jpg",
    alt: "Rachit Singh's achievement at Thomso",
  },
  {
    number: "02",
    title: "Parampara",
    location: "ITM Gorakhpur",
    subtitle: "Battle of Bands",
    achievement: "First Position",
    person: "Team Anahat",
    description:
      "Team Anahat secured first position in the Battle of Bands at ITM Gorakhpur during Parampara, marking an important achievement for the institute's music community.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791345113/WhatsApp_Image_2026-10-07_at_9.15.26_AM.jpg",
    alt: "Team Anahat at ITM Gorakhpur",
  },
  {
    number: "03",
    title: "Thomso",
    location: "IIT Roorkee",
    subtitle: "Dress Designing",
    achievement: "Second Position",
    person: "Anju Mani",
    description:
      "Our participant secured second position in Dress Designing at Thomso, earning recognition for creativity and design in a competitive cultural event.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791320185/WhatsApp_Image_2026-10-07_at_2.10.06_AM.jpg",
    alt: "Dress Designing achievement at Thomso",
  },
  {
    number: "04",
    title: "Thomso",
    location: "IIT Roorkee",
    subtitle: "Nukkad Natak",
    achievement: "Finalist",
    person: "Team Shunya",
    description:
      "Team Shunya reached the finals of Nukkad Natak at Thomso, competing against 25 participating teams and showcasing the team's dedication to theatrical performance.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791345594/WhatsApp_Image_2026-10-07_at_9.29.21_AM.jpg",
    alt: "Team Shunya's Nukkad Natak achievement",
  },
  {
    number: "05",
    title: "Kashiyatra",
    location: "IIT BHU",
    subtitle: "Asmita — Monoact",
    achievement: "Third Position",
    person: "Gargi Yadav",
    description:
      "Gargi Yadav secured third position in Asmita (Monoact) at Kashiyatra, earning recognition for her individual theatrical performance.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791348685/WhatsApp_Image_2026-10-07_at_10.17.25_AM.jpg",
    alt: "Gargi Yadav's Asmita Monoact achievement",
  },
  {
    number: "06",
    title: "Mood Indigo",
    location: "IIT Mumbai",
    subtitle: "Group Dance",
    achievement: "Finalist",
    person: "Free Stylers",
    description:
      "Our group dance team reached the finals at Mood Indigo, gaining recognition at one of the institute's major cultural competition appearances.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791345213/WhatsApp_Image_2026-10-07_at_12.33.55_AM.jpg",
    alt: "Group Dance achievement at Mood Indigo",
  },
];

const CARD_HEIGHT = 58;
const MOBILE_CARD_HEIGHT = 40;

export default function ScrollStory({
  stories = DEFAULT_STORIES,
  className = "",
}) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const totalStories = stories.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const desktopMaxTranslate = Math.max(
    0,
    (totalStories - 1) * CARD_HEIGHT
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", `-${desktopMaxTranslate}vh`]
  );

  const mobileMaxTranslate = Math.max(
    0,
    (totalStories - 1) * MOBILE_CARD_HEIGHT
  );

  const mobileTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", `-${mobileMaxTranslate}vh`]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (totalStories === 0) return;

    const index = Math.min(
      totalStories - 1,
      Math.max(0, Math.round(latest * (totalStories - 1)))
    );

    setActiveIndex((previous) =>
      previous === index ? previous : index
    );
  });

  if (totalStories === 0) return null;

  const desktopSpacer = (100 - CARD_HEIGHT) / 2;
  const mobileSpacer = (100 - MOBILE_CARD_HEIGHT) / 2;

  return (
    <section
      ref={sectionRef}
      className={`
        relative
        h-[650vh] sm:h-[650vh] lg:h-[600vh]
        w-full
        bg-[#DCD3A4]
        ${className}
      `}
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* =====================================================
            DESKTOP LAYOUT
        ====================================================== */}
        <div className="mx-auto hidden h-full w-full max-w-7xl grid-cols-2 gap-8 px-8 sm:px-12 lg:grid lg:gap-12 lg:px-20">
          {/* DESKTOP TEXT */}
          <div className="relative h-screen min-w-0">
            <div className="absolute left-0 top-1/2 w-full max-w-xl -translate-y-1/2">
              <StoryText
                story={stories[activeIndex]}
                activeIndex={activeIndex}
                total={totalStories}
              />
            </div>
          </div>

          {/* DESKTOP IMAGE STACK */}
          <div className="relative flex h-screen min-w-0 items-center justify-center">
            <div className="relative h-screen w-full max-w-[620px] overflow-hidden">
              <motion.div
                style={{
                  y: reduceMotion ? "0vh" : translateY,
                }}
                className="flex flex-col will-change-transform"
              >
                <div
                  className="shrink-0"
                  style={{ height: `${desktopSpacer}vh` }}
                />

                {stories.map((story, index) => {
                  const active = index === activeIndex;

                  return (
                    <div
                      key={story.number}
                      className="flex shrink-0 items-center justify-center px-2"
                      style={{ height: `${CARD_HEIGHT}vh` }}
                    >
                      <motion.div
                        animate={{ scale: active ? 1 : 0.88 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`
                          relative h-full w-full overflow-hidden rounded-2xl border
                          ${
                            active
                              ? "border-[#C6A15B]/70"
                              : "border-[#C6A15B]/15"
                          }
                        `}
                      >
                        <img
                          src={story.image}
                          alt={story.alt}
                          loading={index < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="block h-full w-full object-cover"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[#2B0A12]/20" />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#2B0A12]/80 to-transparent" />

                        <div className="absolute bottom-5 left-5">
                          <span className="text-xs tracking-[0.3em] text-[#F7EBD0]">
                            {story.number}
                          </span>
                          <h3 className="mt-1 text-lg font-medium text-[#F7EBD0] sm:text-xl">
                            {story.title}
                          </h3>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}

                <div
                  className="shrink-0"
                  style={{ height: `${desktopSpacer}vh` }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE LAYOUT
        ====================================================== */}
        <div className="flex h-full w-full flex-col gap-2 overflow-hidden px-4 py-3 sm:gap-4 sm:px-8 sm:py-6 lg:hidden">
          {/* MOBILE STORY TEXT */}
          <div className="relative z-10 w-full shrink-0 overflow-visible">
            <div className="mx-auto w-full max-w-md">
              <StoryText
                story={stories[activeIndex]}
                activeIndex={activeIndex}
                total={totalStories}
              />
            </div>
          </div>

          {/* MOBILE IMAGE STACK */}
          <div className="relative flex min-h-0 w-full flex-[1.5] items-center justify-center">
            <div className="relative h-full min-h-0 max-h-[50vh] w-full max-w-[500px] overflow-hidden rounded-xl sm:max-h-[38vh]">
              <motion.div
                style={{
                  y: reduceMotion ? "0vh" : mobileTranslateY,
                }}
                className="flex flex-col will-change-transform"
              >
                <div
                  className="shrink-0"
                  style={{ height: `${mobileSpacer}vh` }}
                />

                {stories.map((story, index) => {
                  const active = index === activeIndex;

                  return (
                    <div
                      key={story.number}
                      className="flex shrink-0 items-center justify-center px-0"
                      style={{ height: `${MOBILE_CARD_HEIGHT}vh` }}
                    >
                      <motion.div
                        animate={{ scale: active ? 1 : 0.92 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`
                          relative h-full w-full overflow-hidden rounded-xl border
                          ${
                            active
                              ? "border-[#C6A15B]/70"
                              : "border-[#C6A15B]/15"
                          }
                        `}
                      >
                        <img
                          src={story.image}
                          alt={story.alt}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="block h-full w-full object-cover"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[#2B0A12]/15" />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-34 bg-gradient-to-t from-[#2B0A12]/90 via-[#2B0A12]/40 to-transparent" />

                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                          <span className="text-[10px] tracking-[0.25em] text-[#F7EBD0]">
                            {story.number}
                          </span>
                          <h3 className="mt-1 text-base font-medium text-[#F7EBD0]">
                            {story.title}
                          </h3>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}

                <div
                  className="shrink-0"
                  style={{ height: `${mobileSpacer}vh` }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
