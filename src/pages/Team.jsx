import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  teamMembers,
  categories,
} from "../data/teamData";

const categoryAccent = {
  Leadership: "border-[#C6A15B]",
  Faculty: "border-[#D9B86C]",
  Dance: "border-[#9D3B55]",
  Dramatics: "border-[#7A1B2F]",
  Music: "border-[#B98945]",
  "Fine Arts": "border-[#C18A76]",
  Technical: "border-[#806A4A]",
  Photography: "border-[#A98C68]",
};

function TeamCard({ member, index }) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
      }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.025, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      {/* OUTER CARD */}
      <div
        className="
          relative
          aspect-[0.86]
          overflow-hidden
          rounded-[12px]
          border
          border-[#C6A15B]/25
          bg-[#F7EBD0]
          transition-all
          duration-500
          group-hover:-translate-y-1
          group-hover:border-[#C6A15B]/55
        "
      >
        {/* =================================================
            PERSON IMAGE
        ================================================= */}

        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-top
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.025]
          "
        />

        {/* =================================================
            YEAR LABEL
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
            z-20
            rounded-full
            border
            border-[#C6A15B]/40
            bg-[#1D070D]/75
            px-3
            py-1.5
            backdrop-blur-md
            sm:left-3.5
            sm:top-3.5
            sm:px-3.5
            sm:py-1.5
          "
        >
          <span
            className="
              text-[7px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#D9B86C]
              sm:text-[8px]
            "
          >
            {member.year}
          </span>
        </div>

        {/* =================================================
            SUBTLE BOTTOM FADE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[1]
            h-24
            bg-gradient-to-t
            from-[#1D070D]/20
            to-transparent
          "
        />

        {/* =================================================
            NAME / ROLE PANEL
        ================================================= */}

        <div
          className="
            absolute
            bottom-2
            left-2
            right-2
            z-10
            rounded-[9px]
            border
            border-[#C6A15B]/20
            bg-[#F7EBD0]/95
            px-3
            py-2.5
            text-center
            backdrop-blur-[2px]
            sm:bottom-2.5
            sm:left-2.5
            sm:right-2.5
            sm:px-4
            sm:py-3
          "
        >
          <h3
            className="
              truncate
              text-[12px]
              font-semibold
              leading-tight
              tracking-[-0.02em]
              text-[#1D070D]
              sm:text-sm
            "
          >
            {member.name}
          </h3>

          <p
            className="
              mt-0.5
              truncate
              text-[8px]
              font-medium
              leading-tight
              text-[#6D625B]
              sm:text-[9px]
            "
          >
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
/* =========================================================
   TEAM PAGE
========================================================= */

export default function Team() {
  const [activeCategory, setActiveCategory] = useState("View All");

const filteredMembers = useMemo(() => {
  if (activeCategory === "View All") {
    return teamMembers;
  }

  return teamMembers.filter(
    (member) => member.year === activeCategory
  );
}, [activeCategory]);

  return (
    <main
      className="
        min-h-screen
        overflow-x-clip
        bg-[#2B0A12]
        text-[#F7EBD0]
      "
    >
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar Gallery/>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          px-5
          pb-12
          pt-32
          sm:px-10
          sm:pb-16
          sm:pt-36
          lg:px-16
          lg:pt-40
        "
      >
        {/* Ambient glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#7A1B2F]/20
            blur-[130px]
          "
        />

        {/* Gold glow */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-150px]
            top-20
            h-[350px]
            w-[350px]
            rounded-full
            bg-[#C6A15B]/5
            blur-[100px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          {/* Eyebrow */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-[#C6A15B]/70" />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.4em]
                text-[#D9B86C]
              "
            >
              Cultural Sub Council
            </span>

            <span className="h-px w-8 bg-[#C6A15B]/70" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-7
              text-center
              text-[clamp(4rem,9vw,9rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.07em]
              text-[#F7EBD0]
            "
          >
            OUR
            <span className="text-[#C6A15B]"> TEAM</span>
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
              delay: 0.25,
            }}
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-center
              text-sm
              leading-7
              text-[#D8C7AA]/65
              sm:text-base
              sm:leading-8
            "
          >
            Meet the people behind the Cultural Sub Council — creators,
            performers, organizers and storytellers shaping the cultural
            spirit of our campus.
          </motion.p>
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
          border-[#C6A15B]/15
          bg-[#2B0A12]/95
          px-4
          py-3
          backdrop-blur-xl
          sm:px-8
          sm:py-4
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            gap-2
            overflow-x-auto
            scrollbar-none
            sm:justify-center
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
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  transition-all
                  duration-300
                  sm:px-5
                  sm:py-2.5
                  sm:text-[9px]

                  ${
                    active
                      ? "border-[#C6A15B] bg-[#C6A15B] text-[#1D070D]"
                      : "border-[#C6A15B]/20 bg-[#3A0D18] text-[#D8C7AA]/65 hover:border-[#C6A15B]/50 hover:text-[#F7EBD0]"
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
          relative
          px-4
          py-12
          sm:px-8
          sm:py-16
          lg:px-12
          lg:py-20
        "
      >
        {/* Background atmosphere */}
        <div
          className="
            pointer-events-none
            absolute
            left-[-200px]
            top-[15%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#7A1B2F]/10
            blur-[130px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[5%]
            right-[-200px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/5
            blur-[130px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          {/* Count */}
          <div className="mb-8 flex items-center justify-between">
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-[#D8C7AA]/45
              "
            >
              {filteredMembers.length}{" "}
              {filteredMembers.length === 1 ? "Member" : "Members"}
            </p>

            <span className="h-px flex-1 bg-[#C6A15B]/10 mx-5" />

            <p
              className="
                hidden
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-[#D8C7AA]/45
                sm:block
              "
            >
              2026 — 27
            </p>
          </div>

          {/* Grid */}
          <div className="mx-auto max-w-[1250px]">
  <motion.div
    layout
    className="
      grid
      grid-cols-2
      gap-3
      sm:grid-cols-2
      lg:grid-cols-4
      lg:gap-5
    "
  >
    <AnimatePresence mode="popLayout">
      {filteredMembers.map((member, index) => (
        <TeamCard
          key={member.id}
          member={member}
          index={index}
        />
      ))}
    </AnimatePresence>
  </motion.div>
</div>
          {/* Empty state */}
          {filteredMembers.length === 0 && (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
                text-center
              "
            >
              <div>
                <p className="text-lg text-[#F7EBD0]/70">
                  No members found
                </p>

                <button
                  type="button"
                  onClick={() => setActiveCategory("View all")}
                  className="
                    mt-4
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-[#C6A15B]
                  "
                >
                  View all members
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          JOIN / CLOSING SECTION
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-[#C6A15B]/15
          bg-[#1D070D]
          px-5
          py-28
          sm:px-10
          sm:py-36
          lg:px-16
        "
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C6A15B]/10" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.4em]
              text-[#C6A15B]
            "
          >
            Create • Perform • Belong
          </p>

          <h2
            className="
              mt-6
              text-[clamp(3rem,7vw,7rem)]
              font-medium
              leading-[0.88]
              tracking-[-0.06em]
              text-[#F7EBD0]
            "
          >
            Every role
            <br />
            <span className="text-[#C6A15B]">
              shapes the story.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-xl
              text-sm
              leading-7
              text-[#D8C7AA]/55
            "
          >
            Together, we create the experiences, performances and memories
            that define the cultural life of our campus.
          </p>

          <Link
            to="/"
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-lg
              border
              border-[#C6A15B]/40
              px-6
              py-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#D9B86C]
              transition-all
              duration-500
              hover:border-[#C6A15B]
              hover:bg-[#C6A15B]
              hover:text-[#1D070D]
            "
          >
            Back to Home

            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}