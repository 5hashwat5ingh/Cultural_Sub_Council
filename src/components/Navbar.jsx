import React, { useState } from "react";

import {
motion,
AnimatePresence,
useReducedMotion,
} from "framer-motion";

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

const shouldReduceMotion = useReducedMotion();
const location = useLocation();

// Detect current page, including nested routes
const pathname = location.pathname;

const isHome = pathname === "/";
const isClubs = pathname.startsWith("/clubs");
const isEvents = pathname.startsWith("/events");
const isGallery = pathname === "/gallery";
const isTeam = pathname === "/team";

// Glass effect on Home, Clubs, and Events
const hasGlassEffect = isHome || isClubs || isEvents || isTeam;

// Text color
const textColor = hasGlassEffect ? "text-white" : "text-black";
const hoverColor = "hover:text-[#D9B86C]";

// Page-specific navbar appearance
const headerStyle = hasGlassEffect
? `${
        isEvents ? "fixed" : "absolute"
      } inset-x-0 top-0 z-[99999] w-full border-b border-white/0 bg-transparent shadow-[0_4px_30px_rgba(0,0,0,0.03)]`
: "absolute inset-x-0 top-0 z-[99999] w-full border-b border-transparent bg-transparent";

const closeMenu = () => setMenuOpen(false);

// Replace this with your direct registration URL when available.
const registrationUrl = "/events";

const navLinks = [
{ label: "Home", to: "/" },
{ label: "Clubs", to: "/clubs" },
{ label: "Events", to: "/events" },
{ label: "Teams", to: "/team" },
{ label: "Gallery", to: "/gallery" },
];

const linkClass = `     text-xs
    font-medium
    uppercase
    tracking-[0.2em]
    ${textColor}
    transition-colors
    duration-300
    ${hoverColor}
  `;

return (
<motion.header
initial={shouldReduceMotion ? false : { opacity: 0, y: -15 }}
animate={{ opacity: 1, y: 0 }}
transition={{
duration: shouldReduceMotion ? 0 : 0.5,
ease: "easeOut",
}}
className={headerStyle}
>
{/* Navbar content */} <div className="flex w-full items-center justify-between gap-4 px-2 py-3 sm:gap-6 sm:px-4 sm:py-4 lg:gap-8 lg:px-8">
{/* Logo and brand */} <Link
       to="/"
       onClick={closeMenu}
       aria-label="Cultural Sub Council Home"
       className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
     > <img
         src="/Logo.png"
         alt="Cultural Sub Council Logo"
         className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
       />
      <span
        className={`
          whitespace-nowrap
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.1em]
          ${textColor}
          transition-colors
          duration-300
          ${hoverColor}
          sm:text-sm
          sm:tracking-[0.16em]
          lg:text-base
        `}
      >
        Cultural Sub Council
      </span>
    </Link>

    {/* Desktop navigation */}
    <nav aria-label="Main navigation" className="hidden lg:block">
      <ul className="flex items-center gap-5 xl:gap-9">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        {/* Register button */}



        {/* Contact button */}
        <li>
          <Link
            to="/contact"
            className={`
              group
              relative
              inline-flex
              overflow-hidden
              rounded-full
              border
              border-[#9C762E]/60
              px-6
              py-3
              text-xs
              font-medium
              uppercase
              tracking-[0.18em]
              ${textColor}
              transition-colors
              duration-300
              hover:text-white
            `}
          >
            <span className="absolute inset-0 -translate-x-full bg-[#9C762E] transition-transform duration-300 group-hover:translate-x-0" />

            <span className="relative z-10">Contact</span>
          </Link>
        </li>

        
      </ul>
    </nav>

    {/* Mobile menu button */}
    <button
      type="button"
      onClick={() => setMenuOpen((open) => !open)}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      aria-controls="mobile-navigation"
      className={`
        relative
        z-[100001]
        flex
        h-10
        w-10
        shrink-0
        flex-col
        items-center
        justify-center
        gap-[5px]
        rounded-full
        border
        border-current/30
        ${textColor}
        transition-colors
        hover:border-[#9C762E]
        lg:hidden
      `}
    >
      <motion.span
        animate={
          menuOpen
            ? { rotate: 45, y: 6.5 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
        className={`h-[1.5px] w-5 ${
          hasGlassEffect ? "bg-white" : "bg-black"
        }`}
      />

      <motion.span
        animate={{
          opacity: menuOpen ? 0 : 1,
          x: menuOpen ? 5 : 0,
        }}
        transition={{ duration: 0.15 }}
        className={`h-[1.5px] w-5 ${
          hasGlassEffect ? "bg-white" : "bg-black"
        }`}
      />

      <motion.span
        animate={
          menuOpen
            ? { rotate: -45, y: -6.5 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
        className={`h-[1.5px] w-5 ${
          hasGlassEffect ? "bg-white" : "bg-black"
        }`}
      />
    </button>
  </div>

  {/* Mobile dropdown */}
  <AnimatePresence>
    {menuOpen && (
      <motion.div
        id="mobile-navigation"
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.25,
          ease: "easeOut",
        }}
        className="
          absolute
          left-3
          right-3
          top-full
          mt-2
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-[#F7EBD0]
          shadow-lg
          lg:hidden
        "
      >
        <nav
          aria-label="Mobile navigation"
          className="px-5 py-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="
                block
                border-b
                border-black/10
                py-4
                text-sm
                font-medium
                uppercase
                tracking-[0.2em]
                text-black
                transition-colors
                hover:text-[#9C762E]
              "
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Contact button */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="
              mb-3
              mt-5
              block
              rounded-full
              border
              border-[#9C762E]/60
              px-5
              py-3.5
              text-center
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-black
              transition-colors
              hover:bg-[#9C762E]
              hover:text-white
            "
          >
            Contact Us
          </Link>

          {/* Mobile Register button */}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>

);
}
