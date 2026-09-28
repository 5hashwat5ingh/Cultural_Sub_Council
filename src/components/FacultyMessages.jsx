import React from "react";
import { motion } from "framer-motion";

const facultyMessages = [
  {
    name: "Dr. B.K. Pandey",
    designation: "Chairman, Council of Student Activities",
    image: "/faculty/b_k_pandey.jpg",
    message:
      "Culture is not just an expression of talent, but a reflection of values, creativity and the collective spirit of our community.",
  },
  {
    name: "Dr. Awadhesh Kumar",
    designation: "Vice Chairman, Council of Student Activities",
    image: "/faculty/awadhesh-kumar.jpg",
    message:
      "The cultural spirit of an institution is shaped by the enthusiasm and participation of its students. Continue to create, collaborate and contribute.",
  },
  {
    name: "Dr. Meenakshi Choudhary",
    designation: "Faculty In-Charge, Cultural Sub-Council",
    image: "/faculty/meenakshi-choudhary.jpg",
    message:
      "Every student carries a unique creative voice. The Cultural Sub Council provides a platform where that voice can be discovered, nurtured and celebrated.",
  },
];

export default function FacultyMessages() {
  return (
    <section
      id="faculty-messages"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#3A0D18]
        px-6
        py-24
        sm:px-10
        lg:px-16
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      {/* MAROON GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-[-10%]
          top-[5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[radial-gradient(circle,rgba(122,27,47,0.28)_0%,rgba(58,13,24,0)_70%)]
          blur-3xl
        "
      />

      {/* GOLD GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-10%]
          right-[-5%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-[radial-gradient(circle,rgba(198,161,91,0.14)_0%,rgba(198,161,91,0)_70%)]
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1700px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-14
            flex
            flex-col
            gap-6
            lg:mb-16
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            {/* LABEL */}

            <div className="mb-5 flex items-center gap-4">
              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]
                  sm:text-xs
                "
              >
                Faculty Messages
              </span>

              <span className="h-px w-12 bg-[#C6A15B]/40" />
            </div>

            {/* HEADING */}

            <h2
              className="
                text-5xl
                font-medium
                leading-[0.95]
                tracking-[-0.05em]
                text-[#F7EBD0]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Voices Behind
              <br />

              <span className="text-[#D8C7AA]">
                The Vision.
              </span>
            </h2>
          </div>
        </div>

        {/* =====================================================
            FACULTY CARDS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-3
          "
        >
          {facultyMessages.map((faculty, index) => (
            <FacultyCard
              key={faculty.name}
              faculty={faculty}
              index={index}
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
        duration: 0.75,
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
        h-[300px]
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-[#C6A15B]/15
        bg-[#4A1220]/45
        p-7
        transition-all
        duration-500
        hover:border-[#C6A15B]/45
        hover:bg-[#4A1220]/65
        sm:p-8
      "
    >
      {/* =====================================================
          TOP GOLD ACCENT
      ===================================================== */}

      <div
        className="
          absolute
          left-7
          right-7
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#C6A15B]/60
          to-transparent
          opacity-60
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* =====================================================
          HOVER MAROON / GOLD GLOW
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
          bg-[#7A1B2F]/15
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-[#C6A15B]/10
        "
      />

      {/* =====================================================
          MESSAGE AREA
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          items-center
          gap-4
          sm:gap-5
        "
      >
        {/* =================================================
            FACULTY IMAGE
        ================================================= */}

        <div
          className="
            relative
            h-[80px]
            w-[80px]
            shrink-0
            overflow-hidden
            rounded-full
            border
            border-[#C6A15B]/35
            bg-[#2B0A12]
            p-1
            transition-all
            duration-700
            group-hover:border-[#C6A15B]/70
            group-hover:scale-105
            sm:h-[90px]
            sm:w-[90px]
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

          {/* GOLD INNER RING */}

          <div
            className="
              pointer-events-none
              absolute
              inset-1
              rounded-full
              border
              border-[#C6A15B]/20
            "
          />
        </div>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <div className="flex min-w-0 flex-1 flex-col">
          <p
            className="
              font-serif
              text-[15px]
              italic
              leading-[1.5]
              tracking-[-0.01em]
              text-[#D8C7AA]
              sm:text-[16px]
            "
          >
            {faculty.message}
          </p>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="relative z-10">
        {/* DIVIDER */}

        <div
          className="
            mb-4
            mt-4
            h-px
            w-full
            bg-[#C6A15B]/15
            transition-colors
            duration-500
            group-hover:bg-[#C6A15B]/35
          "
        />

        <div className="flex items-end justify-between gap-4">
          {/* NAME + DESIGNATION */}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#F7EBD0]
              "
            >
              {faculty.name}
            </h3>

            <p
              className="
                mt-2
                text-[9px]
                font-medium
                uppercase
                leading-4
                tracking-[0.18em]
                text-[#D9B86C]
              "
            >
              {faculty.designation}
            </p>
          </div>

          {/* NUMBER */}

          <span
            className="
              shrink-0
              font-mono
              text-[10px]
              tracking-[0.2em]
              text-[#C6A15B]/45
              transition-colors
              duration-500
              group-hover:text-[#C6A15B]
            "
          >
            0{index + 1}
          </span>
        </div>
      </div>
    </motion.article>
  );
}