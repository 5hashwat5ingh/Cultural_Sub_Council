import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// =========================================================
// FACULTY MESSAGES
// =========================================================

const facultyMessages = [
  {
    name: "Dr.Ramendra Pandey",
    designation: "Faculty In-Charge, Technical & Designing Club",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791274310/TAD_1.jpg",
    message:
      "Technology and visual storytelling offer students powerful ways to observe, create and communicate. The Technical & Photography Club provides a platform where creativity, technology and visual expression come together to capture ideas and experiences.",
  },
  {
    name: "Dr.Abhishek Paswan",
    designation: "Faculty In-Charge, Technical & Designing Club",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791274369/TAD_2.jpg",
    message:
      "A photograph can preserve a moment, while technology can transform an idea into an experience. The club encourages students to explore photography, design and digital creativity while developing skills that can be shared across the cultural life of the campus.",
  },
  {
    name: "Dr.Dinesh Kumar Kothari",
    designation: "Faculty In-Charge, Technical & Designing Club",
    image: "#",
    message:
      "A photograph can preserve a moment, while technology can transform an idea into an experience. The club encourages students to explore photography, design and digital creativity while developing skills that can be shared across the cultural life of the campus.",
  },
  {
    name: "Dr.Shantanu Shahi",
    designation: "Faculty In-Charge, Photography Club",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791275391/Photo_club_1.jpg",
    message:
      "A photograph can preserve a moment, while technology can transform an idea into an experience. The club encourages students to explore photography, design and digital creativity while developing skills that can be shared across the cultural life of the campus.",
  },
  {
    name: "Dr.Swet Ketu",
    designation: "Faculty In-Charge, Photography Club",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791275397/photo_club_2.jpg",
    message:
      "A photograph can preserve a moment, while technology can transform an idea into an experience. The club encourages students to explore photography, design and digital creativity while developing skills that can be shared across the cultural life of the campus.",
  },
  {
    name: "Dr.Alok Kumar Shukla",
    designation: "Faculty In-Charge, Photography Club",
    image: "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791275403/photo_club_3.jpg",
    message:
      "A photograph can preserve a moment, while technology can transform an idea into an experience. The club encourages students to explore photography, design and digital creativity while developing skills that can be shared across the cultural life of the campus.",
  },
];

// =========================================================
// ACTIVITIES
// =========================================================

const activities = [
  {
    number: "01",
    title: "Photography",
    description:
      "Students explore photography through portraits, campus life, events, creative compositions and visual storytelling.",
  },
  {
    number: "02",
    title: "Event Coverage",
    description:
      "The club documents cultural programmes, celebrations and campus events through photography and digital media.",
  },
  {
    number: "03",
    title: "Design & Digital Media",
    description:
      "Students create posters, social media creatives, digital artwork and visual content using modern design tools.",
  },
  {
    number: "04",
    title: "Technology",
    description:
      "The club explores websites, digital experiences, creative technology and multimedia projects that bring ideas to life.",
  },
];

// =========================================================
// ACHIEVEMENTS
// =========================================================

const achievements = [
  {
    number: "01",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Add a verified photography, design or technical achievement here.",
  },
  {
    number: "02",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Add a verified event coverage, competition result or creative project here.",
  },
  {
    number: "03",
    year: "20XX",
    title: "Achievement Title",
    description:
      "Highlight another important milestone or recognition of the club.",
  },
];

export default function Technical() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#DCD3A4] text-[#241018]">
      <Navbar Home />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        <img
          src="https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237315/WhatsApp_Image_2026-10-06_at_3.24.43_AM.jpg"
          alt="Technical & Photography Club"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-[#2B0A12]/35" />

        {/* Cinematic left gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D070D]/75 via-[#2B0A12]/35 to-transparent" />

        {/* Transition into light section */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-[#DCD3A4] via-[#DCD3A4]/20 to-transparent" />

        {/* Gold glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/10 blur-[120px]" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-end px-6 pb-20 sm:px-12 lg:px-20 lg:pb-28">
          <div className="max-w-6xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#C6A15B]" />

              <span className="text-xs uppercase tracking-[0.3em] text-[#D9B86C]">
                Cultural Sub-Council / Clubs
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.15,
              }}
              className="text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.82] tracking-[-0.06em] text-[#F7EBD0]"
            >
              TECHNICAL
              <br />
              <span className="text-[#C6A15B]">
                &amp; PHOTOGRAPHY
              </span>
              <br />
              CLUB
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-[#D8C7AA] sm:text-xl"
            >
              Where technology meets perspective, design meets imagination
              and every creation tells a story.
            </motion.p>

            {/* Scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
              }}
              className="mt-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#D8C7AA]"
            >
              <span>Scroll to explore</span>
              <span className="text-lg text-[#C6A15B]">↓</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FACULTY MESSAGES
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 lg:px-20 lg:py-28">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-[-12%] top-[-8%] h-[520px] w-[520px] rounded-full bg-[#7A1B2F]/[0.10] blur-[120px]" />

        <div className="pointer-events-none absolute right-[-12%] top-[25%] h-[460px] w-[460px] rounded-full bg-[#8B1E3F]/[0.07] blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#C6A15B]/[0.14] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">

          {/* Header */}
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.28em] text-[#7A1B2F]">
                A Word From Our Faculty
              </span>

              <span className="h-px w-16 bg-[#7A1B2F]/30" />
            </div>

            <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-[#2B0A12] sm:text-5xl lg:text-7xl">
              Guided by
              <br />
              <span className="text-[#7A1B2F]">experience.</span>
            </h2>
          </div>

          {/* Faculty cards */}
          {/* Faculty cards */}
<div className="grid gap-5 md:grid-cols-3">
  {facultyMessages.map((faculty, index) => (
    <motion.article
      key={index}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
      }}
      className="group relative overflow-hidden rounded-2xl border border-[#7A1B2F]/10 bg-[#F5EFD0]/75 p-5 sm:p-6"
    >
      {/* Gold accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-[#C6A15B] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-center gap-4">
        {/* Faculty image */}
        <div className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border border-[#C6A15B]/50 p-1">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="h-full w-full rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </div>

        {/* Name + designation */}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-tight text-[#2B0A12]">
            {faculty.name}
          </h3>

          <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#7A1B2F]">
            {faculty.designation}
          </p>
        </div>
      </div>

      {/* Short message */}
      <p className="mt-5 border-t border-[#7A1B2F]/10 pt-4 font-serif text-sm italic leading-[1.6] text-[#5A3940]">
        "{faculty.message}"
      </p>

      {/* Quote mark */}
      <span className="absolute bottom-3 right-5 font-serif text-5xl leading-none text-[#C6A15B]/20">
        ”
      </span>
    </motion.article>
  ))}
</div>
        </div>
      </section>

      {/* =====================================================
          ABOUT THE CLUB
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F5EFD0] px-6 py-20 sm:px-12 lg:px-20 lg:py-28">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">

            {/* About image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-[#7A1B2F]/10">

                <img
                  src="/clubs/technical-photography-about.jpg"
                  alt="Technical & Photography Club"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />

                <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-[#C6A15B]" />
                <div className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-[#C6A15B]" />
              </div>
            </motion.div>

            {/* About content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
                01 / About
              </span>

              <div className="mt-8 h-px w-20 bg-[#C6A15B]" />

              <h2 className="mt-8 text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#2B0A12] sm:text-6xl lg:text-7xl">
                More than
                <br />
                <span className="text-[#7A1B2F]">
                  technology.
                </span>
              </h2>

              <p className="mt-8 max-w-3xl text-base leading-[1.8] text-[#5A3940] sm:text-lg">
                Driven by innovation, visual artistry, and creative precision,
                the Technical &amp; Photography Club shapes the visual identity
                of campus life. From conceptualising posters and digital
                creatives to capturing fleeting moments through the lens, the
                club transforms ideas into compelling visual experiences.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-[1.8] text-[#5A3940] sm:text-lg">
                From designing for major cultural initiatives and campaigns
                like HEATS and Abhyudaya to documenting the moments that
                define them, the club blends technical expertise with artistic
                vision. It is where ideas become visuals, perspectives become
                narratives, and every frame and design leaves an impression.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-[1.8] text-[#5A3940] sm:text-lg">
                From capturing important moments across campus to designing
                digital experiences, the club creates a space where technical
                skills and creative perspectives work together.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-[1.8] text-[#5A3940] sm:text-lg">
                It encourages students to learn, experiment, collaborate and
                use technology as a medium for storytelling and creative
                expression.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#DCD3A4] px-6 py-20 sm:px-12 lg:px-20 lg:py-28">

        <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-[#C6A15B]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">

          {/* Header */}
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
              02 / What We Do
            </span>

            <h2 className="mt-6 text-4xl font-medium tracking-[-0.05em] text-[#2B0A12] sm:text-6xl lg:text-7xl">
              Capture.
              <br />
              <span className="text-[#7A1B2F]">Create.</span>
              <br />
              Connect.
            </h2>
          </div>

          {/* Activities */}
          <div className="grid overflow-hidden rounded-3xl border border-[#7A1B2F]/10 bg-[#7A1B2F]/10 md:grid-cols-2">

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
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                whileHover={{
                  backgroundColor: "rgba(245,239,208,0.75)",
                }}
                className="group relative min-h-[250px] bg-[#F5EFD0]/75 p-7 transition-colors duration-500 sm:p-9"
              >
                <span className="text-xs tracking-[0.25em] text-[#7A1B2F]">
                  {activity.number}
                </span>

                <h3 className="mt-16 text-2xl font-medium tracking-tight text-[#2B0A12] sm:text-3xl">
                  {activity.title}
                </h3>

                <p className="mt-4 max-w-md leading-relaxed text-[#5A3940]">
                  {activity.description}
                </p>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C6A15B] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F5EFD0] px-6 py-20 sm:px-12 lg:px-20 lg:py-28">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            {/* Heading */}
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#7A1B2F]">
                03 / Achievements
              </span>

              <h2 className="mt-6 text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-[#2B0A12] sm:text-6xl lg:text-7xl">
                Moments
                <br />
                that
                <br />
                <span className="text-[#7A1B2F]">matter.</span>
              </h2>
            </div>

            {/* Achievement list */}
            <div>
              {achievements.map((achievement, index) => (
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
                  className="group border-t border-[#7A1B2F]/15 py-7 sm:py-8"
                >
                  <div className="flex gap-6 sm:gap-8">

                    <span className="pt-1 text-xs tracking-[0.2em] text-[#7A1B2F]">
                      {achievement.number}
                    </span>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-xl font-medium text-[#2B0A12] sm:text-2xl">
                          {achievement.title}
                        </h3>

                        <span className="text-xs tracking-[0.2em] text-[#7A1B2F]">
                          {achievement.year}
                        </span>
                      </div>

                      <p className="mt-3 max-w-xl leading-relaxed text-[#5A3940]">
                        {achievement.description}
                      </p>

                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="border-t border-[#7A1B2F]/15" />
            </div>

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