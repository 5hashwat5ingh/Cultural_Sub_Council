import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// =========================================================
// ANIMATION
// =========================================================

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

// =========================================================
// EVENT HIGHLIGHTS
// =========================================================

const highlights = [
  {
    number: "01",
    title: "Imagination",
    description:
      "Giving form to thoughts and feelings through colour, composition and visual storytelling."
  },

  {
    number: "02",
    title: "Colourscape",
    description:
      "Transforming plain pillars into vibrant canvases that command attention.",
  },

  {
    number: "03",
    title: "Storytelling",
    description:
      "Turning personal experiences and emotions into artworks that speak without words.",
  },

  {
    number: "04",
    title: "Transformation",
    description:
      "Reimagining everyday spaces and giving them a distinctive artistic identity.",
  },

  {
    number: "05",
    title: "Legacy",
    description:
      "Leaving behind a colourful imprint that preserves moments, memories and stories on campus.",
  },
];


// =========================================================
// GALLERY
// =========================================================

const galleryImages = [
  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279613/20260111_161151.jpg",
    alt: "Cultural event performance",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279135/20260111_150322.jpg",
    alt: "Festival crowd",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279088/20260111_143822.jpg",
    alt: "Live performance",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279051/20260111_144416.jpg",
    alt: "Cultural celebration",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791278986/20260111_150256.jpg",
    alt: "Stage performance",
  },
  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791278927/20260111_160931.jpg",
    alt: "Stage performance",
  },
];

// =========================================================
// PAGE
// =========================================================

export default function Pintura() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#DCD3A4] text-[#2B0A12]">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791240149/Untitled_design_6.png"
            alt="Pintura De Pilares"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-[#2B0A12]/30" />

        {/* Cinematic left gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D070D]/75 via-[#2B0A12]/30 to-transparent" />

        {/* Bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-[#DCD3A4] via-[#DCD3A4]/25 to-transparent" />

        {/* Gold glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/10 blur-[130px]" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-screen items-end px-6 pb-20 sm:px-12 sm:pb-24 lg:px-20 lg:pb-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-[1600px]"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-4"
            >
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#D9B86C] sm:text-[10px]">
                Cultural Sub Council
              </span>

              <span className="h-px w-10 bg-[#C6A15B]/70" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#F7EBD0]/60 sm:text-[10px]">
                Event 03
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="max-w-[1200px] text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.78] tracking-[-0.07em] text-[#F7EBD0]"
            >
              PINTURA
              <br />
              <span className="text-[#C6A15B]">DE PILARES.</span>
            </motion.h1>

            {/* Meta */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#D9B86C] sm:text-sm">
                Welcoming New Voices
              </p>

              <span className="hidden h-px w-10 bg-[#C6A15B]/50 sm:block" />

              <p className="text-xs uppercase tracking-[0.25em] text-[#F7EBD0]/60">
                December 27 — 28, 2025
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-sm leading-7 text-[#F7EBD0]/70 sm:text-base sm:leading-8"
            >
              A celebration of creativity, expression and the cultural spirit
              of the student community — bringing together performances,
              artists and voices on one stage.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 lg:flex">
          <span className="text-[8px] uppercase tracking-[0.35em] text-[#F7EBD0]/50">
            Scroll to explore
          </span>

          <span className="h-10 w-px bg-[#C6A15B]/50" />
        </div>
      </section>

      {/* =====================================================
          ABOUT PINTURA
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F5EFD0] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
        {/* Ambient decoration */}
        <div className="pointer-events-none absolute left-[-12%] top-[-10%] h-[450px] w-[450px] rounded-full bg-[#7A1B2F]/[0.07] blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/[0.10] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#7A1B2F]"
              >
                About Pintura
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-6 max-w-4xl text-[clamp(2.8rem,5.5vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#2B0A12]"
              >
                A celebration
                <br />
                <span className="text-[#7A1B2F]">of expression.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-3xl text-base leading-8 text-[#5A4A46] sm:text-lg sm:leading-9"
              >
                Pintura De Pilares is a cultural platform created to bring
                students together through performance, creativity and artistic
                expression. It provides a space where students can discover
                their talents, collaborate with one another and share their
                work with the wider university community.
              </motion.p>

              {/* Domains */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-2.5"
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
                    className="rounded-full border border-[#7A1B2F]/20 bg-[#DCD3A4]/30 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#3A0D18]"
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
              className="grid grid-cols-2 gap-3 self-center"
            >
              {[
                ["2", "Days"],
                ["5", "Domains"],
                ["2025", "Edition"],
                ["CULTURE", "At the heart"],
              ].map(([value, label], index) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="group flex min-h-[145px] flex-col items-center justify-center border border-[#7A1B2F]/10 bg-[#DCD3A4]/30 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#DCD3A4]/50"
                >
                  <span
                    className={`font-semibold tracking-[-0.05em] text-[#2B0A12] ${
                      index === 3
                        ? "text-2xl sm:text-3xl"
                        : "text-4xl sm:text-5xl"
                    }`}
                  >
                    {value}
                  </span>

                  <span className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#7A1B2F]/70">
                    {label}
                  </span>

                  <div className="mt-4 h-px w-8 bg-[#C6A15B] transition-all duration-500 group-hover:w-14" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVENT HIGHLIGHTS
      ===================================================== */}
 <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-28">

        <div className="pointer-events-none absolute right-[-10%] top-[5%] h-[450px] w-[450px] rounded-full bg-[#C6A15B]/[0.10] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-12"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#7A1B2F]">
              CULTURAL FEST
            </p>

            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#2B0A12]">
                Where talent
                <br />
                <span className="text-[#7A1B2F]">
                  takes the stage.
                </span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-[#5A4A46]">
                A celebration of creativity, talent and student expression,
                bringing the university community together through culture.
              </p>

            </div>
          </motion.div>


          {/* Cultural Fest Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {/* Imagination */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              variants={fadeUp}
              transition={{ delay: 0 }}
              className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
            >
              <div className="flex">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                  01
                </span>

                <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
              </div>

              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#2B0A12] sm:text-3xl">
                Imagination
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#5C514A]">
                Giving form to thoughts and feelings through colour, composition and visual storytelling.
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
            </motion.div>


            {/* Colourscape */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              variants={fadeUp}
              transition={{ delay: 0.06 }}
              className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                  02
                </span>

                <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
              </div>

              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#2B0A12] sm:text-3xl">
                Colourscape
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#5C514A]">
                Transforming plain pillars into vibrant canvases that command attention.
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
            </motion.div>


            {/* Storytelling */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              variants={fadeUp}
              transition={{ delay: 0.12 }}
              className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                  03
                </span>

                <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
              </div>

              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#2B0A12] sm:text-3xl">
                Storytelling
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#5C514A]">
                Turning personal experiences and emotions into artworks that speak without words.
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
            </motion.div>


            {/* Transformation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              variants={fadeUp}
              transition={{ delay: 0.18 }}
              className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
            >
              <div className="flex ">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                  04
                </span>

                <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
              </div>

              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#2B0A12] sm:text-3xl">
                Transformation
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#5C514A]">
                Reimagining everyday spaces and giving them a distinctive artistic identity.
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
            </motion.div>


            {/* Legacy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              variants={fadeUp}
              transition={{ delay: 0.24 }}
              className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                  05
                </span>

                <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
              </div>

              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#2B0A12] sm:text-3xl">
                Legacy
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#5C514A]">
                Leaving behind a colourful imprint that preserves moments, memories and stories on campus.
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
            </motion.div>

          </div>
        </div>
      </section>
      

      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-[-12%] top-[-10%] h-[450px] w-[450px] rounded-full bg-[#7A1B2F]/[0.07] blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-15%] right-[-8%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/[0.12] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[1600px]">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#7A1B2F]">
                The Archive
              </p>

              <h2 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#2B0A12]">
                PINTURA
                <span className="text-[#7A1B2F]"> '25</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#5A4A46]">
              Moments from a celebration shaped by creativity, collaboration
              and student expression.
            </p>
          </motion.div>

          {/* Masonry Gallery */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
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
                className="mb-4 break-inside-avoid overflow-hidden"
              >
                <div className="group relative overflow-hidden rounded-xl bg-[#F5EFD0]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </main>
  );
}