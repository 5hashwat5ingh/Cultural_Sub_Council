import React from "react";
import { motion } from "framer-motion";

// =========================================================
// FACULTY DATA
// =========================================================

const facultyMessages = [
  {
    name: "Prof. Anupma Kaushik Sharma",
    designation: "Vice-chancellor, MMMUT",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791629908/Professional_Portrait_of_Indian_Woman_at_Desk.png",
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

// =========================================================
// MAIN COMPONENT
// =========================================================

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
        px-4
        py-20
        sm:px-6
        sm:py-24
        md:px-8
        md:py-28
        lg:px-12
        lg:py-30
        xl:px-16
        xl:py-32
      "
    >
      {/* =====================================================
          BACKGROUND — MAROON GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-18%]
          top-[-8%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#7A1B2F]/[0.10]
          blur-[90px]

          sm:left-[-12%]
          sm:h-[420px]
          sm:w-[420px]
          sm:blur-[110px]

          xl:h-[520px]
          xl:w-[520px]
          xl:blur-[120px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SECONDARY MAROON GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-18%]
          top-[25%]
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#8B1E3F]/[0.07]
          blur-[90px]

          sm:right-[-12%]
          sm:h-[380px]
          sm:w-[380px]
          sm:blur-[110px]

          xl:h-[460px]
          xl:w-[460px]
          xl:blur-[120px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          GOLD GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-15%]
          right-[-10%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#C6A15B]/[0.14]
          blur-[90px]

          sm:h-[400px]
          sm:w-[400px]
          sm:blur-[110px]

          xl:h-[500px]
          xl:w-[500px]
          xl:blur-[120px]
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
          h-[400px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F5EFD0]/[0.35]
          blur-[100px]

          sm:h-[500px]
          sm:w-[750px]
          sm:blur-[115px]

          xl:h-[600px]
          xl:w-[900px]
          xl:blur-[130px]
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
            mb-10
            sm:mb-12
            xl:mb-16
          "
        >
          {/* LABEL */}

          <div
            className="
              mb-4
              flex
              items-center
              gap-3
              sm:mb-5
              sm:gap-4
            "
          >
            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#7A1B2F]
                sm:text-[10px]
                sm:tracking-[0.3em]
              "
            >
              Faculty Messages
            </span>

            <span
              className="
                h-px
                w-8
                bg-[#7A1B2F]/40
                sm:w-12
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              max-w-[800px]
              text-[clamp(2.8rem,8vw,4rem)]
              font-medium
              leading-[0.95]
              tracking-[-0.05em]
              text-[#241018]
              sm:text-6xl
              md:text-[4.5rem]
              xl:text-7xl
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
            rounded-[20px]
            border
            border-[#7A1B2F]/15
            bg-[#F2E9BD]/85
            p-5
            transition-all
            duration-500
            hover:border-[#7A1B2F]/30
            hover:bg-[#F4EBC2]
            sm:rounded-[24px]
            sm:p-7
            md:p-8
            xl:p-10
          "
        >
          {/* TOP ACCENT */}

          <div
            className="
              pointer-events-none
              absolute
              left-6
              right-6
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
              sm:left-8
              sm:right-8
              xl:left-10
              xl:right-10
            "
          />

          {/* MAROON GLOW */}

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
              sm:-left-24
              sm:-top-24
              sm:h-64
              sm:w-64
            "
          />

          {/* GOLD GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -right-20
              h-48
              w-48
              rounded-full
              bg-[#C6A15B]/[0.08]
              opacity-0
              blur-3xl
              transition-opacity
              duration-700
              group-hover:opacity-100
              sm:-bottom-28
              sm:-right-28
              sm:h-64
              sm:w-64
            "
          />

          {/* FEATURED CONTENT */}

          <div
            className="
              relative
              z-10
              grid
              items-center
              gap-7
              md:grid-cols-[190px_1fr]
              md:gap-8
              lg:grid-cols-[210px_1fr]
              lg:gap-10
              xl:grid-cols-[250px_1fr]
              xl:gap-12
            "
          >
            {/* VC IMAGE */}

            <div
              className="
                mx-auto
                w-full
                max-w-[180px]
                sm:max-w-[200px]
                md:max-w-[190px]
                lg:max-w-[210px]
                xl:max-w-[250px]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[16px]
                  border
                  border-[#7A1B2F]/20
                  bg-[#DCD3A4]
                  p-1
                  sm:rounded-[18px]
                "
              >
                <img
                  src={viceChancellor.image}
                  alt={viceChancellor.name}
                  className="
                    h-full
                    w-full
                    rounded-[12px]
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.03]
                    sm:rounded-[14px]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-2
                    rounded-[11px]
                    border
                    border-[#C6A15B]/30
                    sm:rounded-[13px]
                  "
                />
              </div>
            </div>

            {/* VC MESSAGE */}

            <div className="min-w-0">
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                  sm:mb-5
                "
              >
                <span
                  className="
                    h-px
                    w-8
                    bg-[#C6A15B]
                    sm:w-10
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#7A1B2F]
                    sm:text-[9px]
                    sm:tracking-[0.28em]
                    md:text-[10px]
                  "
                >
                  Vice-Chancellor's Message
                </span>
              </div>

              <blockquote
                className="
                  max-w-[900px]
                  font-serif
                  text-[clamp(1.25rem,3vw,2.7rem)]
                  italic
                  leading-[1.3]
                  tracking-[-0.02em]
                  text-[#241018]
                  md:leading-[1.25]
                "
              >
                “{viceChancellor.message}”
              </blockquote>

              <div
                className="
                  mt-6
                  border-t
                  border-[#7A1B2F]/15
                  pt-4
                  sm:mt-8
                  sm:pt-5
                "
              >
                <h3
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#241018]
                    sm:text-[11px]
                    sm:tracking-[0.16em]
                    md:text-xs
                  "
                >
                  {viceChancellor.name}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    leading-4
                    tracking-[0.15em]
                    text-[#7A1B2F]
                    sm:mt-2
                    sm:text-[10px]
                    sm:tracking-[0.18em]
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

            MOBILE  : 1 COLUMN
            TABLET  : 3 COLUMNS
            DESKTOP : 3 COLUMNS
        ===================================================== */}

        <div
          className="
            mt-5
            grid
            w-full
            grid-cols-1
            gap-4

            sm:mt-6
            sm:grid-cols-3
            sm:gap-4

            md:gap-5

            lg:gap-6

            xl:gap-6
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

// =========================================================
// FACULTY CARD
// =========================================================

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
        min-h-[300px]
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-[#7A1B2F]/15
        bg-[#E8DFB0]/80
        p-5
        transition-all
        duration-500
        hover:border-[#7A1B2F]/30
        hover:bg-[#EEE5B8]

        sm:min-h-[300px]
        sm:rounded-[20px]
        sm:p-5

        md:min-h-[310px]
        md:p-5

        lg:min-h-[300px]
        lg:p-6

        xl:min-h-[280px]
        xl:p-7
      "
    >
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          right-6
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
          sm:left-6
          sm:right-6
          lg:left-7
          lg:right-7
        "
      />

      {/* =====================================================
          MAROON GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#7A1B2F]/[0.07]
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-[#7A1B2F]/[0.12]

          sm:-left-18
          sm:-top-18
          sm:h-44
          sm:w-44

          lg:-left-20
          lg:-top-20
          lg:h-48
          lg:w-48
        "
      />

      {/* =====================================================
          GOLD GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -right-20
          h-40
          w-40
          rounded-full
          bg-[#C6A15B]/[0.08]
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover:opacity-100

          sm:-bottom-22
          sm:-right-22
          sm:h-44
          sm:w-44

          lg:-bottom-24
          lg:-right-24
          lg:h-48
          lg:w-48
        "
      />

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          items-center
        "
      >
        {/* ===================================================
            IMAGE
        =================================================== */}

        <div
          className="
            relative
            h-[78px]
            w-[78px]
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

            sm:h-[82px]
            sm:w-[82px]

            md:h-[84px]
            md:w-[84px]

            lg:h-[90px]
            lg:w-[90px]

            xl:h-[95px]
            xl:w-[95px]
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

        {/* ===================================================
            MESSAGE
        =================================================== */}

        <div
          className="
            mt-5
            min-w-0
            w-full
            text-center

            sm:mt-5

            md:mt-5

            lg:mt-6
          "
        >
          <p
            className="
              font-serif
              text-[13px]
              italic
              leading-[1.5]
              tracking-[-0.01em]
              text-[#4A3C35]

              sm:text-[13px]

              md:text-[13px]

              lg:text-[14px]

              xl:text-[15px]
              xl:leading-[1.5]
            "
          >
            “{faculty.message}”
          </p>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mt-5

          sm:mt-5

          md:mt-5

          lg:mt-6
        "
      >
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

        {/* NAME */}

        <h3
          className="
            text-[9px]
            font-semibold
            uppercase
            leading-4
            tracking-[0.11em]
            text-[#241018]

            sm:text-[9px]
            sm:tracking-[0.11em]

            md:text-[9px]

            lg:text-[10px]
            lg:tracking-[0.13em]

            xl:text-[11px]
            xl:tracking-[0.15em]
          "
        >
          {faculty.name}
        </h3>

        {/* DESIGNATION */}

        <p
          className="
            mt-1.5
            text-[7px]
            font-semibold
            uppercase
            leading-4
            tracking-[0.11em]
            text-[#7A1B2F]

            sm:text-[7px]

            md:text-[7px]

            lg:text-[8px]
            lg:tracking-[0.13em]

            xl:text-[9px]
            xl:tracking-[0.16em]
          "
        >
          {faculty.designation}
        </p>
      </div>
    </motion.article>
  );
}