import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   EVENT HIGHLIGHTS
========================================================= */

const highlights = [
  {
    number: "01",
    title: "Dance",
    description:
      "Energetic performances bringing rhythm, movement and expression to the stage.",
  },
  {
    number: "02",
    title: "Dramatics",
    description:
      "Stories, characters and emotions brought alive through theatrical performances.",
  },
  {
    number: "03",
    title: "Music",
    description:
      "Vocal and instrumental performances celebrating the power of music.",
  },
  {
    number: "04",
    title: "Fine Arts",
    description:
      "Creative expression through drawing, painting and visual artistic forms.",
  },
  {
    number: "05",
    title: "Photography",
    description:
      "Moments, perspectives and stories captured through the lens.",
  },
];

/* =========================================================
   WINNERS
   Replace the placeholder names with actual winners.
========================================================= */

const winners = [
  {
    category: "Dance",
    first: "Winner Name",
    second: "Runner-up Name",
    third: "Second Runner-up",
  },
  {
    category: "Dramatics",
    first: "Winner Name",
    second: "Runner-up Name",
    third: "Second Runner-up",
  },
  {
    category: "Music",
    first: "Winner Name",
    second: "Runner-up Name",
    third: "Second Runner-up",
  },
  {
    category: "Fine Arts",
    first: "Winner Name",
    second: "Runner-up Name",
    third: "Second Runner-up",
  },
  {
    category: "Photography",
    first: "Winner Name",
    second: "Runner-up Name",
    third: "Second Runner-up",
  },
];

/* =========================================================
   GALLERY
========================================================= */

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85",
    alt: "Cultural event performance",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    alt: "Festival crowd",
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
    alt: "Live performance",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    alt: "Cultural celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=85",
    alt: "Stage performance",
  },
];

export default function Heats25() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#2B0A12] text-[#F7EBD0]">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791239257/WhatsApp_Image_2026-10-06_at_3.53.31_AM.png"
            alt="HEATS '25"
            className="h-full w-full object-cover"
          />


          

          
        </div>

        <div className="relative z-10 flex min-h-screen items-end px-5 pb-14 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[1500px]"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-4"
            >
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#D9B86C] sm:text-[10px]">
                Cultural Sub Council
              </span>

              <span className="h-px w-10 bg-[#C6A15B]/60" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#F7EBD0]/55 sm:text-[10px]">
                Event 02
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="
                max-w-[1200px]
                text-[clamp(4.5rem,12vw,12rem)]
                font-semibold
                leading-[0.78]
                tracking-[-0.07em]
                text-[#F7EBD0]
              "
            >
              HEATS
              <span className="text-[#C6A15B]">'25</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#D9B86C] sm:text-sm">
                Cultural Celebration
              </p>

              <span className="hidden h-px w-12 bg-[#C6A15B]/50 sm:block" />

              <p className="text-xs uppercase tracking-[0.25em] text-[#F7EBD0]/55">
                December 27 — 28, 2025
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-2xl
                text-sm
                leading-7
                text-[#F7EBD0]/65
                sm:text-base
                sm:leading-8
              "
            >
              A celebration of creativity, expression and the cultural spirit
              of the student community — bringing together performances,
              artists and voices on one stage.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-6 z-20 hidden items-center gap-3 lg:flex">
          <span className="text-[8px] uppercase tracking-[0.35em] text-[#F7EBD0]/45">
            Scroll to explore
          </span>

          <span className="h-10 w-px bg-[#C6A15B]/50" />
        </div>
      </section>

      {/* =========================================================
          ABOUT HEATS
          Inspired by the uploaded reference
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#F7EBD0] px-5 py-24 text-[#1D070D] sm:px-10 sm:py-32 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.4em]
                  text-[#A6531E]
                "
              >
                About HEATS
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="
                  mt-6
                  max-w-4xl
                  text-[clamp(2.8rem,5.5vw,6.5rem)]
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.06em]
                "
              >
                A celebration
                <br />
                of expression
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="
                  mt-8
                  max-w-3xl
                  text-base
                  leading-8
                  text-[#4D413A]
                  sm:text-lg
                  sm:leading-9
                "
              >
                HEATS '25 is a cultural platform created to bring students
                together through performance, creativity and artistic
                expression. It provides a space where students can discover
                their talents, collaborate with one another and share their
                work with the wider university community.
              </motion.p>

              {/* Category pills */}
              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap gap-3"
              >
                {[
                  "Dance",
                  "Dramatics",
                  "Music",
                  "Fine Arts",
                  "Photography",
                ].map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      border
                      border-[#C6A15B]/70
                      px-5
                      py-2.5
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#3A0D18]
                    "
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — STATS */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div
                variants={fadeUp}
                className="
                  flex
                  min-h-[170px]
                  flex-col
                  items-center
                  justify-center
                  border
                  border-[#C6A15B]/30
                  bg-white/35
                  p-6
                  text-center
                  shadow-[0_10px_40px_rgba(70,40,20,0.05)]
                "
              >
                <span className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  2
                </span>

                <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#6D625B]">
                  Days
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="
                  flex
                  min-h-[170px]
                  flex-col
                  items-center
                  justify-center
                  border
                  border-[#C6A15B]/30
                  bg-white/35
                  p-6
                  text-center
                  shadow-[0_10px_40px_rgba(70,40,20,0.05)]
                "
              >
                <span className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  5
                </span>

                <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#6D625B]">
                  Domains
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="
                  flex
                  min-h-[170px]
                  flex-col
                  items-center
                  justify-center
                  border
                  border-[#C6A15B]/30
                  bg-white/35
                  p-6
                  text-center
                  shadow-[0_10px_40px_rgba(70,40,20,0.05)]
                "
              >
                <span className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  2025
                </span>

                <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#6D625B]">
                  Edition
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="
                  flex
                  min-h-[170px]
                  flex-col
                  items-center
                  justify-center
                  border
                  border-[#C6A15B]/30
                  bg-white/35
                  p-6
                  text-center
                  shadow-[0_10px_40px_rgba(70,40,20,0.05)]
                "
              >
                <span className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  CULTURE
                </span>

                <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#6D625B]">
                  At the heart
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EVENT HIGHLIGHTS
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#F7EBD0] px-5 pb-28 text-[#1D070D] sm:px-10 sm:pb-36 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="pb-14 text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A6531E]">
              Event Highlights
            </p>

            <h2
              className="
                mt-5
                text-[clamp(2.7rem,5vw,5.5rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Designed for bold memories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-70px" }}
                variants={fadeUp}
                transition={{
                  delay: index * 0.06,
                }}
                className="
                  group
                  min-h-[280px]
                  border
                  border-[#C6A15B]/45
                  bg-[#F9F0DC]
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#C6A15B]
                  hover:shadow-[0_18px_50px_rgba(70,40,20,0.10)]
                  sm:p-8
                "
              >
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#A6531E]/60">
                  {item.number}
                </span>

                <h3 className="mt-12 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#5C514A]">
                  {item.description}
                </p>

                <div className="mt-7 h-px w-10 bg-[#C6A15B] transition-all duration-500 group-hover:w-16" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      {/* =========================================================
          GALLERY
      ========================================================= */}

      <section className="bg-[#2B0A12] px-3 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A15B]">
                The Archive
              </p>

              <h2 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#F7EBD0]">
                HEATS
                <span className="text-[#C6A15B]"> '25</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#D8C7AA]/55">
              Moments from a celebration shaped by creativity, collaboration
              and student expression.
            </p>
          </motion.div>

          <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="mb-3 break-inside-avoid overflow-hidden"
              >
                <div className="group relative overflow-hidden bg-[#3A0D18]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="
                      block
                      h-auto
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  <div className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-[#D9B86C]/70" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CLOSING
      ========================================================= */}

      <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-[#1D070D] px-5 py-24 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C6A15B]/10" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C6A15B]/10" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 mx-auto w-full max-w-[1100px] text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.45em] text-[#C6A15B]">
            HEATS '25
          </p>

          <h2
            className="
              mt-7
              text-[clamp(3.5rem,9vw,9rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.07em]
              text-[#F7EBD0]
            "
          >
            A celebration
            <br />
            <span className="text-[#C6A15B]">
              worth remembering.
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-xl text-sm leading-7 text-[#D8C7AA]/55 sm:text-base sm:leading-8">
            Every performance, every artwork and every voice became part of
            the HEATS '25 story.
          </p>

          <Link
            to="/events"
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-lg
              border
              border-[#C6A15B]/50
              px-6
              py-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#D9B86C]
              transition-all
              duration-500
              hover:border-[#D9B86C]
              hover:bg-[#C6A15B]
              hover:text-[#1D070D]
            "
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Events
          </Link>
        </motion.div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-[#C6A15B]/15 bg-[#1D070D] px-5 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#D8C7AA]/40">
            Cultural Sub Council
          </p>

          <Link
            to="/events"
            className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#D9B86C]"
          >
            All Events

            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </footer>
    </main>
  );
}