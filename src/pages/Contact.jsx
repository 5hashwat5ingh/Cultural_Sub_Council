import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

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
      Replace this with your backend / email service later.
    */

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#DCD3A4] text-[#2B0A12]">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[82vh] w-full overflow-hidden">

        {/* Atmospheric glows */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#7A1B2F]/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-32
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C6A15B]/15
            blur-[130px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-180px]
            left-1/2
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#F5EFD0]/60
            blur-[120px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[82vh]
            max-w-7xl
            flex-col
            justify-center
            px-6
            pt-28
            pb-16
            sm:px-10
            lg:px-16
            lg:pt-32
          "
        >

          {/* Small heading */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#7A1B2F] sm:w-16" />

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
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-5xl
              text-[clamp(3.5rem,9vw,8.5rem)]
              font-semibold
              uppercase
              leading-[0.88]
              tracking-[-0.055em]
              text-[#3A0D18]
            "
          >
            LET'S
            <br />
            CREATE
            <br />
            TOGETHER.
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              mt-8
              max-w-2xl
              text-base
              leading-relaxed
              text-[#5A4038]
              sm:text-lg
              lg:text-xl
            "
          >
            Have an idea, want to collaborate, or simply want to
            connect with the Cultural Sub Council? We would love
            to hear from you.
          </motion.p>

          {/* Bottom metadata */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
            className="
              mt-14
              grid
              grid-cols-2
              gap-8
              border-t
              border-[#7A1B2F]/20
              pt-6
              sm:grid-cols-3
              lg:max-w-3xl
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

      </section>

      {/* =========================================================
          CONTACT SECTION
      ========================================================= */}

      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-[#F5EFD0]
          px-6
          py-20
          sm:px-10
          sm:py-24
          lg:px-16
          lg:py-28
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

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-7xl
            gap-14
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-20
          "
        >

          {/* =====================================================
              LEFT INFORMATION
          ===================================================== */}

          <div className="flex flex-col justify-between">

            <div>

              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C6A15B]" />

                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-[#7A1B2F]
                  "
                >
                  Start A Conversation
                </span>
              </div>

              <h2
                className="
                  max-w-xl
                  text-4xl
                  font-semibold
                  uppercase
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-[#3A0D18]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Your idea
                <br />
                starts here.
              </h2>

              <p
                className="
                  mt-7
                  max-w-md
                  text-base
                  leading-relaxed
                  text-[#6B5147]
                  sm:text-lg
                "
              >
                Whether it is a cultural collaboration, event
                proposal, club-related query, or something
                completely new, reach out to the Cultural Sub
                Council.
              </p>

            </div>

            {/* Contact details */}

            <div className="mt-14 space-y-8 lg:mt-20">

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
                    text-base
                    font-medium
                    text-[#3A0D18]
                  "
                >
                  Madan Mohan Malaviya University of Technology
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

                <div className="mt-3 flex flex-wrap gap-5">

                  <a
                  
                    href="https://www.instagram.com/csc_mmmut?stkn=MTBvb3NiNzh3OHZmeA=="
                    className="
                      text-sm
                      font-medium
                      text-[#3A0D18]
                      underline
                      decoration-[#C6A15B]
                      underline-offset-4
                      transition-colors
                      hover:text-[#7A1B2F]
                    "
                  >
                    Instagram
                  </a>

                  <a
                    href="https://www.linkedin.com/in/csc-mmmut?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    className="
                      text-sm
                      font-medium
                      text-[#3A0D18]
                      underline
                      decoration-[#C6A15B]
                      underline-offset-4
                      transition-colors
                      hover:text-[#7A1B2F]
                    "
                  >
                    LinkedIn
                  </a>

                </div>
              </div>

            </div>

          </div>

          {/* =====================================================
              FORM
          ===================================================== */}

          <motion.div
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              rounded-2xl
              border
              border-[#7A1B2F]/10
              bg-[#DCD3A4]/45
              p-6
              sm:p-8
              lg:p-10
            "
          >

            {/* Form top label */}

            <div className="mb-10 flex items-center justify-between">

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
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-[#8F7663]
                "
              >
                01 / 01
              </span>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

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
                    placeholder:text-[#8F7663]/70
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
                    placeholder:text-[#8F7663]/70
                    transition-colors
                    focus:border-[#7A1B2F]
                  "
                />
              </div>

              {/* Subject */}

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
                    placeholder:text-[#8F7663]/70
                    transition-colors
                    focus:border-[#7A1B2F]
                  "
                />
              </div>

              {/* Message */}

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
                  rows="4"
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
                    placeholder:text-[#8F7663]/70
                    transition-colors
                    focus:border-[#7A1B2F]
                  "
                />
              </div>

              {/* Submit */}

              <div className="pt-3">

                <button
                  type="submit"
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
                      h-8
                      w-8
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

              {submitted && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    text-center
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#7A1B2F]
                  "
                >
                  Thank you — we'll get back to you.
                </motion.p>
              )}

            </form>

          </motion.div>

        </div>

      </section>

      {/* =========================================================
          CLOSING SECTION
      ========================================================= */}

     

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />

    </div>
  );
}