import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
/* =========================================================
   FACULTY MESSAGES
========================================================= */

const facultyMessages = [
  {
    name: "Faculty Name",
    designation: "Faculty In-Charge, Music Club",
    image: "/faculty/music-faculty.jpg",
    message:
      "Music has the power to bring people together beyond words. The Music Club provides students with a platform to discover their musical abilities, develop confidence and share their passion with the campus community.",
  },
  {
    name: "Faculty Name",
    designation: "Faculty Coordinator",
    image: "/faculty/music-coordinator.jpg",
    message:
      "Every voice has its own character and every instrument tells its own story. The Music Club encourages students to learn, experiment and perform while creating a vibrant musical culture across the campus.",
  },
];

/* =========================================================
   ACTIVITIES
========================================================= */

const activities = [
  {
    number: "01",
    title: "Live Performances",
    description:
      "From campus celebrations to major cultural events, the club creates memorable experiences through vocal and instrumental performances.",
  },
  {
    number: "02",
    title: "Vocals & Instruments",
    description:
      "Students explore singing and instrumental music while developing technique, musicality and confidence through regular practice.",
  },
  {
    number: "03",
    title: "Jam Sessions",
    description:
      "Collaborative sessions give musicians a space to experiment, improvise and create music together in an open creative environment.",
  },
  {
    number: "04",
    title: "Competitions",
    description:
      "The club provides opportunities for students to represent the institution in solo, group and instrumental music competitions.",
  },
];

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievements = [
  {
    number: "01",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Add a verified achievement, competition result or recognition of the Music Club here.",
  },
  {
    number: "02",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Add another verified milestone, award or major musical performance here.",
  },
  {
    number: "03",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Highlight another important accomplishment of the club.",
  },
];

/* =========================================================
   MUSIC CLUB PAGE
========================================================= */

export default function Music() {
  return (
    <main className="min-h-screen mt-[15px] overflow-hidden bg-[#2B0A12] text-[#F7EBD0]">
      <Navbar Home/>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* Background Image */}

        <img
          src="/clubs/music-hero.jpg"
          alt="Music Club"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* Maroon Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-[#2B0A12]/75
          "
        />

        {/* Cinematic Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#2B0A12]
            via-[#2B0A12]/75
            to-transparent
          "
        />

        {/* Gold Glow */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-10%]
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/10
            blur-[120px]
          "
        />

        {/* Hero Content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            max-w-7xl
            items-end
            px-6
            pb-20
            sm:px-12
            lg:px-20
            lg:pb-28
          "
        >

          <div className="max-w-5xl">

            {/* Eyebrow */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#C6A15B]" />

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-[#D9B86C]
                "
              >
                Cultural Sub-Council / Clubs
              </span>
            </motion.div>


            {/* Title */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.15,
              }}
              className="
                text-[clamp(4rem,11vw,10rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.06em]
                text-[#F7EBD0]
              "
            >
              MUSIC
              <br />

              <span className="text-[#C6A15B]">
                CLUB
              </span>
            </motion.h1>


            {/* Tagline */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              className="
                mt-8
                max-w-xl
                text-lg
                leading-relaxed
                text-[#D8C7AA]
                sm:text-xl
              "
            >
              Where melodies become memories,
              voices find their rhythm, and
              every performance tells a story.
            </motion.p>


            {/* Scroll */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
              }}
              className="
                mt-12
                flex
                items-center
                gap-4
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#D8C7AA]
              "
            >
              <span>Scroll to explore</span>

              <span className="text-lg text-[#C6A15B]">
                ↓
              </span>
            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FACULTY MESSAGES
      ===================================================== */}

      <section
        className="
          relative
          bg-[#3A0D18]
          px-6
          py-24
          sm:px-12
          lg:px-20
          lg:py-32
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* Section Header */}

          <div className="mb-16">

            <div className="mb-5 flex items-center gap-4">

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.28em]
                  text-[#C6A15B]
                "
              >
                A Word From Our Faculty
              </span>

              <span className="h-px w-16 bg-[#C6A15B]/40" />

            </div>


            <h2
              className="
                max-w-3xl
                text-5xl
                font-medium
                leading-[0.95]
                tracking-[-0.05em]
                sm:text-6xl
                lg:text-8xl
              "
            >
              Guided by
              <br />

              <span className="text-[#C6A15B]">
                experience.
              </span>
            </h2>

          </div>


          {/* Faculty Cards */}

          <div className="grid gap-6 lg:grid-cols-2">

            {facultyMessages.map((faculty, index) => (

              <motion.article
                key={index}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-[#C6A15B]/15
                  bg-[#2B0A12]/60
                  p-7
                  sm:p-10
                "
              >

                {/* Gold Top Line */}

                <div
                  className="
                    absolute
                    left-8
                    right-8
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#C6A15B]
                    to-transparent
                    opacity-60
                  "
                />


                <div className="flex flex-col gap-8 sm:flex-row">

                  {/* Faculty Image */}

                  <div
                    className="
                      h-28
                      w-28
                      shrink-0
                      overflow-hidden
                      rounded-full
                      border
                      border-[#C6A15B]/40
                      p-1
                    "
                  >

                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="
                        h-full
                        w-full
                        rounded-full
                        object-cover
                        grayscale
                        transition-all
                        duration-700
                        group-hover:grayscale-0
                      "
                    />

                  </div>


                  {/* Message */}

                  <div>

                    <p
                      className="
                        font-serif
                        text-lg
                        italic
                        leading-relaxed
                        text-[#D8C7AA]
                      "
                    >
                      "{faculty.message}"
                    </p>


                    <div className="mt-7">

                      <h3
                        className="
                          text-sm
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-[#F7EBD0]
                        "
                      >
                        {faculty.name}
                      </h3>


                      <p
                        className="
                          mt-2
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          text-[#D9B86C]
                        "
                      >
                        {faculty.designation}
                      </p>

                    </div>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT THE CLUB
      ===================================================== */}

      <section
        className="
          relative
          bg-[#2B0A12]
          px-6
          py-28
          sm:px-12
          lg:px-20
          lg:py-40
        "
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Left */}

            <div>

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]
                "
              >
                01 / About
              </span>


              <div
                className="
                  mt-8
                  h-px
                  w-20
                  bg-[#C6A15B]
                "
              />

            </div>


            {/* Right */}

            <div>

              <h2
                className="
                  text-4xl
                  font-medium
                  leading-[1]
                  tracking-[-0.04em]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                More than
                <br />

                <span className="text-[#C6A15B]">
                  music.
                </span>
              </h2>


              <p
                className="
                  mt-10
                  max-w-3xl
                  text-lg
                  leading-[1.8]
                  text-[#D8C7AA]
                  sm:text-xl
                "
              >
                The Music Club provides a platform for
                students to explore vocals, instruments
                and musical performance while developing
                confidence, discipline and creative expression.
              </p>


              <p
                className="
                  mt-6
                  max-w-3xl
                  text-lg
                  leading-[1.8]
                  text-[#D8C7AA]
                  sm:text-xl
                "
              >
                From rehearsals and jam sessions to live
                performances and cultural celebrations,
                the club brings together students who share
                a passion for music and the art of performance.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section
        className="
          relative
          bg-[#3A0D18]
          px-6
          py-28
          sm:px-12
          lg:px-20
          lg:py-40
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <div className="mb-20">

            <span
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#C6A15B]
              "
            >
              02 / What We Do
            </span>


            <h2
              className="
                mt-7
                text-5xl
                font-medium
                tracking-[-0.05em]
                sm:text-7xl
              "
            >
              Listen.
              <br />

              <span className="text-[#C6A15B]">
                Create.
              </span>
              <br />

              Perform.
            </h2>

          </div>


          {/* Activities */}

          <div
            className="
              grid
              gap-px
              overflow-hidden
              rounded-3xl
              border
              border-[#C6A15B]/15
              bg-[#C6A15B]/15
              md:grid-cols-2
            "
          >

            {activities.map((activity) => (

              <motion.div
                key={activity.number}
                whileHover={{
                  backgroundColor:
                    "rgba(43,10,18,0.8)",
                }}
                className="
                  group
                  relative
                  min-h-[300px]
                  bg-[#2B0A12]/80
                  p-8
                  transition-colors
                  duration-500
                  sm:p-12
                "
              >

                <span
                  className="
                    text-xs
                    tracking-[0.25em]
                    text-[#C6A15B]
                  "
                >
                  {activity.number}
                </span>


                <h3
                  className="
                    mt-20
                    text-3xl
                    font-medium
                    tracking-tight
                    text-[#F7EBD0]
                    sm:text-4xl
                  "
                >
                  {activity.title}
                </h3>


                <p
                  className="
                    mt-5
                    max-w-md
                    leading-relaxed
                    text-[#D8C7AA]
                  "
                >
                  {activity.description}
                </p>


               

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      <section
        className="
          relative
          bg-[#2B0A12]
          px-6
          py-28
          sm:px-12
          lg:px-20
          lg:py-40
        "
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Heading */}

            <div>

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]
                "
              >
                03 / Achievements
              </span>


              <h2
                className="
                  mt-7
                  text-5xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  sm:text-7xl
                "
              >
                Moments
                <br />
                that
                <br />

                <span className="text-[#C6A15B]">
                  matter.
                </span>
              </h2>

            </div>


            {/* Achievement List */}

            <div>

              {achievements.map(
                (achievement, index) => (

                  <motion.div
                    key={achievement.number}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.12,
                    }}
                    className="
                      group
                      border-t
                      border-[#C6A15B]/20
                      py-8
                      sm:py-10
                    "
                  >

                    <div className="flex gap-8">

                      <span
                        className="
                          pt-1
                          text-xs
                          tracking-[0.2em]
                          text-[#C6A15B]
                        "
                      >
                        {achievement.number}
                      </span>


                      <div className="flex-1">

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-4
                          "
                        >

                          <h3
                            className="
                              text-2xl
                              font-medium
                              text-[#F7EBD0]
                              sm:text-3xl
                            "
                          >
                            {achievement.title}
                          </h3>


                          <span
                            className="
                              text-xs
                              tracking-[0.2em]
                              text-[#D9B86C]
                            "
                          >
                            {achievement.year}
                          </span>

                        </div>


                        <p
                          className="
                            mt-4
                            max-w-xl
                            leading-relaxed
                            text-[#D8C7AA]
                          "
                        >
                          {achievement.description}
                        </p>

                      </div>

                    </div>

                  </motion.div>

                )
              )}


              <div className="border-t border-[#C6A15B]/20" />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#1D070D]
          px-6
          py-32
          text-center
          sm:px-12
          lg:py-44
        "
      >

        {/* Gold Glow */}

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
            bg-[#C6A15B]/5
            blur-[120px]
          "
        />


        <div className="relative z-10">

          <span
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#C6A15B]
            "
          >
            Your Stage Awaits
          </span>


          <h2
            className="
              mx-auto
              mt-8
              max-w-5xl
              text-5xl
              font-medium
              leading-[0.9]
              tracking-[-0.05em]
              sm:text-7xl
              lg:text-9xl
            "
          >
            Find your
            <br />

            <span className="text-[#C6A15B]">
              sound.
            </span>
          </h2>


          <button
            className="
              mt-12
              border
              border-[#C6A15B]
              px-8
              py-4
              text-xs
              uppercase
              tracking-[0.25em]
              text-[#C6A15B]
              transition-all
              duration-300
              hover:bg-[#C6A15B]
              hover:text-[#2B0A12]
            "
          >
            Join Music Club
          </button>

        </div>

      </section>

    </main>
  );
}