import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
/* =========================================================
   CLUB DATA
========================================================= */

const clubs = [
  {
    number: "01",
    name: "Dance Club",
    category: "MOVEMENT / PERFORMANCE",
    description:
      "A space where rhythm, movement and expression come together to create unforgettable performances.",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    path: "/clubs/dance",
  },

  {
    number: "02",
    name: "Dramatics Club",
    category: "THEATRE / STORYTELLING",
    description:
      "Exploring stories, characters and emotions through theatre, acting and stagecraft.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85",
    path: "/clubs/dramatics",
  },

  {
    number: "03",
    name: "Music Club",
    category: "MUSIC / PERFORMANCE",
    description:
      "From melodies to live performances, a platform for voices, instruments and musical expression.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85",
    path: "/clubs/music",
  },

  {
    number: "04",
    name: "Fine Arts Club",
    category: "ART / CREATIVITY",
    description:
      "A canvas for imagination, bringing ideas to life through colours, forms and visual expression.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85",
    path: "/clubs/fine-arts",
  },

  

  {
    number: "05",
    name: "Technical & Photography Club",
    category: "VISUALS / STORYTELLING / DESIGN / TECHNOLOGY",
    description:
      "Where creativity meets technology through design, digital experiences and visual communication.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    path: "/clubs/technical-design",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
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

/* =========================================================
   CLUBS PAGE
========================================================= */

export default function ClubsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#2B0A12] text-[#F7EBD0]">
<Navbar />
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Main maroon glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-200px]
            h-[650px]
            w-[850px]
            -translate-x-1/2
            rounded-full
            bg-[#7A1B2F]/25
            blur-[150px]
          "
        />

        {/* Gold glow */}
        <div
          className="
            absolute
            right-[-200px]
            top-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/8
            blur-[150px]
          "
        />

        {/* Bottom maroon glow */}
        <div
          className="
            absolute
            bottom-[-250px]
            left-[-200px]
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#7A1B2F]/20
            blur-[150px]
          "
        />

      </div>


      {/* =====================================================
          HERO / PAGE HEADER
      ===================================================== */}

      <section
        className="
          relative
          px-6
          pb-20
          pt-36
          sm:px-12
          sm:pt-44
          lg:px-20
          lg:pb-28
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* Eyebrow */}

          <motion.div
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 flex items-center gap-4"
          >
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#C6A15B]
                sm:text-xs
              "
            >
              Cultural Sub Council
            </span>

            <span className="h-px w-12 bg-[#C6A15B]/40" />
          </motion.div>


          {/* Main heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-6xl
              text-[clamp(4rem,9vw,9rem)]
              font-semibold
              leading-[0.84]
              tracking-[-0.065em]
              text-[#F7EBD0]
            "
          >
            Where
            <br />

            <span className="text-[#C6A15B]">
              Creativity Lives.
            </span>
          </motion.h1>


          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-10
              max-w-xl
              text-sm
              leading-7
              text-[#D8C7AA]/70
              sm:text-base
            "
          >
            Explore the creative communities that bring
            talent, expression and culture to life across
            our campus.
          </motion.p>


          {/* Small gold accent */}

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
            className="mt-12 h-px bg-[#C6A15B]"
          />

        </div>
      </section>


      {/* =====================================================
          CLUB LIST
      ===================================================== */}

      <section className="px-6 pb-32 sm:px-12 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="border-t border-[#C6A15B]/20"
          >

            {clubs.map((club) => (

              <motion.div
                key={club.name}
                variants={itemVariants}
                className="group border-b border-[#C6A15B]/20"
              >

                <Link
                  to={club.path}
                  aria-label={`Explore ${club.name}`}
                  className="
                    relative
                    flex
                    min-h-[220px]
                    flex-col
                    gap-8
                    py-10
                    transition-all
                    duration-500
                    sm:py-14
                    lg:min-h-[260px]
                    lg:flex-row
                    lg:items-center
                    lg:gap-12
                  "
                >

                  {/* =================================================
                      HOVER BACKGROUND
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      top-0
                      bottom-0
                      -z-10
                      bg-[#3A0D18]
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />


                  {/* =================================================
                      NUMBER
                  ================================================= */}

                  <div
                    className="
                      relative
                      w-8
                      shrink-0
                    "
                  >

                    <span
                      className="
                        text-[10px]
                        tracking-[0.2em]
                        text-[#C6A15B]/50
                        transition-colors
                        duration-500
                        group-hover:text-[#C6A15B]
                      "
                    >
                      {club.number}
                    </span>

                  </div>


                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div
                    className="
                      relative
                      h-[200px]
                      w-full
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#C6A15B]/15
                      bg-[#1D070D]
                      sm:h-[250px]
                      lg:h-[180px]
                      lg:w-[300px]
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
                        grayscale
                        transition-all
                        duration-700
                        group-hover:scale-110
                        group-hover:grayscale-0
                      "
                    />


                    {/* Maroon image overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#2B0A12]/40
                        transition-opacity
                        duration-700
                        group-hover:opacity-10
                      "
                    />


                    {/* Gold corner */}

                    <div
                      className="
                        absolute
                        bottom-3
                        left-3
                        h-6
                        w-6
                        border-b
                        border-l
                        border-[#C6A15B]/70
                        transition-all
                        duration-500
                        group-hover:h-9
                        group-hover:w-9
                        group-hover:border-[#D9B86C]
                      "
                    />


                    {/* Top-right gold corner */}

                    <div
                      className="
                        absolute
                        right-3
                        top-3
                        h-5
                        w-5
                        border-r
                        border-t
                        border-[#C6A15B]/40
                        opacity-0
                        transition-all
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                  </div>


                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="flex-1">

                    {/* Category */}

                    <p
                      className="
                        mb-3
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-[#C6A15B]/65
                        transition-colors
                        duration-500
                        group-hover:text-[#D9B86C]
                      "
                    >
                      {club.category}
                    </p>


                    {/* Club name */}

                    <h2
                      className="
                        text-3xl
                        font-medium
                        tracking-[-0.04em]
                        text-[#F7EBD0]
                        transition-all
                        duration-500
                        group-hover:translate-x-2
                        group-hover:text-[#D9B86C]
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      {club.name}
                    </h2>


                    {/* Description */}

                    <p
                      className="
                        mt-4
                        max-w-xl
                        text-sm
                        leading-6
                        text-[#D8C7AA]/60
                        transition-colors
                        duration-500
                        group-hover:text-[#D8C7AA]/85
                      "
                    >
                      {club.description}
                    </p>

                  </div>


                  {/* =================================================
                      ARROW
                  ================================================= */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#C6A15B]/25
                      text-lg
                      text-[#C6A15B]/60
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
          BOTTOM ACCENT
      ===================================================== */}

      
      <footer
              id="contact"
              className="
                relative
                z-20
                m-0
                w-full
                border-t
                border-[#C9A24D]/20
                bg-[#1D070D]
                px-6
                py-16
                sm:px-12
                sm:py-20
                lg:px-20
                lg:py-24
              "
            >
      
              <div
                className="
                  mx-auto
                  flex
                  max-w-7xl
                  flex-col
                  items-start
                  justify-between
                  gap-10
                  md:flex-row
                  md:items-end
                "
              >
      
                {/* Footer Brand */}
      
                <div>
      
                  <div className="mb-3 flex items-center gap-3">
      
                    <span className="h-2 w-2 rotate-45 bg-[#C9A24D]" />
      
                    <span
                      className="
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        text-[#C9A24D]
                      "
                    >
                      Get in Touch
                    </span>
      
                  </div>
      
                  <p
                    className="
                      text-2xl
                      font-medium
                      tracking-tight
                      text-[#F7EBD0]
                      sm:text-4xl
                    "
                  >
                    Cultural Sub Council
                  </p>
      
                </div>
      
                {/* Footer Links */}
      
                <div
                  className="
                    flex
                    flex-col
                    gap-8
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#D8C7AA]
                    sm:flex-row
                    sm:gap-12
                  "
                >
      
                  <a
                    href="#work"
                    className="
                      transition-colors
                      duration-300
                      hover:text-[#C6A15B]
                    "
                  >
                    Clubs
                  </a>
      
                  <a
                    href="#manifesto"
                    className="
                      transition-colors
                      duration-300
                      hover:text-[#C9A24D]
                    "
                  >
                    About
                  </a>
      
                  <a
                    href="#contact"
                    className="
                      transition-colors
                      duration-300
                      hover:text-[#C9A24D]
                    "
                  >
                    Contact
                  </a>
      
                  <span className="text-[#8F7663]">
                    © {new Date().getFullYear()} Cultural Sub Council
                  </span>
      
                </div>
      
              </div>
      
            </footer>
      

    </main>
  );
}