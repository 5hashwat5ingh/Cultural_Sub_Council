import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ============================================================
// ANIMATIONS
// ============================================================

const ease = [0.22, 1, 0.36, 1];

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
      ease,
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
      ease,
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
      ease,
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

// ============================================================
// CONTACT
// ============================================================

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ==========================================================
  // FORM HANDLING
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      Add your backend / email service here later.
    */

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Keep the success state visible
    // for a few seconds.
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#DCD3A4] text-[#2B0A12]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar Gallery />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* Ambient glow — left */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[480px]
            w-[480px]
            rounded-full
            bg-[#7A1B2F]/10
            blur-[130px]
          "
        />

        {/* Ambient glow — right */}

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-28
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#C6A15B]/12
            blur-[140px]
          "
        />

        {/* Bottom light */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-220px]
            left-1/2
            h-[520px]
            w-[800px]
            -translate-x-1/2
            rounded-full
            bg-[#F5EFD0]/70
            blur-[130px]
          "
        />

        {/* Decorative circle */}

        <div
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-[32%]
            hidden
            h-40
            w-40
            rounded-full
            border
            border-[#C6A15B]/30
            lg:block
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[11%]
            top-[35%]
            hidden
            h-24
            w-24
            rounded-full
            border
            border-[#7A1B2F]/15
            lg:block
          "
        />

        {/* Hero content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            max-w-[1500px]
            flex-col
            justify-center
            px-6
            pb-20
            pt-32
            sm:px-10
            lg:px-20
            lg:pt-36
          "
        >

          {/* Eyebrow */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-[#7A1B2F] sm:w-16" />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-[#7A1B2F]
                sm:text-xs
              "
            >
              Get In Touch
            </span>
          </motion.div>

          {/* Main heading */}

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="
              max-w-6xl
              text-[clamp(4rem,10vw,10rem)]
              font-semibold
              uppercase
              leading-[0.82]
              tracking-[-0.065em]
              text-[#2B0A12]
            "
          >
            LET'S

            <br />

            <span className="text-[#7A1B2F]">
              CREATE
            </span>

            <br />

            TOGETHER.
          </motion.h1>

          {/* Description */}

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="
              mt-9
              max-w-2xl
              text-base
              leading-8
              text-[#5A4038]
              sm:text-lg
              lg:text-xl
            "
          >
            Have an idea, want to collaborate, or simply want
            to connect with the Cultural Sub Council?
            We would love to hear from you.
          </motion.p>

          {/* Metadata */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="
              mt-14
              grid
              max-w-4xl
              grid-cols-2
              gap-x-8
              gap-y-8
              border-t
              border-[#7A1B2F]/20
              pt-6
              sm:grid-cols-3
            "
          >

            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-[#8F7663]
                "
              >
                Location
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-[#3A0D18]
                  sm:text-base
                "
              >
                Gorakhpur, Uttar Pradesh
              </p>
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-[#8F7663]
                "
              >
                Community
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-[#3A0D18]
                  sm:text-base
                "
              >
                Cultural Sub Council
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-[#8F7663]
                "
              >
                Purpose
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-[#3A0D18]
                  sm:text-base
                "
              >
                Create · Collaborate · Celebrate
              </p>
            </div>

          </motion.div>

        </div>

        {/* Scroll indicator */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="
            absolute
            bottom-8
            left-1/2
            z-10
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-3
            sm:flex
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-[#8F7663]
            "
          >
            Scroll
          </span>

          <div className="h-10 w-px bg-[#7A1B2F]/25" />
        </motion.div>

      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#F5EFD0]
          px-6
          py-24
          sm:px-10
          sm:py-28
          lg:px-20
          lg:py-32
        "
      >

        {/* Ambient background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/10
            blur-[130px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#7A1B2F]/5
            blur-[120px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1450px]">

          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-14"
          >

            <div className="flex items-center gap-4">

              <span className="h-px w-12 bg-[#C6A15B]" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#7A1B2F]
                  sm:text-xs
                "
              >
                Start A Conversation
              </span>

            </div>

          </motion.div>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div
            className="
              grid
              gap-14
              lg:grid-cols-[0.75fr_1.25fr]
              lg:gap-20
              xl:gap-28
            "
          >

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col justify-between"
            >

              <div>

                <h2
                  className="
                    max-w-xl
                    text-[clamp(2.8rem,5vw,5.5rem)]
                    font-semibold
                    uppercase
                    leading-[0.9]
                    tracking-[-0.055em]
                    text-[#3A0D18]
                  "
                >
                  Your idea

                  <br />

                  <span className="text-[#7A1B2F]">
                    starts here.
                  </span>
                </h2>

                <p
                  className="
                    mt-8
                    max-w-md
                    text-base
                    leading-8
                    text-[#6B5147]
                    sm:text-lg
                  "
                >
                  Whether it is a cultural collaboration,
                  event proposal, club-related query,
                  or something completely new, reach
                  out to the Cultural Sub Council.
                </p>

              </div>

              {/* Contact information */}

              <div className="mt-14 space-y-9 lg:mt-20">

                {/* Visit */}

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-[#8F7663]
                    "
                  >
                    Visit
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-sm
                      text-base
                      font-medium
                      leading-7
                      text-[#3A0D18]
                    "
                  >
                    Madan Mohan Malaviya University
                    of Technology
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-[#6B5147]
                    "
                  >
                    Gorakhpur, Uttar Pradesh, India
                  </p>
                </div>

                {/* Social */}

                <div>

                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-[#8F7663]
                    "
                  >
                    Connect
                  </p>

                  <div className="mt-4 flex gap-3">

                    <a
                      href="https://www.instagram.com/csc_mmmut?stkn=MTBvb3NiNzh3OHZmeA=="
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#7A1B2F]/15
                        text-[#3A0D18]
                        transition-all
                        duration-300
                        hover:border-[#C6A15B]
                        hover:bg-[#2B0A12]
                        hover:text-[#F7EBD0]
                      "
                    >
                      <FaInstagram />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/csc-mmmut?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#7A1B2F]/15
                        text-[#3A0D18]
                        transition-all
                        duration-300
                        hover:border-[#C6A15B]
                        hover:bg-[#2B0A12]
                        hover:text-[#F7EBD0]
                      "
                    >
                      <FaLinkedinIn />
                    </a>

                    <a
                      href="#"
                      aria-label="YouTube"
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#7A1B2F]/15
                        text-[#3A0D18]
                        transition-all
                        duration-300
                        hover:border-[#C6A15B]
                        hover:bg-[#2B0A12]
                        hover:text-[#F7EBD0]
                      "
                    >
                      <FaYoutube />
                    </a>

                    <a
                      href="#"
                      aria-label="Facebook"
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#7A1B2F]/15
                        text-[#3A0D18]
                        transition-all
                        duration-300
                        hover:border-[#C6A15B]
                        hover:bg-[#2B0A12]
                        hover:text-[#F7EBD0]
                      "
                    >
                      <FaFacebookF />
                    </a>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* =================================================
                FORM
            ================================================= */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-[#7A1B2F]/10
                bg-[#DCD3A4]/45
                p-6
                sm:p-8
                lg:p-10
                xl:p-12
              "
            >

              {/* Decorative gold circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  border
                  border-[#C6A15B]/20
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  border
                  border-[#7A1B2F]/10
                "
              />

              {/* Form header */}

              <div className="relative z-10 mb-10 flex items-center justify-between">

                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-[#7A1B2F]
                  "
                >
                  Send A Message
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#8F7663]
                  "
                >
                  CSC / 01
                </span>

              </div>

              <form
                onSubmit={handleSubmit}
                className="relative z-10 space-y-7"
              >

                {/* =================================================
                    NAME + EMAIL
                ================================================= */}

                <div className="grid gap-7 sm:grid-cols-2">

                  {/* Name */}

                  <div>

                    <label
                      htmlFor="name"
                      className="
                        mb-2
                        block
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-[#7A1B2F]
                      "
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="
                        w-full
                        border-b
                        border-[#7A1B2F]/20
                        bg-transparent
                        px-0
                        py-3
                        text-base
                        text-[#3A0D18]
                        outline-none
                        placeholder:text-[#8F7663]/60
                        transition-colors
                        focus:border-[#7A1B2F]
                      "
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-[#7A1B2F]
                      "
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="
                        w-full
                        border-b
                        border-[#7A1B2F]/20
                        bg-transparent
                        px-0
                        py-3
                        text-base
                        text-[#3A0D18]
                        outline-none
                        placeholder:text-[#8F7663]/60
                        transition-colors
                        focus:border-[#7A1B2F]
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    SUBJECT
                ================================================= */}

                <div>

                  <label
                    htmlFor="subject"
                    className="
                      mb-2
                      block
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.25em]
                      text-[#7A1B2F]
                    "
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    className="
                      w-full
                      border-b
                      border-[#7A1B2F]/20
                      bg-transparent
                      px-0
                      py-3
                      text-base
                      text-[#3A0D18]
                      outline-none
                      placeholder:text-[#8F7663]/60
                      transition-colors
                      focus:border-[#7A1B2F]
                    "
                  />

                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div>

                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.25em]
                      text-[#7A1B2F]
                    "
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your idea..."
                    className="
                      w-full
                      resize-none
                      border-b
                      border-[#7A1B2F]/20
                      bg-transparent
                      px-0
                      py-3
                      text-base
                      text-[#3A0D18]
                      outline-none
                      placeholder:text-[#8F7663]/60
                      transition-colors
                      focus:border-[#7A1B2F]
                    "
                  />

                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <div className="pt-4">

                  <button
                    type="submit"
                    disabled={submitted}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-full
                      bg-[#2B0A12]
                      px-6
                      py-4
                      text-left
                      transition-all
                      duration-300
                      hover:bg-[#7A1B2F]
                      disabled:cursor-default
                      disabled:opacity-80
                      sm:px-7
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        text-[#F7EBD0]
                      "
                    >
                      {submitted
                        ? "Message Sent"
                        : "Send Message"}
                    </span>

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#C6A15B]
                        text-[#2B0A12]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>

                  </button>

                </div>

              </form>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUCCESS ALERT
      ===================================================== */}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: -30,
              x: "-50%",
            }}
            transition={{
              duration: 0.45,
              ease,
            }}
            className="
              fixed
              left-1/2
              top-5
              z-[100]
              flex
              w-[calc(100%-2rem)]
              max-w-md
              items-center
              gap-4
              rounded-2xl
              border
              border-[#C6A15B]/40
              bg-[#1D070D]
              px-5
              py-4
              text-[#F7EBD0]
              shadow-[0_20px_60px_rgba(29,7,13,0.25)]
              sm:top-7
              sm:px-6
            "
            role="alert"
          >

            {/* Success icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#C6A15B]
                text-lg
                font-semibold
                text-[#2B0A12]
              "
            >
              ✓
            </div>

            <div>

              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#F7EBD0]
                "
              >
                Thank You!
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#D8C7AA]
                "
              >
                Thank you for your message. We will
                get back to you soon.
              </p>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </main>
  );
}