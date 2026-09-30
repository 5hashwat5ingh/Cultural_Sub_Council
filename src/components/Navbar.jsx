import React, { useState } from "react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import { Link } from "react-router-dom";


export default function Navbar({
  Gallery = false,
  Events = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);


  /* =========================================================
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================================================
     MOBILE MENU ANIMATION
  ========================================================= */

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -12,
      transition: {
        duration: 0.2,
      },
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },

    exit: {
      opacity: 0,
      y: -12,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };


  return (
    <motion.header
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -20 }
      }

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.1,
      }}

      className={`
        ${Gallery ? "absolute" : "fixed"}

        top-0
        left-0
        w-full
        z-50

        px-5
        py-5

        sm:px-8
        sm:py-6

        lg:px-16
        lg:py-7

        flex
        items-center
        justify-between

        pointer-events-auto

        ${Events ? "bg-white" : "bg-[#2B0A12]"}
      `}
    >

      {/* =====================================================
          LOGO / BRAND
      ===================================================== */}

      <Link
        to="/"
        onClick={closeMenu}

        className="
          group
          flex
          items-center
          gap-2.5
          sm:gap-3
          transition-opacity
          duration-300
          hover:opacity-80
          min-w-0
        "

        aria-label="Cultural Sub Council Home"
      >

        <img
          src="/Logo.png"
          alt="Cultural Sub Council"

          className="
            h-9
            w-auto
            shrink-0
            object-contain

            sm:h-10

            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        <span
          className="
            hidden
            text-sm
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#EDEDED]

            sm:block
            sm:text-base
            sm:tracking-[0.18em]
          "
        >
          CULTURAL SUB COUNCIL
        </span>

        {/* Short mobile brand */}

        <span
          className="
            block
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-[#EDEDED]

            sm:hidden
          "
        >
          CULTURAL SUB COUNCIL
        </span>

      </Link>


      {/* =====================================================
          DESKTOP NAVIGATION
      ===================================================== */}

      <nav
        aria-label="Main Navigation"
        className="hidden lg:block"
      >

        <ul
          className="
            flex
            items-center
            gap-7
            xl:gap-10

            text-[11px]
            xl:text-xs

            uppercase
            tracking-[0.22em]
            font-medium
            text-[#A3A3A3]
          "
        >

          {/* HOME */}

          <li>
            <Link
              to="/"
              className="
                nav-link
                py-1
                transition-colors
                duration-300
                hover:text-[#EDEDED]
              "
            >
              Home
            </Link>
          </li>


         

         


          {/* CLUBS */}

          <li>
            <Link
              to="/clubs"
              className="
                nav-link
                py-1
                transition-colors
                duration-300
                hover:text-[#EDEDED]
              "
            >
              Clubs
            </Link>
          </li>
          {/* EVENTS */}

          <li>
            <Link
              to="/events"
              className="
                nav-link
                py-1
                transition-colors
                duration-300
                hover:text-[#EDEDED]
              "
            >
              Events
            </Link>
          </li>
          {/* Teams */}
           <li>
            <Link
              to="/#institution"
              className="
                nav-link
                py-1
                transition-colors
                duration-300
                hover:text-[#EDEDED]
              "
            >
              Teams
            </Link>
          </li>


          {/* GALLERY */}

          <li>
            <Link
              to="/gallery"
              className="
                nav-link
                py-1
                transition-colors
                duration-300
                hover:text-[#EDEDED]
              "
            >
              Gallery
            </Link>
          </li>

          {/* CONTACT */}

          <li>

            <Link
              to="/#contact"

              className="
                group
                relative
                inline-flex
                items-center
                gap-2

                overflow-hidden
                rounded-full

                border
                border-white/20

                px-5
                py-2.5

                text-[10px]
                xl:text-[11px]

                font-medium
                uppercase
                tracking-[0.2em]

                text-[#EDEDED]

                transition-all
                duration-500

                hover:border-white/40
                hover:-translate-y-0.5
              "
            >

              {/* Hover background */}

              <span
                className="
                  absolute
                  inset-0

                  -translate-x-full

                  bg-[#EDEDED]

                  transition-transform
                  duration-500

                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  group-hover:translate-x-0
                "
              />


              {/* Text */}

              <span
                className="
                  relative
                  z-10

                  transition-colors
                  duration-500

                  group-hover:text-[#0A0A0A]
                "
              >
                Contact
              </span>

            </Link>

          </li>

        </ul>

      </nav>


      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      <button
        type="button"

        onClick={() =>
          setMenuOpen((prev) => !prev)
        }

        className="
          relative
          z-[60]

          flex
          h-10
          w-10

          items-center
          justify-center

          rounded-full

          border
          border-white/20

          text-[#EDEDED]

          transition-all
          duration-300

          hover:border-[#C6A15B]/70
          hover:text-[#C6A15B]

          lg:hidden
        "

        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }

        aria-expanded={menuOpen}
      >

        <span className="relative h-4 w-5">

          {/* Top */}

          <motion.span
            animate={
              menuOpen
                ? {
                    rotate: 45,
                    y: 7,
                  }
                : {
                    rotate: 0,
                    y: 0,
                  }
            }

            transition={{
              duration: 0.25,
            }}

            className="
              absolute
              left-0
              top-0

              h-[1.5px]
              w-5

              bg-current
            "
          />


          {/* Middle */}

          <motion.span
            animate={{
              opacity: menuOpen ? 0 : 1,
              x: menuOpen ? 5 : 0,
            }}

            transition={{
              duration: 0.2,
            }}

            className="
              absolute
              left-0
              top-[7px]

              h-[1.5px]
              w-5

              bg-current
            "
          />


          {/* Bottom */}

          <motion.span
            animate={
              menuOpen
                ? {
                    rotate: -45,
                    y: -7,
                  }
                : {
                    rotate: 0,
                    y: 0,
                  }
            }

            transition={{
              duration: 0.25,
            }}

            className="
              absolute
              left-0
              top-[14px]

              h-[1.5px]
              w-5

              bg-current
            "
          />

        </span>

      </button>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (

          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"

            className="
              absolute

              left-4
              right-4
              top-[76px]

              overflow-hidden

              rounded-2xl

              border
              border-[#C6A15B]/20

              bg-[#1D070D]/98

              shadow-2xl
              shadow-black/30

              backdrop-blur-xl

              lg:hidden
            "
          >

            <nav
              aria-label="Mobile Navigation"
              className="p-5"
            >

              <div className="flex flex-col">


                {/* HOME */}

                <Link
                  to="/"
                  onClick={closeMenu}

                  className="
                    border-b
                    border-white/10

                    py-4

                    text-sm
                    uppercase
                    tracking-[0.2em]

                    text-[#D8C7AA]

                    transition-colors
                    duration-300

                    hover:text-[#D9B86C]
                  "
                >
                  Home
                </Link>

                {/* CLUBS */}

                <Link
                  to="/clubs"
                  onClick={closeMenu}

                  className="
                    border-b
                    border-white/10

                    py-4

                    text-sm
                    uppercase
                    tracking-[0.2em]

                    text-[#D8C7AA]

                    transition-colors
                    duration-300

                    hover:text-[#D9B86C]
                  "
                >
                  Clubs
                </Link>
                {/* EVENTS */}

                <Link
                  to="/events"
                  onClick={closeMenu}

                  className="
                    border-b
                    border-white/10

                    py-4

                    text-sm
                    uppercase
                    tracking-[0.2em]

                    text-[#D8C7AA]

                    transition-colors
                    duration-300

                    hover:text-[#D9B86C]
                  "
                >
                  Events
                </Link>
{/* INSTITUTION */}

                <Link
                  to="/#institution"
                  onClick={closeMenu}

                  className="
                    border-b
                    border-white/10

                    py-4

                    text-sm
                    uppercase
                    tracking-[0.2em]

                    text-[#D8C7AA]

                    transition-colors
                    duration-300

                    hover:text-[#D9B86C]
                  "
                >
                  Team
                </Link>

                {/* GALLERY */}

                <Link
                  to="/gallery"
                  onClick={closeMenu}

                  className="
                    border-b
                    border-white/10

                    py-4

                    text-sm
                    uppercase
                    tracking-[0.2em]

                    text-[#D8C7AA]

                    transition-colors
                    duration-300

                    hover:text-[#D9B86C]
                  "
                >
                  Gallery
                </Link>


                


                {/* CONTACT */}

                <Link
                  to="/#contact"
                  onClick={closeMenu}

                  className="
                    mt-5

                    flex
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#C6A15B]/50

                    px-5
                    py-3

                    text-xs
                    uppercase
                    tracking-[0.2em]

                    text-[#F7EBD0]

                    transition-all
                    duration-300

                    hover:border-[#D9B86C]
                    hover:bg-[#C6A15B]
                    hover:text-[#2B0A12]
                  "
                >
                  Contact
                </Link>

              </div>

            </nav>

          </motion.div>

        )}
      </AnimatePresence>

    </motion.header>
  );
}