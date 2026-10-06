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
// ANIMATIONS
// =========================================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// =========================================================
// CLUBS PAGE
// =========================================================

export default function ClubsPage() {
  const heroImage =
    "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791232371/Untitled_design_4.png";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#DCD3A4] text-[#2B0A12]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar Gallery />

      {/* =====================================================
          HERO
          
          IMPORTANT:
          Height is now determined by the actual image.
          This prevents cropping and removes vacant space.
      ===================================================== */}

      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-[#2B0A12]
        "
      >
        {/* =================================================
            FULL ORIGINAL IMAGE

            h-auto + w-full means the complete image is
            displayed using its natural aspect ratio.
        ================================================= */}

        <img
          src={heroImage}
          alt="Cultural Sub Council"
          className="
            block
            h-auto
            w-full
            object-contain
          "
        />

        {/* =================================================
            DARK CINEMATIC OVERLAY
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#2B0A12]/20
          "
        />

        {/* =================================================
            TOP GRADIENT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-24
            bg-gradient-to-b
            from-[#1D070D]/65
            to-transparent
            sm:h-32
            md:h-40
          "
        />

        {/* =================================================
            BOTTOM GRADIENT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-28
            bg-gradient-to-t
            from-[#1D070D]/65
            via-[#1D070D]/20
            to-transparent
            sm:h-36
            md:h-44
          "
        />

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-5
            sm:px-8
            md:px-10
            lg:px-12
            xl:px-16
          "
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="
              w-full
              max-w-[1250px]
              text-center
            "
          >
            {/* =================================================
                EYEBROW
            ================================================= */}

            <motion.div
              variants={fadeUp}
              className="
                mb-3
                flex
                items-center
                justify-center
                gap-3
                sm:mb-5
                sm:gap-4
              "
            >
              <span
                className="
                  h-px
                  w-5
                  bg-[#D9B86C]/80
                  sm:w-9
                  md:w-12
                "
              />

              <span
                className="
                  text-[6px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#F7EBD0]/90
                  sm:text-[8px]
                  sm:tracking-[0.38em]
                  md:text-[9px]
                "
              >
                Cultural Sub Council
              </span>

              <span
                className="
                  h-px
                  w-5
                  bg-[#D9B86C]/80
                  sm:w-9
                  md:w-12
                "
              />
            </motion.div>

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <motion.h1
              variants={fadeUp}
              className="
                mx-auto
                max-w-[1050px]
                text-[clamp(3rem,13vw,8.5rem)]
                font-semibold
                leading-[0.8]
                tracking-[-0.075em]
                text-[#F7EBD0]
                drop-shadow-[0_8px_30px_rgba(29,7,13,0.7)]
                sm:text-[clamp(3.8rem,10vw,8.5rem)]
                md:text-[clamp(4.5rem,8.5vw,9rem)]
              "
            >
              Where
              <br />

              <span className="text-[#D9B86C]">
                Creativity Lives.
              </span>
            </motion.h1>

            {/* =================================================
                GOLD LINE
            ================================================= */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 60,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mx-auto
                mt-4
                h-px
                bg-[#D9B86C]
                sm:mt-6
                md:mt-7
              "
            />

            {/* =================================================
                SUBTITLE
            ================================================= */}

            <motion.p
              variants={fadeUp}
              className="
                mx-auto
                mt-3
                max-w-[420px]
                text-[6px]
                uppercase
                leading-4
                tracking-[0.18em]
                text-[#F7EBD0]/65
                sm:mt-5
                sm:text-[8px]
                sm:leading-5
                sm:tracking-[0.25em]
                md:text-[9px]
              "
            >
              Five creative communities · One cultural identity
            </motion.p>
          </motion.div>
        </div>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-20
            -translate-x-1/2
            sm:bottom-5
            md:bottom-6
          "
        >
          <motion.div
            animate={{
              y: [0, 4, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="
                text-[5px]
                uppercase
                tracking-[0.3em]
                text-[#F7EBD0]/60
                sm:text-[6px]
              "
            >
              Scroll
            </span>

            <span
              className="
                block
                h-5
                w-px
                bg-gradient-to-b
                from-[#D9B86C]
                to-transparent
                sm:h-6
              "
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
          py-12
          sm:px-8
          sm:py-16
          md:px-10
          md:py-18
          lg:px-12
          xl:px-16
          xl:py-20
        "
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-15%]
            top-[-20%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[#7A1B2F]/10
            blur-[90px]
            sm:h-[380px]
            sm:w-[380px]
            sm:blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-20%]
            right-[-10%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#C6A15B]/10
            blur-[100px]
            sm:h-[420px]
            sm:w-[420px]
            sm:blur-[120px]
          "
        />

        <div className="relative mx-auto max-w-[1450px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
            className="
              grid
              items-end
              gap-7
              md:gap-9
              lg:grid-cols-[1.15fr_0.85fr]
              lg:gap-14
              xl:gap-20
            "
          >
            {/* Left */}

            <div>
              <motion.p
                variants={fadeUp}
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-[#7A1B2F]
                  sm:text-[9px]
                  sm:tracking-[0.4em]
                "
              >
                Our Creative Communities
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="
                  mt-3
                  max-w-4xl
                  text-[clamp(2.6rem,8vw,6rem)]
                  font-semibold
                  leading-[0.87]
                  tracking-[-0.065em]
                  text-[#2B0A12]
                  sm:mt-4
                  md:text-[clamp(3rem,6vw,5.8rem)]
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
              className="max-w-xl lg:pb-1"
            >
              <p
                className="
                  text-[12px]
                  leading-5
                  text-[#4D413A]
                  sm:text-sm
                  sm:leading-7
                  md:text-base
                  md:leading-8
                "
              >
                Every club is a space to discover talent,
                experiment with ideas and create something
                meaningful. From performance and music to
                visual arts, photography and technology,
                there is a place for every expression.
              </p>

              <div
                className="
                  mt-4
                  h-px
                  w-14
                  bg-[#C6A15B]
                  sm:mt-5
                  sm:w-16
                "
              />
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
          pb-14
          sm:px-8
          sm:pb-18
          md:px-10
          md:pb-20
          lg:px-12
          xl:px-16
          xl:pb-24
        "
      >
        <div className="mx-auto max-w-[1450px]">
          {/* Heading */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
            className="mb-6 sm:mb-8 md:mb-9"
          >
            <motion.p
              variants={fadeUp}
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#7A1B2F]
                sm:text-[9px]
              "
            >
              Explore The Clubs
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="
                mt-3
                text-[clamp(2.7rem,8vw,5.5rem)]
                font-semibold
                leading-[0.88]
                tracking-[-0.065em]
                text-[#2B0A12]
                sm:mt-4
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
              amount: 0.03,
            }}
            className="border-t border-[#7A1B2F]/20"
          >
            {clubs.map((club) => (
              <motion.div
                key={club.name}
                variants={fadeUp}
                className="group border-b border-[#7A1B2F]/20"
              >
                <Link
                  to={club.path}
                  aria-label={`Explore ${club.name}`}
                  className="
                    grid
                    gap-4
                    py-5
                    sm:gap-6
                    sm:py-7
                    md:py-8
                    lg:grid-cols-[230px_1fr_45px]
                    lg:items-center
                    lg:gap-7
                    xl:grid-cols-[55px_300px_1fr_48px]
                    xl:gap-8
                    xl:py-6
                  "
                >
                  {/* Number */}

                  <div className="hidden xl:block">
                    <span
                      className="
                        text-[9px]
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
                      h-[165px]
                      w-full
                      overflow-hidden
                      rounded-[5px]
                      sm:h-[210px]
                      md:h-[230px]
                      lg:h-[180px]
                      xl:h-[175px]
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

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#2B0A12]/25
                        via-transparent
                        to-transparent
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-3
                        left-3
                        h-6
                        w-6
                        border-b
                        border-l
                        border-[#D9B86C]
                        transition-all
                        duration-500
                        group-hover:h-9
                        group-hover:w-9
                      "
                    />
                  </div>

                  {/* Content */}

                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          text-[7px]
                          uppercase
                          tracking-[0.2em]
                          text-[#7A1B2F]/70
                          sm:text-[8px]
                          sm:tracking-[0.25em]
                        "
                      >
                        {club.category}
                      </span>

                      <span className="h-px w-5 bg-[#C6A15B]/60 sm:w-7" />
                    </div>

                    <h3
                      className="
                        mt-2
                        text-[clamp(1.75rem,7vw,3.7rem)]
                        font-semibold
                        leading-[0.92]
                        tracking-[-0.055em]
                        text-[#2B0A12]
                        transition-all
                        duration-500
                        group-hover:translate-x-1
                        group-hover:text-[#7A1B2F]
                        sm:mt-3
                        md:text-[clamp(2rem,5vw,3.7rem)]
                      "
                    >
                      {club.name}
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-2xl
                        text-[11px]
                        leading-5
                        text-[#5C514A]
                        sm:mt-3
                        sm:text-[13px]
                        sm:leading-6
                        md:text-sm
                      "
                    >
                      {club.description}
                    </p>
                  </div>

                  {/* Arrow */}

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      self-end
                      rounded-full
                      border
                      border-[#7A1B2F]/25
                      text-base
                      text-[#7A1B2F]
                      transition-all
                      duration-500
                      group-hover:border-[#C6A15B]
                      group-hover:bg-[#C6A15B]
                      group-hover:text-[#2B0A12]
                      sm:h-10
                      sm:w-10
                      md:h-11
                      md:w-11
                      lg:self-center
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
          py-14
          sm:px-8
          sm:py-18
          md:px-10
          md:py-20
          lg:px-12
          xl:px-16
          xl:py-24
        "
      >
        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#C6A15B]/7
            blur-[100px]
            sm:h-[400px]
            sm:w-[400px]
            sm:blur-[120px]
          "
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          className="
            relative
            z-10
            mx-auto
            max-w-[1000px]
            text-center
          "
        >
          <p
            className="
              text-[7px]
              uppercase
              tracking-[0.4em]
              text-[#C6A15B]
              sm:text-[8px]
              sm:tracking-[0.45em]
            "
          >
            Cultural Sub Council
          </p>

          <h2
            className="
              mt-4
              text-[clamp(3rem,13vw,7rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.075em]
              text-[#F7EBD0]
              sm:mt-5
              sm:text-[clamp(3.5rem,10vw,7rem)]
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
              mt-5
              max-w-lg
              text-[11px]
              leading-5
              text-[#D8C7AA]/65
              sm:mt-6
              sm:text-sm
              sm:leading-6
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
              mt-6
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#C6A15B]/50
              px-5
              py-2.5
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#D9B86C]
              transition-all
              duration-500
              hover:border-[#D9B86C]
              hover:bg-[#C6A15B]
              hover:text-[#1D070D]
              sm:mt-7
              sm:px-6
              sm:py-3
              sm:text-[8px]
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