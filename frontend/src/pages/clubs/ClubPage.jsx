import React from "react";
import { motion } from "framer-motion";

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

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
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

const cardReveal = {
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

// ============================================================
// SAFE IMAGE
// ============================================================

function ClubImage({
  src,
  alt = "",
  className = "",
  ...props
}) {
  const [error, setError] = React.useState(false);

  if (!src || src === "#") {
    return (
      <div
        className={`flex items-center justify-center bg-[#4A1220] ${className}`}
        {...props}
      >
        <span className="px-4 text-center text-[9px] uppercase tracking-[0.2em] text-[#D8C7AA]">
          Image unavailable
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-[#4A1220] ${className}`}
        {...props}
      >
        <span className="px-4 text-center text-[9px] uppercase tracking-[0.2em] text-[#D8C7AA]">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}

// ============================================================
// CLUB PAGE
// ============================================================

export default function ClubPage({ club }) {
  if (!club) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#DCD3A4] px-6 text-[#2B0A12]">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
            Cultural Sub Council
          </p>

          <h1 className="mt-4 text-4xl font-medium">
            Club not found.
          </h1>
        </div>
      </main>
    );
  }

  const activities = club.activities || [];
  const achievements = club.achievements || [];
  const faculty = club.faculty || [];

  const aboutParagraphs = Array.isArray(club.about)
    ? club.about
    : club.about
      ? [club.about]
      : [];

  const title = club.title || club.name || "CULTURAL CLUB";

  const accentTitle =
    club.accentTitle ||
    club.accent ||
    "";

  const heroTagline =
    club.tagline ||
    club.description ||
    "A space where creativity, expression and talent come together.";

  // ==========================================================
  // IMPORTANT
  // Dance + Music currently don't have aboutImage.
  // Use heroImage as fallback so the About image never disappears.
  // ==========================================================

  const aboutImage =
    club.aboutImage ||
    club.heroImage ||
    club.image;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#DCD3A4] text-[#241018]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar Gallery />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* HERO IMAGE */}

        <ClubImage
          src={club.heroImage || club.image}
          alt={title}
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

        <div className="absolute inset-0 bg-[#2B0A12]/35" />

        {/* CINEMATIC LEFT GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#1D070D]/80
            via-[#2B0A12]/35
            to-transparent
          "
        />

        {/* BOTTOM TRANSITION */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-4
            bg-gradient-to-t
            from-[#DCD3A4]
            via-[#DCD3A4]/20
            to-transparent
          "
        />

        {/* GOLD AMBIENT GLOW */}

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
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-5xl"
          >

            {/* EYEBROW */}

            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#C6A15B]" />

              <span className="text-xs uppercase tracking-[0.3em] text-[#D9B86C]">
                Cultural Sub-Council / Clubs
              </span>
            </motion.div>

            {/* TITLE */}

            <motion.h1
              variants={fadeUp}
              className="
                text-[clamp(4rem,11vw,10rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.06em]
                text-[#F7EBD0]
              "
            >
              {title}

              {accentTitle && (
                <>
                  <br />

                  <span className="text-[#C6A15B]">
                    {accentTitle}
                  </span>
                </>
              )}
            </motion.h1>

            {/* TAGLINE */}

            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-xl
                text-base
                leading-relaxed
                text-[#D8C7AA]
                sm:text-lg
                lg:text-xl
              "
            >
              {heroTagline}
            </motion.p>

            {/* GOLD LINE */}

            <motion.div
              variants={fadeUp}
              className="mt-8 h-px w-16 bg-[#C6A15B]"
            />

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
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

        {/* AMBIENT GLOWS */}

        <div
          className="
            pointer-events-none
            absolute
            -left-[12%]
            top-[10%]
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
            -right-[10%]
            bottom-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/[0.10]
            blur-[120px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px]">

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

            {/* IMAGE */}

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  border
                  border-[#7A1B2F]/10
                "
              >

                <ClubImage
                  src={aboutImage}
                  alt={`${title} performance`}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    hover:scale-105
                  "
                />

                {/* CORNER DETAILS */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    h-10
                    w-10
                    border-l
                    border-t
                    border-[#C6A15B]
                  "
                />

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    h-10
                    w-10
                    border-b
                    border-r
                    border-[#C6A15B]
                  "
                />

                {/* IMAGE NUMBER */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    bg-[#1D070D]/75
                    px-3
                    py-2
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-[#F7EBD0]
                    backdrop-blur-sm
                  "
                >
                  {club.number || "01"} / CLUB
                </div>

              </div>
            </motion.div>

            {/* CONTENT */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >

              <span className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
                01 / About
              </span>

              <div className="mt-8 h-px w-20 bg-[#C6A15B]" />

              <h2
                className="
                  mt-8
                  text-4xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-[#2B0A12]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                {club.aboutTitle || "More than a club."}
              </h2>

              <div className="mt-8 max-w-3xl">

                {aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`
                      text-base
                      leading-[1.8]
                      text-[#5A3940]
                      sm:text-lg
                      ${index > 0 ? "mt-5" : ""}
                    `}
                  >
                    {paragraph}
                  </p>
                ))}

              </div>

              <div className="mt-8 h-px w-16 bg-[#C6A15B]" />

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

        {/* GOLD GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-10%]
            top-[10%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#C6A15B]/10
            blur-[120px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px]">

          {/* HEADER */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-14"
          >

            <span className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
              02 / What We Do
            </span>

            <h2
              className="
                mt-6
                text-4xl
                font-medium
                tracking-[-0.05em]
                text-[#2B0A12]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Create.

              <br />

              <span className="text-[#7A1B2F]">
                Express.
              </span>

              <br />

              Inspire.
            </h2>

          </motion.div>

          {/* ACTIVITY GRID */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="
              grid
              overflow-hidden
              rounded-3xl
              border
              border-[#7A1B2F]/10
              bg-[#7A1B2F]/10
              md:grid-cols-2
            "
          >

            {activities.map((activity, index) => (
              <motion.div
                key={`${activity.number || index}-${activity.title}`}
                variants={cardReveal}
                whileHover={{
                  backgroundColor: "rgba(245,239,208,0.85)",
                }}
                className="
                  group
                  relative
                  min-h-[250px]
                  bg-[#F5EFD0]/75
                  p-7
                  transition-colors
                  duration-500
                  sm:p-9
                "
              >

                {/* NUMBER */}

                <span className="text-xs tracking-[0.25em] text-[#7A1B2F]">
                  {activity.number ||
                    String(index + 1).padStart(2, "0")}
                </span>

                {/* TITLE */}

                <h3
                  className="
                    mt-16
                    text-2xl
                    font-medium
                    tracking-tight
                    text-[#2B0A12]
                    sm:text-3xl
                  "
                >
                  {activity.title}
                </h3>

                {/* DESCRIPTION */}

                <p className="mt-4 max-w-md leading-relaxed text-[#5A3940]">
                  {activity.description}
                </p>

                {/* HOVER LINE */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-[#C6A15B]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

              </motion.div>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      {achievements.length > 0 && (
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

          <div className="mx-auto max-w-[1500px]">

            <div
              className="
                grid
                gap-12
                lg:grid-cols-[0.8fr_1.2fr]
                lg:gap-20
              "
            >

              {/* HEADING */}

              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >

                <span className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
                  03 / Achievements
                </span>

                <h2
                  className="
                    mt-6
                    text-4xl
                    font-medium
                    leading-[0.95]
                    tracking-[-0.05em]
                    text-[#2B0A12]
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

              </motion.div>

              {/* ACHIEVEMENT LIST */}

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >

                {achievements.map((achievement, index) => (
                  <motion.div
                    key={`${achievement.number || index}-${achievement.title}`}
                    variants={cardReveal}
                    className="
                      group
                      border-t
                      border-[#7A1B2F]/15
                      py-7
                      sm:py-8
                    "
                  >

                    <div className="flex gap-6 sm:gap-8">

                      {/* NUMBER */}

                      <span
                        className="
                          pt-1
                          text-xs
                          tracking-[0.2em]
                          text-[#7A1B2F]
                        "
                      >
                        {achievement.number ||
                          String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">

                        {/* TITLE + YEAR */}

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
                              text-xl
                              font-medium
                              text-[#2B0A12]
                              sm:text-2xl
                            "
                          >
                            {achievement.title}
                          </h3>

                          <span
                            className="
                              text-xs
                              tracking-[0.2em]
                              text-[#7A1B2F]
                            "
                          >
                            {achievement.year || "—"}
                          </span>

                        </div>

                        <p
                          className="
                            mt-3
                            max-w-xl
                            leading-relaxed
                            text-[#5A3940]
                          "
                        >
                          {achievement.description}
                        </p>

                      </div>
                    </div>

                  </motion.div>
                ))}

                <div className="border-t border-[#7A1B2F]/15" />

              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FACULTY
      ===================================================== */}

      {faculty.length > 0 && (
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

          {/* AMBIENT GLOWS */}

          <div
            className="
              pointer-events-none
              absolute
              left-[-12%]
              top-[-8%]
              h-[520px]
              w-[520px]
              rounded-full
              bg-[#7A1B2F]/[0.10]
              blur-[120px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[-12%]
              top-[25%]
              h-[460px]
              w-[460px]
              rounded-full
              bg-[#8B1E3F]/[0.07]
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
              bg-[#C6A15B]/[0.14]
              blur-[120px]
            "
          />

          <div className="relative z-10 mx-auto max-w-[1500px]">

            {/* HEADER */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-12"
            >

              <div className="mb-5 flex items-center gap-4">

                <span className="text-xs uppercase tracking-[0.28em] text-[#7A1B2F]">
                  A Word From Our Faculty
                </span>

                <span className="h-px w-16 bg-[#7A1B2F]/30" />

              </div>

              <h2
                className="
                  max-w-3xl
                  text-4xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-[#2B0A12]
                  sm:text-5xl
                  lg:text-7xl
                "
              >
                Guided by

                <br />

                <span className="text-[#7A1B2F]">
                  experience.
                </span>
              </h2>

            </motion.div>

            {/* FACULTY CARDS */}

           <motion.div
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  className="
    flex
    flex-wrap
    justify-center
    gap-5
  "
>
  {faculty.map((member, index) => (
    <motion.article
      key={`${member.name || "faculty"}-${index}`}
      variants={cardReveal}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-[#7A1B2F]/10
        bg-[#F5EFD0]/75
        p-5
        sm:p-6
        md:w-[calc(33.333%-14px)]
      "
    >

      {/* GOLD HOVER ACCENT */}

      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          origin-left
          scale-x-0
          bg-[#C6A15B]
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />

      {/* FACULTY TOP */}

      <div className="flex items-center gap-4">

        {/* IMAGE */}

        <div
          className="
            h-[72px]
            w-[72px]
            shrink-0
            overflow-hidden
            rounded-full
            border
            border-[#C6A15B]/50
            p-1
          "
        >
          <ClubImage
            src={member.image}
            alt={member.name}
            className="
              h-full
              w-full
              rounded-full
              object-cover
              grayscale
              transition-all
              duration-500
              group-hover:grayscale-0
            "
          />
        </div>

        {/* NAME */}

        <div className="min-w-0">

          <h3
            className="
              text-sm
              font-semibold
              leading-tight
              text-[#2B0A12]
              sm:text-base
            "
          >
            {member.name}
          </h3>

          <p
            className="
              mt-1
              text-[9px]
              uppercase
              leading-4
              tracking-[0.14em]
              text-[#7A1B2F]
            "
          >
            {member.designation}
          </p>

        </div>

      </div>

      {/* MESSAGE */}

      <p
        className="
          mt-5
          border-t
          border-[#7A1B2F]/10
          pt-4
          font-serif
          text-sm
          italic
          leading-[1.6]
          text-[#5A3940]
        "
      >
        "{member.message}"
      </p>

      {/* QUOTE MARK */}

      <span
        className="
          absolute
          bottom-2
          right-5
          font-serif
          text-5xl
          leading-none
          text-[#C6A15B]/20
        "
      >
        ”
      </span>

    </motion.article>
  ))}
</motion.div>

          </div>
        </section>
      )}

     
      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </main>
  );
}