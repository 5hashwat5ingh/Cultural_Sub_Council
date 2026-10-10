
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ============================================================
// ANIMATION SETTINGS
// ============================================================

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// ============================================================
// CONTACT PAGE
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Front-end confirmation only.
    // Connect a backend or form service to deliver messages.

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // ==========================================================
  // SOCIAL LINKS
  // ==========================================================

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/csc_mmmut?stkn=MTBvb3NiNzh3OHZmeA==",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/csc-mmmut?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "#",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#DCD3A4] text-[#2B0A12]">
      <Navbar />

      <main>
        {/* ====================================================
            HERO SECTION
        ==================================================== */}

        <section className="relative flex min-h-[65vh] items-center overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:min-h-[75vh] lg:px-20">
          <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full border border-[#7A1B2F]/15 sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute -right-8 top-28 h-56 w-56 rounded-full border border-[#7A1B2F]/15 sm:h-72 sm:w-72" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 mx-auto w-full max-w-7xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#7A1B2F]"
            >
              We'd love to hear from you
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            >
              LET&apos;S START
              <br />
              <span className="font-serif italic font-normal text-[#7A1B2F]">
                a conversation.
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-xl text-base leading-7 text-[#5C514A] sm:text-lg">
                Have an idea, a question, or something exciting to share?
                We&apos;re always happy to connect. Let&apos;s create something
                memorable together.
              </p>

              <div className="flex items-center gap-3 text-sm font-semibold text-[#7A1B2F]">
                <span className="h-px w-10 bg-[#7A1B2F]" />
                GET IN TOUCH
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ====================================================
            CONTACT SECTION
        ==================================================== */}

        <section className="relative bg-[#F7EBD0] px-6 py-20 sm:px-10 sm:py-28 lg:px-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            {/* ==================================================
                CONTACT INFORMATION
            ================================================== */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#9B783A]"
              >
                The conversation starts here
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-5 text-4xl font-black leading-tight sm:text-5xl"
              >
                We are all
                <br />
                <span className="font-serif italic font-normal text-[#7A1B2F]">
                  ears.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-md leading-7 text-[#6B5147]"
              >
                Whether you&apos;re interested in collaborating, joining an
                event, or simply saying hello, drop us a message. We&apos;d love
                to hear what&apos;s on your mind.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 space-y-6"
              >
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2B0A12] text-[#D9B86C]">
                    <FaEnvelope />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B783A]">
                      Email
                    </p>

                    <p className="mt-2 break-all text-sm text-[#2B0A12] sm:text-base">
                      Get in touch through our official email.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2B0A12] text-[#D9B86C]">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9B783A]">
                      Find us
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#2B0A12] sm:text-base">
                      Your campus, your community, your creative space.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                variants={fadeUp}
                className="mt-12"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B783A]">
                  Find us on social media
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {socialLinks.map(({ name, icon: Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      aria-label={name}
                      title={name}
                      target={href === "#" ? undefined : "_blank"}
                      rel={href === "#" ? undefined : "noreferrer"}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7A1B2F]/25 text-[#7A1B2F] transition-all duration-300 hover:-translate-y-1 hover:border-[#2B0A12] hover:bg-[#2B0A12] hover:text-[#F7EBD0]"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ==================================================
                CONTACT FORM
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease }}
              className="rounded-3xl border border-[#C6A15B]/40 bg-[#F5EFD0] p-6 shadow-[0_20px_60px_rgba(43,10,18,0.07)] sm:p-10 lg:p-12"
            >
              <div className="mb-9">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9B783A]">
                  Send us a message
                </p>

                <h3 className="mt-3 text-3xl font-black sm:text-4xl">
                  What&apos;s on your mind?
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6B5147]">
                  Fill in the details below and let&apos;s get the conversation
                  going.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#7A1B2F]"
                    >
                      Your name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-[#C6A15B]/40 bg-[#F7EBD0] px-4 py-3.5 text-sm text-[#2B0A12] outline-none transition focus:border-[#7A1B2F] focus:ring-2 focus:ring-[#7A1B2F]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#7A1B2F]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#C6A15B]/40 bg-[#F7EBD0] px-4 py-3.5 text-sm text-[#2B0A12] outline-none transition focus:border-[#7A1B2F] focus:ring-2 focus:ring-[#7A1B2F]/10"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#7A1B2F]"
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
                    className="w-full rounded-xl border border-[#C6A15B]/40 bg-[#F7EBD0] px-4 py-3.5 text-sm text-[#2B0A12] outline-none transition focus:border-[#7A1B2F] focus:ring-2 focus:ring-[#7A1B2F]/10"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#7A1B2F]"
                  >
                    Your message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full resize-y rounded-xl border border-[#C6A15B]/40 bg-[#F7EBD0] px-4 py-3.5 text-sm text-[#2B0A12] outline-none transition focus:border-[#7A1B2F] focus:ring-2 focus:ring-[#7A1B2F]/10"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#2B0A12] px-7 py-4 text-sm font-bold uppercase tracking-widest text-[#F7EBD0] transition-all duration-300 hover:bg-[#7A1B2F] hover:shadow-lg sm:w-auto"
                >
                  Send message

                  <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                {/* Success message */}
                <AnimatePresence>
                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      role="status"
                      className="rounded-xl border border-[#7BA66B]/40 bg-[#7BA66B]/10 p-4 text-sm leading-6 text-[#2B0A12]"
                    >
                      Thank you for reaching out! 💛 Your form was submitted
                      on this page, but no email has been sent yet because
                      the form is not connected to a backend.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </div>
  );
}

