import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// =========================================================
// CLUB DATA
// =========================================================

const clubs = [
  {
    number: "01",
    name: "Dance Club",
    category: "MOVEMENT / PERFORMANCE",
    description:
      "A space where rhythm, movement and expression come together to create unforgettable performances.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791236623/WhatsApp_Image_2026-10-06_at_2.17.13_AM.jpg",
    path: "/clubs/dance",
  },

  {
    number: "02",
    name: "Dramatics Club",
    category: "THEATRE / STORYTELLING",
    description:
      "Exploring stories, characters and emotions through theatre, acting and stagecraft.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237165/WhatsApp_Image_2026-10-06_at_3.21.39_AM.jpg",
    path: "/clubs/dramatics",
  },

  {
    number: "03",
    name: "Music Club",
    category: "MUSIC / PERFORMANCE",
    description:
      "From melodies to live performances, a platform for voices, instruments and musical expression.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237274/WhatsApp_Image_2026-10-06_at_3.23.09_AM.jpg",
    path: "/clubs/music",
  },

  {
    number: "04",
    name: "Fine Arts Club",
    category: "ART / CREATIVITY",
    description:
      "A canvas for imagination, bringing ideas to life through colours, forms and visual expression.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791236837/WhatsApp_Image_2026-10-06_at_3.16.20_AM.jpg",
    path: "/clubs/fine-arts",
  },

  {
    number: "05",
    name: "Technical & Photography Club",
    category: "VISUALS / STORYTELLING / DESIGN / TECHNOLOGY",
    description:
      "Where creativity meets technology through design, digital experiences and visual communication.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237315/WhatsApp_Image_2026-10-06_at_3.24.43_AM.jpg",
    path: "/clubs/technical-design",
  },
];

// =========================================================
// ANIMATION
// =========================================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
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
// CLUBS PAGE
// =========================================================

export default function ClubsPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#DCD3A4] text-[#2B0A12]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar Gallery />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* Hero Image */}

        <div className="absolute inset-0">

          <img
            src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791232371/Untitled_design_4.png"
            alt="Cultural Sub Council"
            className="
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* Soft image overlay */}

          <div className="absolute inset-0 bg-[#2B0A12]/25" />

        </div>

        {/* Hero Content */}

        <div className="
          relative
          z-10
          flex
          min-h-screen
          items-end
          px-5
          pb-20
          sm:px-10
          sm:pb-24
          lg:px-16
          lg:pb-28
        ">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full max-w-[1500px]"
          >

            {/* Eyebrow */}

            <motion.div
              variants={fadeUp}
              className="mb-7 flex items-center gap-4"
            >
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-[#F7EBD0]
                  sm:text-[10px]
                "
              >
                Cultural Sub Council
              </span>

              <span className="h-px w-10 bg-[#D9B86C]" />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-[#F7EBD0]/70
                  sm:text-[10px]
                "
              >
                Clubs
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={fadeUp}
              className="
                max-w-[1200px]
                text-[clamp(4rem,11vw,11rem)]
                font-semibold
                leading-[0.78]
                tracking-[-0.07em]
                text-[#F7EBD0]
              "
            >
              Where
              <br />

              <span className="text-[#D9B86C]">
                Creativity Lives.
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-2xl
                text-sm
                leading-7
                text-[#F7EBD0]/80
                sm:text-base
                sm:leading-8
              "
            >
              Different passions, one stage, countless stories.
Meet the clubs that shape the cultural heartbeat of MMMUT.
            </motion.p>

            {/* Gold line */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 80,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 h-px bg-[#D9B86C]"
            />

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#DCD3A4]
          px-5
          py-24
          sm:px-10
          sm:py-28
          lg:px-16
          lg:py-32
        "
      >

        {/* Ambient glows */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-12%]
            top-[-8%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#7A1B2F]/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-12%]
            top-[20%]
            h-[460px]
            w-[460px]
            rounded-full
            bg-[#8B1E3F]/7
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-15%]
            right-[-5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/14
            blur-[120px]
          "
        />

        <div className="relative mx-auto max-w-[1500px]">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={stagger}
            className="
              grid
              gap-12
              lg:grid-cols-[1.15fr_0.85fr]
              lg:gap-24
              lg:items-end
            "
          >

            {/* Left */}

            <div>

              <motion.p
                variants={fadeUp}
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.4em]
                  text-[#7A1B2F]
                "
              >
                Our Creative Communities
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="
                  mt-6
                  max-w-5xl
                  text-[clamp(3rem,6vw,7rem)]
                  font-semibold
                  leading-[0.88]
                  tracking-[-0.06em]
                  text-[#2B0A12]
                "
              >
                Five spaces.
                <br />

                <span className="text-[#7A1B2F]">
                  One expression.
                </span>
              </motion.h2>

            </div>

            {/* Right */}

            <motion.div
              variants={fadeUp}
              className="max-w-xl lg:pb-2"
            >

              <p
                className="
                  text-base
                  leading-8
                  text-[#4D413A]
                  sm:text-lg
                  sm:leading-9
                "
              >
                Every club is a space to discover talent,
                experiment with ideas and create something
                meaningful. From performance and music to
                visual arts, photography and technology,
                there is a place for every expression.
              </p>

              <div className="mt-8 h-px w-16 bg-[#C6A15B]" />

            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          CLUB LIST
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#DCD3A4]
          px-5
          pb-28
          sm:px-10
          sm:pb-36
          lg:px-16
        "
      >

        <div className="mx-auto max-w-[1500px]">

          {/* Section heading */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={stagger}
            className="mb-12"
          >

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4"
            >

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#7A1B2F]
                "
              >
                Explore
              </span>

              <span className="h-px w-12 bg-[#C6A15B]" />

            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="
                mt-5
                text-[clamp(3rem,5.5vw,6rem)]
                font-semibold
                leading-[0.88]
                tracking-[-0.06em]
                text-[#2B0A12]
              "
            >
              Find your stage.
            </motion.h2>

          </motion.div>

          {/* Club list */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.05,
            }}
            className="
              border-t
              border-[#7A1B2F]/20
            "
          >

            {clubs.map((club, index) => (

              <motion.div
                key={club.name}
                variants={fadeUp}
                className="
                  group
                  border-b
                  border-[#7A1B2F]/20
                "
              >

                <Link
                  to={club.path}
                  aria-label={`Explore ${club.name}`}
                  className="
                    relative
                    grid
                    gap-7
                    py-8
                    sm:py-10
                    lg:grid-cols-[60px_320px_1fr_55px]
                    lg:items-center
                    lg:gap-10
                    lg:py-8
                  "
                >

                  {/* Number */}

                  <div className="hidden lg:block">

                    <span
                      className="
                        text-[10px]
                        tracking-[0.2em]
                        text-[#7A1B2F]/50
                        transition-colors
                        duration-500
                        group-hover:text-[#7A1B2F]
                      "
                    >
                      {club.number}
                    </span>

                  </div>

                  {/* Image */}

                  <div
                    className="
                      relative
                      h-[220px]
                      w-full
                      overflow-hidden
                      sm:h-[280px]
                      lg:h-[190px]
                    "
                  >

                    <img
                      src={club.image}
                      alt={club.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-1000
                        ease-[0.22,1,0.36,1]
                        group-hover:scale-105
                      "
                    />

                    {/* Soft image overlay */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[#2B0A12]/10
                        transition-opacity
                        duration-700
                        group-hover:opacity-0
                      "
                    />

                    {/* Gold corner */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-3
                        left-3
                        h-7
                        w-7
                        border-b
                        border-l
                        border-[#D9B86C]
                        transition-all
                        duration-500
                        group-hover:h-10
                        group-hover:w-10
                      "
                    />

                  </div>

                  {/* Content */}

                  <div className="min-w-0">

                    <div className="flex items-center gap-3">

                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
                          text-[#7A1B2F]/65
                          transition-colors
                          duration-500
                          group-hover:text-[#7A1B2F]
                        "
                      >
                        {club.category}
                      </span>

                      <span className="h-px w-8 bg-[#C6A15B]/50" />

                    </div>

                    <h3
                      className="
                        mt-3
                        text-[clamp(2rem,4vw,4rem)]
                        font-semibold
                        leading-[0.95]
                        tracking-[-0.05em]
                        text-[#2B0A12]
                        transition-all
                        duration-500
                        group-hover:translate-x-2
                        group-hover:text-[#7A1B2F]
                      "
                    >
                      {club.name}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-7
                        text-[#5C514A]
                        sm:text-base
                      "
                    >
                      {club.description}
                    </p>

                  </div>

                  {/* Arrow */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#7A1B2F]/25
                      text-xl
                      text-[#7A1B2F]
                      transition-all
                      duration-500
                      group-hover:border-[#C6A15B]
                      group-hover:bg-[#C6A15B]
                      group-hover:text-[#2B0A12]
                    "
                  >

                    <span
                      className="
                        inline-block
                        transition-transform
                        duration-500
                        group-hover:rotate-45
                      "
                    >
                      ↗
                    </span>

                  </div>

                </Link>

              </motion.div>

            ))}

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#2B0A12]
          px-5
          py-28
          sm:px-10
          sm:py-36
          lg:px-16
        "
      >

        {/* Ambient gold glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#C6A15B]/7
            blur-[140px]
          "
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={fadeUp}
          className="
            relative
            z-10
            mx-auto
            max-w-[1200px]
            text-center
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.45em]
              text-[#C6A15B]
            "
          >
            Cultural Sub Council
          </p>

          <h2
            className="
              mt-7
              text-[clamp(3.5rem,8vw,8rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.07em]
              text-[#F7EBD0]
            "
          >
            Find your
            <br />

            <span className="text-[#C6A15B]">
              expression.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-xl
              text-sm
              leading-7
              text-[#D8C7AA]/65
              sm:text-base
              sm:leading-8
            "
          >
            Discover a community where your creativity,
            passion and ideas can become part of something
            bigger.
          </p>

          <Link
            to="/"
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
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
            Back to Home

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </Link>

        </motion.div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </main>
  );
}