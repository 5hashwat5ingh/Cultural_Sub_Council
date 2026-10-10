import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// ============================================================
// ANIMATIONS
// ============================================================

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

// ============================================================
// EVENT TEMPLATE
// ============================================================

export default function EventTemplate({ event }) {
  if (!event) {
    return null;
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#DCD3A4] text-[#2B0A12]">
      <Navbar Gallery/>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}

        <div className="absolute inset-0">
          <img
            src={event.hero.image}
            alt={event.hero.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Soft overlay */}

        <div className="absolute inset-0 bg-[#2B0A12]/30" />

        {/* Cinematic gradient */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#1D070D]/75 via-[#2B0A12]/30 to-transparent" />

        {/* Bottom transition */}

        <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#DCD3A4] via-[#DCD3A4]/25 to-transparent" />

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
                {event.hero.eyebrow}
              </span>

              <span className="h-px w-10 bg-[#C6A15B]/70" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#F7EBD0]/60 sm:text-[10px]">
                {event.hero.eventNumber}
              </span>
            </motion.div>

            {/* Title */}

            <motion.h1
              variants={fadeUp}
              className="max-w-[1400px] text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-[#F7EBD0]"
            >
              {event.hero.title}

              {event.hero.secondLine && (
                <>
                  <br />
                  <span className="text-[#C6A15B]">
                    {event.hero.secondLine}
                  </span>
                </>
              )}

              {!event.hero.secondLine && event.hero.year && (
                <span className="text-[#C6A15B]">
                  {event.hero.year}
                </span>
              )}
            </motion.h1>

            {/* Meta */}

            {(event.hero.meta || event.hero.date) && (
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
              >
                {event.hero.meta && (
                  <p className="text-xs uppercase tracking-[0.3em] text-[#D9B86C] sm:text-sm">
                    {event.hero.meta}
                  </p>
                )}

                {event.hero.meta && event.hero.date && (
                  <span className="hidden h-px w-10 bg-[#C6A15B]/50 sm:block" />
                )}

                {event.hero.date && (
                  <p className="text-xs uppercase tracking-[0.25em] text-[#F7EBD0]/60">
                    {event.hero.date}
                  </p>
                )}
              </motion.div>
            )}

            {/* Description */}

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-sm leading-7 text-[#F7EBD0]/70 sm:text-base sm:leading-8"
            >
              {event.hero.description}
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

      {/* ======================================================
          ABOUT
      ====================================================== */}

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
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#7A1B2F]"
              >
                {event.about.label}
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-6 max-w-4xl text-[clamp(2.8rem,5.5vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#2B0A12]"
              >
                {event.about.title}

                <br />

                <span className="text-[#7A1B2F]">
                  {event.about.accent}
                </span>
              </motion.h2>

              {event.about.paragraphs?.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className={
                    index === 0
                      ? "mt-8 max-w-3xl text-base leading-8 text-[#5A4A46] sm:text-lg sm:leading-9"
                      : "mt-3 max-w-3xl text-base leading-8 text-[#5A4A46] sm:text-lg sm:leading-9"
                  }
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Domains */}

              {event.about.domains?.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="mt-8 flex flex-wrap gap-2.5"
                >
                  {event.about.domains.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#7A1B2F]/20 bg-[#DCD3A4]/30 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#3A0D18]"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* RIGHT — STATS */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={stagger}
              className="grid grid-cols-2 gap-3 self-center"
            >
              {event.about.stats.map(([value, label], index) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="group flex min-h-[145px] flex-col items-center justify-center border border-[#7A1B2F]/10 bg-[#DCD3A4]/30 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#DCD3A4]/50"
                >
                  <span
                    className={`font-semibold tracking-[-0.05em] text-[#2B0A12] ${
                      index === event.about.stats.length - 1
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

      {/* ======================================================
          HIGHLIGHTS
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
        <div className="pointer-events-none absolute right-[-10%] top-[5%] h-[450px] w-[450px] rounded-full bg-[#C6A15B]/[0.10] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          {/* Header */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={fadeUp}
            className="mb-12"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#7A1B2F]">
              {event.highlights.label}
            </p>

            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#2B0A12]">
                {event.highlights.title}

                <br />

                <span className="text-[#7A1B2F]">
                  {event.highlights.accent}
                </span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-[#5A4A46]">
                {event.highlights.description}
              </p>
            </div>
          </motion.div>

          {/* Cards */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {event.highlights.items.map((item, index) => (
              <motion.div
                key={item.number}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: "-70px",
                }}
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

                <div className="mt-14">
                  <h3 className="min-h-[50px] text-[23px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#2B0A12]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#5C514A]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent */}

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          GALLERY
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
        {/* Ambient glows */}

        <div className="pointer-events-none absolute left-[-12%] top-[-10%] h-[450px] w-[450px] rounded-full bg-[#7A1B2F]/[0.07] blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-15%] right-[-8%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/[0.12] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[1600px]">
          {/* Header */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={fadeUp}
            className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#7A1B2F]">
                {event.gallery.label}
              </p>

              <h2 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#2B0A12]">
                {event.gallery.title}

                <span className="text-[#7A1B2F]">
                  {" "}
                  {event.gallery.year}
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#5A4A46]">
              {event.gallery.description}
            </p>
          </motion.div>

          {/* Masonry */}

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {event.gallery.images.map((image, index) => (
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

      {/* ======================================================
          CLOSING
      ====================================================== */}

      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#1D070D] px-6 py-20 sm:px-12 lg:px-20">
        {/* Decorative glow */}

        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[550px] w-[550px] rounded-full bg-[#7A1B2F]/20 blur-[140px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] uppercase tracking-[0.4em] text-[#C6A15B]"
            >
              {event.closing.label}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.06em] text-[#F7EBD0]"
            >
              {event.closing.title}

              <br />

              <span className="text-[#C6A15B]">
                {event.closing.accent}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-sm leading-7 text-[#F7EBD0]/60 sm:text-base sm:leading-8"
            >
              {event.closing.description}
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

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </main>
  );
}