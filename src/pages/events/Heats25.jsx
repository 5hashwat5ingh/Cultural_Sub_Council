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
    title: "Exploration",
    description:
      "A vibrant space for freshmen to discover their passions, talents and creative potential.",
  },

  {
    number: "02",
    title: "Expression",
    description:
      "Transforming individuality and imagination into captivating forms of artistic expression.",
  },

  {
    number: "03",
    title: "Showcase",
    description:
      "A platform to step forward, take the spotlight and let your talent speak for itself.",
  },

  {
    number: "04",
    title: "Collaboration",
    description:
      "Creating connections, fostering camaraderie and bringing diverse talents together.",
  },

  {
    number: "05",
    title: " Belonging",
    description:
      "The beginning of new journeys, new friendships and becoming part of the cultural community.",
  },
];

// =========================================================
// GALLERY
// =========================================================

const galleryImages = [
  {
    src: " https://res.cloudinary.com/ttlzk1ac/image/upload/v1791281467/3.jpg",
    alt: "Cultural event performance",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791281933/6.jpg",
    alt: "Festival crowd",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791281467/4.jpg",
    alt: "Live performance",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791281467/1.jpg",
    alt: "Cultural celebration",
  },

  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791281467/2.jpg",
    alt: "Stage performance",
  },
  {
    src: "https://res.cloudinary.com/ttlzk1ac/image/upload/v1791281467/5.jpg",
    alt: "Stage performance",
  },
];

// =========================================================
// PAGE
// =========================================================

export default function Heats25() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#DCD3A4] text-[#2B0A12]">
      <Navbar Gallery/>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791239257/WhatsApp_Image_2026-10-06_at_3.53.31_AM.png"
            alt="HEATS '25"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-[#2B0A12]/30" />

        {/* Left cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D070D]/75 via-[#2B0A12]/30 to-transparent" />

        {/* Bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#DCD3A4] via-[#DCD3A4]/25 to-transparent" />

        {/* Gold glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/10 blur-[130px]" />

        {/* Content */}
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
                Event 02
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="max-w-[1200px] text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-[#F7EBD0]"
            >
              HEATS
              <span className="text-[#C6A15B]">'25</span>
            </motion.h1>

            {/* Meta */}
           

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-sm leading-7 text-[#F7EBD0]/70 sm:text-base sm:leading-8"
            >
              Where fresh faces find their stage, hidden talents find their voice every beginning becomes a part of something bigger.
            </motion.p>
          </motion.div>
        </div>

       
      </section>

      {/* =====================================================
          ABOUT HEATS
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
                About HEATS
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
                HEATS is the vibrant cultural initiation of MMMUT, where freshmen come together to showcase their talents across music, dance, dramatics, fine arts, photography, and more. It offers every newcomer an opportunity to step into the spotlight, explore their creative potential, and discover the art form that resonates with them.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-3 max-w-3xl text-base leading-8 text-[#5A4A46] sm:text-lg sm:leading-9"
              >
                More than a showcase, HEATS marks the beginning of their cultural journey at MMMUT. Through their performances and participation, students find their creative communities and become an integral part of the university’s various cultural clubs, turning their first stage into the beginning of countless stories.
              </motion.p>

             
            </motion.div>

            {/* RIGHT — STATS */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="grid grid-cols-2 gap-3"
            >
              {[
                ["2", "Days"],
                ["5", "Domains"],
                ["2025", "Edition"],
                ["700+", "Footfalls"],
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
              Event Highlights
            </p>

            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#2B0A12]">
                Designed for
                <br />
                <span className="text-[#7A1B2F]">bold memories.</span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-[#5A4A46]">
                Five creative domains brought together through one cultural
                celebration.
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
                className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:bg-[#F5EFD0]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold tracking-[0.25em] text-[#7A1B2F]/60">
                    {item.number}
                  </span>

                  <span className="h-px w-7 bg-[#C6A15B]/70 transition-all duration-500 group-hover:w-12" />
                </div>

                <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-[#2B0A12] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#5C514A]">
                  {item.description}
                </p>

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
                HEATS
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

      
      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </main>
  );
}