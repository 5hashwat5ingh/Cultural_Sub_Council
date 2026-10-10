
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { teamMembers, categories } from "../data/teamData";

/* =========================================================
   TEAM CARD
========================================================= */

function TeamCard({ member, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.025, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group min-w-0"
    >
      <div
        className="
          relative aspect-[0.86] overflow-hidden rounded-[12px]
          border border-[#C6A15B]/35 bg-[#F7EBD0]
          transition-all duration-500
          group-hover:-translate-y-1
          group-hover:border-[#C6A15B]/70
        "
      >
        {/* PERSON IMAGE */}

        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="
            absolute inset-0 h-full w-full
            object-cover object-top
            transition-transform duration-700 ease-out
            group-hover:scale-[1.025]
          "
        />

        {/* BOTTOM FADE */}

        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0
            z-[1] h-24
            bg-gradient-to-t from-[#3A0D18]/25 to-transparent
          "
        />

        {/* NAME / ROLE PANEL */}

        <div
          className="
            absolute bottom-2 left-2 right-2 z-10
            rounded-[9px] border border-[#C6A15B]/30
            bg-[#F7EBD0]/95 px-2 py-2 text-center
            backdrop-blur-[2px]
            sm:bottom-2.5 sm:left-2.5 sm:right-2.5
            sm:px-4 sm:py-3
          "
        >
          <h3
            className="
              truncate text-[11px] font-semibold
              leading-tight tracking-[-0.02em]
              text-[#3A0D18] sm:text-sm
            "
            title={member.name}
          >
            {member.name}
          </h3>

          <p
            className="
              mt-0.5 truncate text-[8px] font-medium
              leading-tight text-[#6B5148] sm:text-[9px]
            "
            title={member.role}
          >
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   YEAR SECTION
========================================================= */

function YearSection({ title, members, startIndex = 0 }) {
  if (!members.length) return null;

  return (
    <div className="relative">
      {/* YEAR HEADING */}

      <div className="mb-7 flex items-center gap-4 sm:mb-9">
        <span
          className="
            h-px flex-1 bg-gradient-to-r
            from-transparent to-[#C6A15B]/60
          "
        />

        <h2
          className="
            shrink-0 text-center text-[10px] font-semibold
            uppercase tracking-[0.25em] text-[#7A1B2F]
            sm:text-xs sm:tracking-[0.35em]
          "
        >
          {title}
        </h2>

        <span
          className="
            h-px flex-1 bg-gradient-to-l
            from-transparent to-[#C6A15B]/60
          "
        />
      </div>

      {/* TEAM GRID */}

      <motion.div
        layout
        className="
          grid grid-cols-2 gap-3
          sm:grid-cols-2 sm:gap-4
          lg:grid-cols-4 lg:gap-5
        "
      >
        <AnimatePresence mode="popLayout">
          {members.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={startIndex + index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* =========================================================
   TEAM PAGE
========================================================= */

export default function Team() {
  const [activeCategory, setActiveCategory] = useState("View All");

  /* FILTER MEMBERS */

  const filteredMembers = useMemo(() => {
    if (activeCategory === "View All") {
      return teamMembers;
    }

    return teamMembers.filter(
      (member) => member.year === activeCategory
    );
  }, [activeCategory]);

  /* GROUP MEMBERS BY YEAR */

  const finalYearMembers = useMemo(
    () =>
      filteredMembers.filter(
        (member) => member.year === "Final Year"
      ),
    [filteredMembers]
  );

  const preFinalYearMembers = useMemo(
    () =>
      filteredMembers.filter(
        (member) => member.year === "Pre-Final Year"
      ),
    [filteredMembers]
  );

  const sophomoreMembers = useMemo(
    () =>
      filteredMembers.filter(
        (member) => member.year === "Sophomore"
      ),
    [filteredMembers]
  );

  return (
    <main
      className="
        min-h-screen overflow-x-clip
        bg-[#DCD3A4] text-[#3A0D18]
      "
    >
      {/* NAVBAR */}

      <Navbar />

      {/* =====================================================
          FULL-WIDTH HERO SECTION
      ===================================================== */}

      <section
        className="
          relative isolate flex min-h-[520px] w-full
          items-center justify-center overflow-hidden
          px-5 pb-16 pt-28
          sm:min-h-[600px] sm:px-8 sm:pb-20 sm:pt-32
          lg:min-h-[680px] lg:px-16 lg:pt-36
          xl:min-h-[760px]
        "
      >
        {/* FULL-WIDTH BACKGROUND IMAGE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[-20]
            bg-cover bg-center bg-no-repeat
          "
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/yh0rqnnu/image/upload/f_auto,q_auto/WhatsApp_Image_2026-09-29_at_10.42.23_PM')",
          }}
        />

        {/* UNIFORM BLACK OVERLAY: 20% OPACITY */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[-10]
            bg-black/20
          "
        />

        {/* SUBTLE GRADIENT FOR TEXT READABILITY */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[-10]
            bg-gradient-to-b
            from-black/25 via-transparent to-black/30
          "
        />

        {/* HERO CONTENT */}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] text-center">
          {/* EYEBROW */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-white/70 sm:w-10" />

            <span
              className="
                text-[9px] font-semibold uppercase
                tracking-[0.3em] text-white
                sm:text-[10px] sm:tracking-[0.4em]
              "
            >
              Cultural Sub Council
            </span>

            <span className="h-px w-8 bg-white/70 sm:w-10" />
          </motion.div>

          {/* MAIN TITLE */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-7 text-center
              text-[clamp(3.5rem,10vw,9rem)]
              font-semibold leading-[0.9]
              tracking-[-0.07em] text-white drop-shadow-lg
            "
          >
            OUR{" "}
            <span className="font-sans text-[#D9B86C]">
              TEAM
            </span>
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="
              mx-auto mt-6 max-w-2xl px-2
              text-sm leading-7 text-white drop-shadow-md
              sm:mt-8 sm:px-0 sm:text-base sm:leading-8
              lg:text-lg
            "
          >
            Meet the people behind the Cultural Sub Council —
            creators, performers, organizers and storytellers
            shaping the cultural spirit of our campus.
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTER — BELOW HERO
      ===================================================== */}

      <section
        className="
          relative z-20 w-full
          border-y border-[#7A1B2F]/15
          bg-[#DCD3A4] px-4 py-4
          sm:px-8 sm:py-5
        "
      >
        <div
          className="
            mx-auto flex w-full max-w-[1500px]
            flex-wrap items-center justify-center gap-2
            sm:gap-3
          "
        >
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`
                  shrink-0 rounded-full border
                  px-4 py-2.5 text-[8px] font-semibold
                  uppercase tracking-[0.16em]
                  transition-all duration-300
                  sm:px-5 sm:py-3 sm:text-[9px]
                  ${
                    active
                      ? "border-[#C6A15B] bg-[#C6A15B] text-[#3A0D18]"
                      : "border-[#7A1B2F]/20 bg-[#E8DFB0] text-[#6B5148] hover:border-[#C6A15B]/70 hover:text-[#7A1B2F]"
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
          TEAM GRID
      ===================================================== */}

      <section
        className="
          relative px-4 py-12
          sm:px-8 sm:py-16
          lg:px-12 lg:py-20
        "
      >
        {/* BACKGROUND ATMOSPHERE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute left-[-200px] top-[15%]
            h-[500px] w-[500px] rounded-full
            bg-[#7A1B2F]/[0.045] blur-[130px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute bottom-[5%] right-[-200px]
            h-[500px] w-[500px] rounded-full
            bg-[#C6A15B]/[0.06] blur-[130px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          {/* MEMBER COUNT */}

          <div className="mb-10 flex items-center justify-between">
            <p
              className="
                text-[8px] uppercase tracking-[0.3em]
                text-[#6B5148]
              "
            >
              {filteredMembers.length}{" "}
              {filteredMembers.length === 1 ? "Member" : "Members"}
            </p>

            <span className="mx-5 h-px flex-1 bg-[#7A1B2F]/10" />

            <p
              className="
                hidden text-[8px] uppercase tracking-[0.3em]
                text-[#6B5148] sm:block
              "
            >
              2026 — 27
            </p>
          </div>

          {/* YEAR GROUPS */}

          <div className="mx-auto max-w-[1250px]">
            <YearSection
              title="Final Year"
              members={finalYearMembers}
              startIndex={0}
            />

            {/* GOLD SEPARATOR */}

            {finalYearMembers.length > 0 &&
              preFinalYearMembers.length > 0 && (
                <div className="my-14 flex items-center gap-5 sm:my-16">
                  <span
                    className="
                      h-px flex-1 bg-gradient-to-r
                      from-transparent to-[#C6A15B]/70
                    "
                  />

                  <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />

                  <span
                    className="
                      h-px flex-1 bg-gradient-to-l
                      from-transparent to-[#C6A15B]/70
                    "
                  />
                </div>
              )}

            <YearSection
              title="Pre-Final Year"
              members={preFinalYearMembers}
              startIndex={finalYearMembers.length}
            />

            {/* GOLD SEPARATOR */}

            {preFinalYearMembers.length > 0 &&
              sophomoreMembers.length > 0 && (
                <div className="my-14 flex items-center gap-5 sm:my-16">
                  <span
                    className="
                      h-px flex-1 bg-gradient-to-r
                      from-transparent to-[#C6A15B]/70
                    "
                  />

                  <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />

                  <span
                    className="
                      h-px flex-1 bg-gradient-to-l
                      from-transparent to-[#C6A15B]/70
                    "
                  />
                </div>
              )}

            <YearSection
              title="Sophomore"
              members={sophomoreMembers}
              startIndex={
                finalYearMembers.length +
                preFinalYearMembers.length
              }
            />

            {/* EMPTY STATE */}

            {filteredMembers.length === 0 && (
              <div
                className="
                  flex min-h-[300px] items-center
                  justify-center text-center
                "
              >
                <div>
                  <p className="text-lg text-[#3A0D18]/70">
                    No members found
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveCategory("View All")}
                    className="
                      mt-4 text-[9px] uppercase
                      tracking-[0.25em] text-[#7A1B2F]
                      transition-colors hover:text-[#9C762E]
                    "
                  >
                    View all members
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOSING SECTION
      ===================================================== */}

      <section
        className="
          relative overflow-hidden
          border-t border-[#7A1B2F]/15
          bg-[#E8DFB0] px-5 py-28
          sm:px-10 sm:py-36 lg:px-16
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute left-1/2 top-1/2
            h-[450px] w-[450px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full border border-[#C6A15B]/20
          "
        />
      </section>

      {/* FOOTER */}

      <Footer />
    </main>
  );
}
