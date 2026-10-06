import React from "react";
import { motion } from "framer-motion";
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
// PILLAR PAINTING HIGHLIGHTS
// =========================================================

const highlights = [
  {
    number: "01",
    title: "Imagination",
    description:
      "Giving form to thoughts and feelings through colour, composition and visual storytelling.",
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
    alt: "Pillar painting and cultural artwork",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279135/20260111_150322.jpg",
    alt: "Students participating in pillar painting",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279088/20260111_143822.jpg",
    alt: "Pillar painting competition",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791279051/20260111_144416.jpg",
    alt: "Creative painting activity",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791278986/20260111_150256.jpg",
    alt: "Students creating artwork",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791278927/20260111_160931.jpg",
    alt: "Completed pillar artwork",
  },
];

// =========================================================
// PAGE
// =========================================================

export default function Pintura() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#DCD3A4] text-[#2B0A12]">
      <Navbar Gallery/>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791240149/Untitled_design_6.png"
            alt="Pintura De Pilares"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-[#2B0A12]/30" />

        {/* Cinematic Left Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D070D]/75 via-[#2B0A12]/30 to-transparent" />

        {/* Bottom Transition */}
        <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-[#DCD3A4] via-[#DCD3A4]/25 to-transparent" />

        {/* Gold Glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/10 blur-[130px]" />

        {/* Hero Content */}
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
           

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-sm leading-7 text-[#F7EBD0]/70 sm:text-base sm:leading-8"
            >
              Where emotions find colour, memories find a canvas,
and every pillar becomes a story.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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
        {/* Ambient Decoration */}
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
                About Pintura De Pilares
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
                Pintura de Pilares is a distinctive artistic celebration where students transform ordinary pillars into vivid expressions of emotion, imagination, and memory. Through colours and creative strokes, each participant translates a personal feeling, thought, or experience onto a shared canvas, giving the campus a visual language of its own.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-3xl text-base leading-8 text-[#5A4A46] sm:text-lg sm:leading-9"
              >
               More than an art event, Pintura de Pilares is a way of leaving a piece of oneself behind. Every painted pillar becomes a lasting fragment of a moment lived, an emotion felt, and a memory captured, turning the campus into a gallery of stories that continue to speak long after the colours dry.
              </motion.p>

              {/* Domains */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-2.5"
              >
                {[
                  "Painting",
                  "Visual Arts",
                  "Creativity",
                  "Storytelling",
                  "Campus Art",
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
                ["35+", "Pillars"],
                ["2025", "Edition"],
                ["50+", "Pièce de résistance"],
              ].map(([value, label], index) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="group flex min-h-[145px] flex-col items-center justify-center border border-[#7A1B2F]/10 bg-[#DCD3A4]/30 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#DCD3A4]/50"
                >
                  <span
                    className={`font-semibold tracking-[-0.05em] text-[#2B0A12] ${
                      index === 4
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
        {/* Ambient Glow */}
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
              PILLAR PAINTING COMPETITION
            </p>

            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#2B0A12]">
                Painted for
                <br />
                <span className="text-[#7A1B2F]">
                  bold memories.
                </span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-[#5A4A46]">
                A creative celebration where blank pillars become vibrant
                canvases through imagination, colour, storytelling and
                artistic expression.
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
                className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
              >
                {/* Top */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                    {item.number}
                  </span>

                  <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
                </div>

                {/* Content */}
                <div className="">
                  <h3 className="min-h-[50px]  mt-[19px] text-[23px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#2B0A12]">
                    {item.title}
                  </h3>

                  <p className="mt-0.5 text-sm leading-7 text-[#5C514A]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
        {/* Ambient Glows */}
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
          CLOSING
      ===================================================== */}

      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#1D070D] px-6 py-20 sm:px-12 lg:px-20">
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[550px] w-[550px] rounded-full bg-[#7A1B2F]/20 blur-[140px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B]"
            >
              PINTURA '25
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.06em] text-[#F7EBD0]"
            >
              A celebration
              <br />
              <span className="text-[#C6A15B]">
                worth remembering.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-sm leading-7 text-[#F7EBD0]/60 sm:text-base sm:leading-8"
            >
              Every colour, every stroke and every painted pillar became part
              of the Pintura '25 story — leaving behind a visual memory of
              creativity across campus.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                to="/events"
                className="inline-flex items-center rounded-full border border-[#C6A15B]/40 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F7EBD0] transition-all duration-300 hover:border-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#1D070D]"
              >
                Back to Events
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </main>
  );
}