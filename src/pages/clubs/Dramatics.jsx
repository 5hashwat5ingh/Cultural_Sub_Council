import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* =========================================================
   FACULTY MESSAGES
========================================================= */

const facultyMessages = [
  {
    name: "Vijay Shanker Chaudhary",
    designation: "Assistant Proffesor, ECED",
    designation: "Faculty In-Charge, Dramatics Club",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791273684/Drama_Club_1.jpg",
    message:
      "Theatre is a powerful form of expression where stories, emotions and imagination come alive. The Dramatics Club gives students a platform to discover their voice, build confidence and communicate through the art of performance.",
  },
  {
    name: "Dr. Anu Raj",
    designation: "Assistant proffesor",
    designation: "Faculty Coordinator",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791273766/Drama_club_2.jpg",
    message:
      "Every character has a story and every stage creates an opportunity to express it. The Dramatics Club encourages students to explore acting, storytelling and theatre while developing creativity, confidence and collaboration.",
  },
];

/* =========================================================
   ACTIVITIES
========================================================= */

const activities = [
  {
    number: "01",
    title: "Performances",
    description:
      "From stage productions and campus celebrations to major cultural events, the club brings stories and characters to life.",
  },
  {
    number: "02",
    title: "Acting",
    description:
      "Students explore character development, dialogue delivery, expressions and stage presence through practical performance.",
  },
  {
    number: "03",
    title: "Workshops",
    description:
      "Interactive sessions provide opportunities to learn theatre techniques, improvisation, voice modulation and performance skills.",
  },
  {
    number: "04",
    title: "Competitions",
    description:
      "The club provides a platform for students to represent the institution in theatre, street play and other dramatic competitions.",
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
      "Add a verified achievement, competition result or recognition of the Dramatics Club here.",
  },
  {
    number: "02",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Add another verified milestone, award or major theatrical performance here.",
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
   DRAMATICS CLUB PAGE
========================================================= */

export default function DramaticsClub() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#DCD3A4] text-[#241018]">
      <Navbar Gallery />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        {/* HERO BACKGROUND IMAGE */}

        <img
          src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237165/WhatsApp_Image_2026-10-06_at_3.21.39_AM.jpg"
          alt="Dramatics Club"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* SOFT OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-[#2B0A12]/35
          "
        />

        {/* LEFT CINEMATIC OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#1D070D]/75
            via-[#2B0A12]/35
            to-transparent
          "
        />

        {/* BOTTOM SOFT FADE */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-2
            bg-gradient-to-t
            from-[#DCD3A4]
            via-[#DCD3A4]/20
            to-transparent
          "
        />

        {/* GOLD GLOW */}

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

        {/* HERO CONTENT */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            max-w-[1500px]
            items-end
            px-6
            pb-20
            sm:px-12
            lg:px-20
            lg:pb-28
          "
        >
          <div className="max-w-5xl">
            {/* EYEBROW */}

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
              }}
              className="
                mb-6
                flex
                items-center
                gap-4
              "
            >
              <span className="h-px w-12 bg-[#C6A15B]" />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-[#F5EFD0]
                  sm:text-xs
                "
              >
                Cultural Sub-Council / Clubs
              </span>
            </motion.div>

            {/* TITLE */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                text-[clamp(3.6rem,10vw,9.5rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.06em]
                text-[#F7EBD0]
              "
            >
              DRAMATICS
              <br />
              <span className="text-[#C6A15B]">
                CLUB
              </span>
            </motion.h1>

            {/* TAGLINE */}

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
                delay: 0.5,
              }}
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-[#F5EFD0]/85
                sm:text-lg
              "
            >
              Where stories find a stage, characters find a
              voice, and every performance becomes an
              experience.
            </motion.p>

            {/* SCROLL */}

            
          </div>
        </div>
      </section>

      

      {/* =====================================================
          ABOUT THE CLUB
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#F5EFD0]
          px-6
          py-20
          sm:px-12
          lg:px-20
          lg:py-28
        "
      >
        {/* SOFT GLOWS */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-10%]
            top-[15%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#7A1B2F]/[0.07]
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-20%]
            right-[-10%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#C6A15B]/[0.10]
            blur-[120px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid
              items-center
              gap-12
              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-16
              xl:gap-20
            "
          >
            {/* =================================================
                LEFT — ABOUT IMAGE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
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
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                mx-auto
                w-full
                max-w-[520px]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-[#7A1B2F]/15
                  bg-[#DCD3A4]
                  p-1
                "
              >
                <img
                  src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791301206/WhatsApp_Image_2026-10-06_at_9.06.45_PM.jpg"
                  alt="Dramatics Club performance"
                  className="
                    h-full
                    w-full
                    rounded-[22px]
                    object-cover
                    transition-transform
                    duration-1000
                    hover:scale-[1.03]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-2
                    rounded-[21px]
                    border
                    border-[#C6A15B]/35
                  "
                />
              </div>

              {/* CORNER DETAILS */}

              <div
                className="
                  absolute
                  -bottom-4
                  -left-4
                  h-20
                  w-20
                  border-b
                  border-l
                  border-[#7A1B2F]/35
                "
              />

              <div
                className="
                  absolute
                  -right-4
                  -top-4
                  h-20
                  w-20
                  border-r
                  border-t
                  border-[#C6A15B]/50
                "
              />
            </motion.div>

            {/* =================================================
                RIGHT — ABOUT CONTENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
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
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* LABEL */}

              <div className="mb-5 flex items-center gap-4">
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#7A1B2F]
                  "
                >
                  01 / About
                </span>

                <span className="h-px w-14 bg-[#C6A15B]/60" />
              </div>

              {/* HEADING */}

              <h2
                className="
                  text-5xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-[#241018]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                More than
                <br />
                <span className="text-[#7A1B2F]">
                  acting.
                </span>
              </h2>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-8
                  max-w-2xl
                  text-[15px]
                  leading-7
                  text-[#4A3C35]
                  sm:text-base
                "
              >
                Driven by storytelling, imagination, and
                the transformative power of performance,
                the Dramatics Club provides a space where
                actors, writers, directors, and theatre
                enthusiasts come together to explore the
                art of theatre. It nurtures spontaneity,
                confidence, collaboration, and creative
                expression while encouraging performers
                to step beyond themselves and inhabit
                stories with conviction.
              </p>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-[15px]
                  leading-7
                  text-[#4A3C35]
                  sm:text-base
                "
              >
                From theatrical productions and street
                plays to engaging stage performances at
                HEATS and Abhyudaya, the club turns
                narratives into living experiences. It is
                where words gain life, characters find
                depth, and the stage becomes a world of
                its own.
              </p>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-[15px]
                  leading-7
                  text-[#4A3C35]
                  sm:text-base
                "
              >
                From rehearsals and character development
                to stage productions and cultural
                performances, the club brings together
                students who share a passion for theatre
                and the art of storytelling.
              </p>

              {/* GOLD LINE */}

              <div
                className="
                  mt-8
                  h-[2px]
                  w-16
                  bg-[#C6A15B]
                "
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#DCD3A4]
          px-6
          py-20
          sm:px-12
          lg:px-20
          lg:py-28
        "
      >
        <div className="relative z-10 mx-auto max-w-[1400px]">
          {/* HEADER */}

          <div className="mb-12">
            <div className="mb-4 flex items-center gap-4">
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#7A1B2F]
                "
              >
                02 / What We Do
              </span>

              <span className="h-px w-14 bg-[#7A1B2F]/35" />
            </div>

            <h2
              className="
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.05em]
                text-[#241018]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Imagine.
              <br />
              <span className="text-[#7A1B2F]">
                Perform.
              </span>
              <br />
              Inspire.
            </h2>
          </div>

          {/* ACTIVITIES */}

          <div
            className="
              grid
              overflow-hidden
              rounded-[24px]
              border
              border-[#7A1B2F]/15
              bg-[#7A1B2F]/15
              md:grid-cols-2
            "
          >
            {activities.map((activity, index) => (
              <motion.div
                key={activity.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                }}
                whileHover={{
                  backgroundColor: "#F5EFD0",
                }}
                className="
                  group
                  relative
                  min-h-[260px]
                  bg-[#E8DFB0]
                  p-7
                  transition-colors
                  duration-500
                  sm:p-9
                "
              >
                {/* NUMBER */}

                <span
                  className="
                    text-[10px]
                    tracking-[0.25em]
                    text-[#7A1B2F]
                  "
                >
                  {activity.number}
                </span>

                {/* TITLE */}

                <h3
                  className="
                    mt-16
                    text-3xl
                    font-medium
                    tracking-[-0.04em]
                    text-[#241018]
                    sm:text-4xl
                  "
                >
                  {activity.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    max-w-md
                    text-[14px]
                    leading-6
                    text-[#5A4A42]
                  "
                >
                  {activity.description}
                </p>

                {/* GOLD CORNER */}

                <div
                  className="
                    absolute
                    bottom-6
                    right-6
                    h-6
                    w-6
                    border-b
                    border-r
                    border-[#C6A15B]/60
                    transition-all
                    duration-500
                    group-hover:h-9
                    group-hover:w-9
                  "
                />
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
          overflow-hidden
          bg-[#F5EFD0]
          px-6
          py-20
          sm:px-12
          lg:px-20
          lg:py-28
        "
      >
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[0.75fr_1.25fr]
              lg:gap-20
            "
          >
            {/* HEADING */}

            <div>
              <div className="mb-4 flex items-center gap-4">
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#7A1B2F]
                  "
                >
                  03 / Achievements
                </span>

                <span className="h-px w-12 bg-[#C6A15B]/60" />
              </div>

              <h2
                className="
                  text-5xl
                  font-medium
                  leading-[0.92]
                  tracking-[-0.05em]
                  text-[#241018]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                Moments
                <br />
                that
                <br />
                <span className="text-[#7A1B2F]">
                  matter.
                </span>
              </h2>
            </div>

            {/* ACHIEVEMENT LIST */}

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
                      border-[#7A1B2F]/15
                      py-7
                      sm:py-8
                    "
                  >
                    <div className="flex gap-6">
                      {/* NUMBER */}

                      <span
                        className="
                          pt-1
                          text-[10px]
                          tracking-[0.2em]
                          text-[#7A1B2F]
                        "
                      >
                        {achievement.number}
                      </span>

                      <div className="flex-1">
                        {/* TITLE + YEAR */}

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <h3
                            className="
                              text-2xl
                              font-medium
                              tracking-[-0.03em]
                              text-[#241018]
                              sm:text-3xl
                            "
                          >
                            {achievement.title}
                          </h3>

                          <span
                            className="
                              text-[10px]
                              tracking-[0.2em]
                              text-[#7A1B2F]
                            "
                          >
                            {achievement.year}
                          </span>
                        </div>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-3
                            max-w-xl
                            text-[14px]
                            leading-6
                            text-[#5A4A42]
                          "
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              )}

              <div className="border-t border-[#7A1B2F]/15" />
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================
          FACULTY MESSAGES
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#DCD3A4]
          px-6
          py-20
          sm:px-12
          lg:px-20
          lg:py-28
        "
      >
        {/* BACKGROUND GLOWS */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-12%]
            top-[-10%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#7A1B2F]/[0.08]
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-15%]
            right-[-8%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#C6A15B]/[0.10]
            blur-[110px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          {/* HEADER */}

          <div className="mb-12">
            <div className="mb-4 flex items-center gap-4">
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#7A1B2F]
                "
              >
                Faculty Messages
              </span>

              <span className="h-px w-12 bg-[#7A1B2F]/35" />
            </div>

            <h2
              className="
                text-5xl
                font-medium
                leading-[0.95]
                tracking-[-0.05em]
                text-[#241018]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Guided by
              <br />
              <span className="text-[#7A1B2F]">
                experience.
              </span>
            </h2>
          </div>

          {/* FACULTY CARDS */}

          <div className="grid gap-5 lg:grid-cols-2">
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
                  duration: 0.75,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#7A1B2F]/15
                  bg-[#E8DFB0]/80
                  p-6
                  transition-all
                  duration-500
                  hover:border-[#7A1B2F]/30
                  hover:bg-[#EEE5B8]
                  sm:p-7
                "
              >
                {/* TOP LINE */}

                <div
                  className="
                    absolute
                    left-7
                    right-7
                    top-0
                    h-[2px]
                    bg-gradient-to-r
                    from-transparent
                    via-[#7A1B2F]/60
                    to-transparent
                  "
                />

                <div className="flex gap-5">
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-[88px]
                      w-[88px]
                      shrink-0
                      overflow-hidden
                      rounded-full
                      border
                      border-[#7A1B2F]/25
                      bg-[#DCD3A4]
                      p-1
                      sm:h-[100px]
                      sm:w-[100px]
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
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* MESSAGE */}

                  <div className="min-w-0">
                    <p
                      className="
                        font-serif
                        text-[15px]
                        italic
                        leading-[1.5]
                        text-[#4A3C35]
                        sm:text-[16px]
                      "
                    >
                      “{faculty.message}”
                    </p>
                  </div>
                </div>

                {/* INFO */}

                <div
                  className="
                    mt-6
                    border-t
                    border-[#7A1B2F]/15
                    pt-4
                  "
                >
                  <h3
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-[#241018]
                    "
                  >
                    {faculty.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.17em]
                      text-[#7A1B2F]
                    "
                  >
                    {faculty.designation}
                  </p>
                </div>
              </motion.article>
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