import React from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

import { Link } from "react-router-dom";

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/csc_mmmut?stkn=MTBvb3NiNzh3OHZmeA==",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/csc-mmmut?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@culturalsynodmmmut?si=alsnfZtmL9Qw_fl1",
    icon: FaYoutube,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/csc.mmmut/",
    icon: FaFacebookF,
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer
      id="contact"
      className="
        relative
        z-20
        w-full
        overflow-hidden
        bg-[#1D070D]
        px-6
        py-6
        sm:px-10
        sm:py-7
        lg:px-16
        lg:py-8
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-22
          h-60
          w-80
          rounded-full
          bg-[#7A1B2F]/15
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-1/3
          h-60
          w-80
          rounded-full
          bg-[#C6A15B]/5
          blur-[100px]
        "
      />

      {/* =====================================================
          MAIN FOOTER CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[1fr_1.2fr_0.7fr]
            lg:gap-8
          "
        >
          {/* =================================================
              LEFT — CULTURAL SUB COUNCIL + SECRETARY
          ================================================= */}

          <div className="max-w-xl">
            {/* LABEL */}

            <div className="mb-3 flex items-center gap-3">
              <span
                className="
                  h-2
                  w-2
                  rotate-45
                  bg-[#C9A24D]
                "
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#C9A24D]
                "
              >
                Get in Touch
              </span>
            </div>

            {/* =================================================
                SECRETARY DETAILS
            ================================================= */}

            <div
              className="
                mt-5
                border-l
                border-[#C6A15B]/40
                pl-4
              "
            >
              <p
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]/70
                "
              >
                Secretary
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-medium
                  text-[#F7EBD0]
                  sm:text-lg
                "
              >
                Vaibhav Singh
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-[#D8C7AA]/55
                "
              >
                Cultural Sub Council
              </p>


              {/* SECRETARY PHONE */}

              <a
                href="tel:+916306562892"
                className="
                  group
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[#D9B86C]
                  transition-colors
                  duration-300
                  hover:text-[#F7EBD0]
                "
              >
                <Phone
                  size={13}
                  strokeWidth={1.5}
                />

                <span>
                  +91 63065 62892
                </span>

                <ArrowUpRight
                  size={11}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            </div>

            {/* MAIN CSC EMAIL */}

            <a
              href="mailto:csc@mmmut.ac.in"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#D9B86C]
                transition-colors
                duration-300
                hover:text-[#F7EBD0]
              "
            >
              <Mail
                size={14}
                strokeWidth={1.5}
              />

              <span>
                csc@mmmut.ac.in
              </span>

              <ArrowUpRight
                size={12}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>
          </div>

          {/* =================================================
              CENTER — LOCATION MAP
          ================================================= */}

          <div className="w-full">
            {/* MAP HEADING */}

            <div className="mb-2 flex items-center gap-3">
              <MapPin
                size={14}
                strokeWidth={1.5}
                className="text-[#C9A24D]"
              />

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]/70
                "
              >
                Find Us
              </span>
            </div>

            {/* MAP */}

            <div
              className="
                relative
                h-[145px]
                w-full
                overflow-hidden
                rounded-xl
                border
                border-[#C6A15B]/20
                bg-[#2B0A12]
                sm:h-[160px]
              "
            >
              <iframe
                title="Cultural Sub Council Location"
                src="https://www.google.com/maps?q=Madan%20Mohan%20Malaviya%20University%20of%20Technology%20Gorakhpur&output=embed"
                className="
                  h-full
                  w-full
                  border-0
                  opacity-75
                  grayscale
                  transition-all
                  duration-500
                  hover:opacity-100
                  hover:grayscale-0
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* MAP BORDER */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-xl
                  ring-1
                  ring-inset
                  ring-[#C6A15B]/20
                "
              />
            </div>

            {/* LOCATION */}

            <div
              className="
                mt-2
                flex
                items-start
                gap-2
              "
            >
              <MapPin
                size={13}
                strokeWidth={1.5}
                className="
                  mt-0.5
                  shrink-0
                  text-[#C6A15B]
                "
              />

              <p
                className="
                  text-[9px]
                  leading-4
                  text-[#D8C7AA]/55
                "
              >
                Madan Mohan Malaviya University
                of Technology, Gorakhpur,
                Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* =================================================
              RIGHT — EXPLORE + SOCIAL
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-start
              lg:flex-col
              lg:gap-6
            "
          >
            {/* =================================================
                EXPLORE
            ================================================= */}

            <div>
              <p
                className="
                  mb-2
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]/60
                "
              >
                Explore
              </p>

              <div
                className="
                  flex
                  flex-col
                  gap-1.5
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                "
              >
                <Link
                  to="/"
                  className="
                    text-[#D8C7AA]/65
                    transition-colors
                    duration-300
                    hover:text-[#C6A15B]
                  "
                >
                  Home
                </Link>

                <Link
                  to="/team"
                  className="
                    text-[#D8C7AA]/65
                    transition-colors
                    duration-300
                    hover:text-[#C6A15B]
                  "
                >
                  Team
                </Link>

                <Link
                  to="/events"
                  className="
                    text-[#D8C7AA]/65
                    transition-colors
                    duration-300
                    hover:text-[#C6A15B]
                  "
                >
                  Events
                </Link>

                <Link
                  to="/gallery"
                  className="
                    text-[#D8C7AA]/65
                    transition-colors
                    duration-300
                    hover:text-[#C6A15B]
                  "
                >
                  Gallery
                </Link>

                <Link
                  to="/clubs"
                  className="
                    text-[#D8C7AA]/65
                    transition-colors
                    duration-300
                    hover:text-[#C6A15B]
                  "
                >
                  Clubs
                </Link>
              </div>
            </div>

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}

            <div>
              <p
                className="
                  mb-2
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-[#C6A15B]/60
                "
              >
                Follow Us
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="
                        group
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C6A15B]/20
                        bg-[#2B0A12]
                        text-[#D8C7AA]/65
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#C6A15B]/60
                        hover:bg-[#C6A15B]
                        hover:text-[#1D070D]
                      "
                    >
                      <Icon
                        size={14}
                        className="
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM DIVIDER
        ===================================================== */}

        <div
          className="
            mt-6
            border-t
            border-[#C9A24D]/15
            pt-3
            sm:mt-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-1
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* COPYRIGHT */}

            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-[#8F7663]
              "
            >
              © {new Date().getFullYear()} Cultural Sub Council
            </p>

            {/* TAGLINE */}

            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-[#8F7663]/70
              "
            >
              Create • Perform • Belong
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}