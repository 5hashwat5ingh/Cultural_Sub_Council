import React from "react";
import { motion } from "framer-motion";

const facultyMessages = [
  {
    name: "Prof. Anupma Kaushik Sharma",
    designation: "Vice-chancellor, MMMUT",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791016590/VC.jpg",
    message:
      "Culture is not just an expression of talent, but a reflection of values, creativity and the collective spirit of our community.",
  },
  {
    name: "Dr. B.K. Pandey",
    designation: "Chairman, Council of Student Activities",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791016591/CSA.jpg",
    message:
      "Culture is not just an expression of talent, but a reflection of values, creativity and the collective spirit of our community.",
  },
  {
    name: "Dr. Awadhesh Kumar",
    designation: "Vice Chairman, Council of Student Activities",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791016590/VCSA.jpg",
    message:
      "The cultural spirit of an institution is shaped by the enthusiasm and participation of its students. Continue to create, collaborate and contribute.",
  },
  {
    name: "Dr. Meenakshi Choudhary",
    designation: "Faculty In-Charge, Cultural Sub-Council",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791037649/WhatsApp_Image_2026-10-03_at_2.04.49_PM.jpg",
    message:
      "Every student carries a unique creative voice. The Cultural Sub Council provides a platform where that voice can be discovered, nurtured and celebrated.",
  },
];

export default function FacultyMessages() {
  const viceChancellor = facultyMessages[0];
  const otherFaculty = facultyMessages.slice(1);

  return (
    <section
      id="faculty-messages"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#DCD3A4]
        px-6
        py-24
        sm:px-10
        lg:px-16
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND — SOFT MAROON TINT
      ===================================================== */}

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
        aria-hidden="true"
      />

      {/* =====================================================
          SECONDARY MAROON TINT
      ===================================================== */}

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
        aria-hidden="true"
      />

      {/* =====================================================
          SOFT GOLD GLOW
      ===================================================== */}

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
        aria-hidden="true"
      />

      {/* =====================================================
          SOFT LIGHT CENTER
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F5EFD0]/[0.35]
          blur-[130px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-12
            flex
            flex-col
            lg:mb-16
          "
        >
          {/* LABEL */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-4
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#7A1B2F]
                sm:text-xs
              "
            >
              Faculty Messages
            </span>

            <span
              className="
                h-px
                w-12
                bg-[#7A1B2F]/40
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              max-w-[800px]
              text-5xl
              font-medium
              leading-[0.95]
              tracking-[-0.05em]
              text-[#241018]
              sm:text-6xl
              lg:text-7xl
          "
          >
            Voices Behind
            <br />
            <span className="text-[#7A1B2F]">
              The Vision.
            </span>
          </h2>
        </motion.div>

        {/* =====================================================
            VICE CHANCELLOR — FEATURED MESSAGE
        ===================================================== */}

        <motion.article
          initial={{
            opacity: 0,
            y: 35,
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
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -4,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[#7A1B2F]/15
            bg-[#F2E9BD]/85
            p-6
            transition-all
            duration-500
            hover:border-[#7A1B2F]/30
            hover:bg-[#F4EBC2]
            sm:p-8
            lg:p-10
          "
        >
          {/* TOP ACCENT */}

          <div
            className="
              pointer-events-none
              absolute
              left-8
              right-8
              top-0
              h-[2px]
              bg-gradient-to-r
              from-transparent
              via-[#7A1B2F]/70
              to-transparent
              opacity-70
              transition-opacity
              duration-500
              group-hover:opacity-100
              lg:left-10
              lg:right-10
            "
          />

          {/* SOFT MAROON GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -left-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[#7A1B2F]/[0.07]
              blur-3xl
              transition-all
              duration-700
              group-hover:bg-[#7A1B2F]/[0.12]
            "
          />

          {/* SOFT GOLD GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-28
              -right-28
              h-64
              w-64
              rounded-full
              bg-[#C6A15B]/[0.08]
              opacity-0
              blur-3xl
              transition-opacity
              duration-700
              group-hover:opacity-100
            "
          />

          <div
            className="
              relative
              z-10
              grid
              items-center
              gap-8
              lg:grid-cols-[220px_1fr]
              lg:gap-12
              xl:grid-cols-[250px_1fr]
            "
          >
            {/* =================================================
                VC IMAGE
            ================================================= */}

            <div
              className="
                mx-auto
                w-full
                max-w-[220px]
                lg:max-w-[250px]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#7A1B2F]/20
                  bg-[#DCD3A4]
                  p-1
                "
              >
                <img
                  src={viceChancellor.image}
                  alt={viceChancellor.name}
                  className="
                    h-full
                    w-full
                    rounded-[14px]
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.03]
                  "
                />

                {/* IMAGE INNER BORDER */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-2
                    rounded-[13px]
                    border
                    border-[#C6A15B]/30
                  "
                />
              </div>
            </div>

            {/* =================================================
                VC MESSAGE
            ================================================= */}

            <div className="min-w-0">
              {/* LABEL */}

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    h-px
                    w-10
                    bg-[#C6A15B]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#7A1B2F]
                    sm:text-[10px]
                  "
                >
                  Vice-Chancellor's Message
                </span>
              </div>

              {/* QUOTE */}

              <blockquote
                className="
                  max-w-[900px]
                  font-serif
                  text-[clamp(1.45rem,2.7vw,2.7rem)]
                  italic
                  leading-[1.25]
                  tracking-[-0.02em]
                  text-[#241018]
                "
              >
                “{viceChancellor.message}”
              </blockquote>

              {/* NAME */}

              <div
                className="
                  mt-8
                  border-t
                  border-[#7A1B2F]/15
                  pt-5
                "
              >
                <h3
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#241018]
                    sm:text-xs
                  "
                >
                  {viceChancellor.name}
                </h3>

                <p
                  className="
                    mt-2
                    text-[9px]
                    font-semibold
                    uppercase
                    leading-4
                    tracking-[0.18em]
                    text-[#7A1B2F]
                    sm:text-[10px]
                  "
                >
                  {viceChancellor.designation}
                </p>
              </div>
            </div>
          </div>
        </motion.article>

        {/* =====================================================
            OTHER FACULTY
        ===================================================== */}

        <div
          className="
            mt-6
            grid
            w-full
            grid-cols-1
            gap-5
            md:grid-cols-3
          "
        >
          {otherFaculty.map((faculty, index) => (
            <FacultyCard
              key={faculty.name}
              faculty={faculty}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FACULTY CARD
========================================================= */

function FacultyCard({ faculty, index }) {
  return (
    <motion.article
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
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className="
        group
        relative
        flex
        min-h-[280px]
        flex-col
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
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-7
          right-7
          top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-[#7A1B2F]/60
          to-transparent
          opacity-70
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* =====================================================
          HOVER MAROON GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-[#7A1B2F]/[0.07]
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-[#7A1B2F]/[0.12]
        "
      />

      {/* =====================================================
          HOVER GOLD GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-48
          w-48
          rounded-full
          bg-[#C6A15B]/[0.08]
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />

      {/* =====================================================
          IMAGE + MESSAGE
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          items-start
          gap-5
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
           h-[95px]
w-[95px]
            shrink-0
            overflow-hidden
            rounded-full
            border
            border-[#7A1B2F]/30
            bg-[#DCD3A4]
            p-1
            transition-all
            duration-700
            group-hover:border-[#C6A15B]/80
            group-hover:scale-105
          sm:h-[105px]
sm:w-[105px]
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
              group-hover:scale-[1.04]
            "
          />

          {/* GOLD INNER RING */}

          <div
            className="
              pointer-events-none
              absolute
              inset-1
              rounded-full
              border
              border-[#C6A15B]/30
            "
          />
        </div>

        {/* MESSAGE */}

        <div className="min-w-0 flex-1">
          <p
            className="
              font-serif
              text-[15px]
              italic
              leading-[1.5]
              tracking-[-0.01em]
              text-[#4A3C35]
              sm:text-[16px]
            "
          >
            “{faculty.message}”
          </p>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <div className="relative z-10 mt-6">
        {/* DIVIDER */}

        <div
          className="
            mb-4
            h-px
            w-full
            bg-[#7A1B2F]/15
            transition-colors
            duration-500
            group-hover:bg-[#C6A15B]/45
          "
        />

        {/* NAME + DESIGNATION */}

        <div className="min-w-0">
          <h3
            className="
              text-[11px]
              font-semibold
              uppercase
              leading-4
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
              leading-4
              tracking-[0.16em]
              text-[#7A1B2F]
            "
          >
            {faculty.designation}
          </p>
        </div>
      </div>
    </motion.article>
  );
}