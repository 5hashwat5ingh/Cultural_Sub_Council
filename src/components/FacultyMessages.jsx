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
          max-w-[1700px]
        "
      >
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
          </div>
        </div>

        {/* =====================================================
            VICE CHANCELLOR — FULL WIDTH
        ===================================================== */}

        <div className="w-full">
          <FacultyCard
            faculty={viceChancellor}
            index={0}
            featured={true}
          />
        </div>

        {/* =====================================================
            OTHER FACULTY — 3 COLUMNS
        ===================================================== */}

        <div
          className="
            mt-5
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
              featured={false}
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

function FacultyCard({
  faculty,
  index,
  featured = false,
}) {
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
      className={`
        group
        relative
        flex
        h-[300px]
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        p-7
        transition-all
        duration-500

        ${
          featured
            ? "border-[#7A1B2F]/20 bg-[#F2E9BD]/85"
            : "border-[#7A1B2F]/15 bg-[#E8DFB0]/80"
        }

        hover:border-[#7A1B2F]/35

        ${
          featured
            ? "hover:bg-[#F4EBC2]"
            : "hover:bg-[#EEE5B8]"
        }

        sm:p-8
      `}
    >
      {/* =====================================================
          TOP MAROON ACCENT
      ===================================================== */}

      <div
        className="
          absolute
          left-7
          right-7
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
          bg-[#7A1B2F]/[0.08]
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-[#7A1B2F]/[0.13]
        "
      />

      {/* =====================================================
          GOLD HOVER GLOW
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
          blur-3xl
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100
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
            border-[#7A1B2F]/30
            bg-[#DCD3A4]
            p-1
            transition-all
            duration-700
            group-hover:border-[#C6A15B]/80
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

        {/* =================================================
            MESSAGE
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
          "
        >
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
            bg-[#7A1B2F]/15
            transition-colors
            duration-500
            group-hover:bg-[#C6A15B]/45
          "
        />

        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          {/* NAME + DESIGNATION */}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
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
                tracking-[0.18em]
                text-[#7A1B2F]
              "
            >
              {faculty.designation}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}