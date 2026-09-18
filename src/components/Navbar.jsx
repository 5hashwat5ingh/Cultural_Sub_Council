import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from "react-router-dom";
export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : 0.1,
      }}
      className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 lg:px-16 py-7 flex items-center justify-between pointer-events-auto"
    >
     <a
  href="#Home"
  className="
    group
    flex
    items-center
    gap-3
    transition-opacity
    duration-300
    hover:opacity-80
  "
  aria-label="Cultural Sub Council Home"
>
  <img
    src="/Logo.png"
    alt="Cultural Sub Council"
    className="
      h-10
      w-auto
      object-contain
      transition-transform
      duration-500
      group-hover:scale-105
    "
  />

  <span
    className="
      text-sm
      font-semibold
      uppercase
      tracking-[0.18em]
      text-[#EDEDED]
      sm:text-base
    "
  >
    CULTURAL SUB COUNCIL
  </span>
</a>

      {/* Navigation Links */}
      <nav aria-label="Main Navigation">
        <ul className="flex items-center gap-7 sm:gap-10 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium text-[#A3A3A3]">
          <li>
             <Link
  to="/"
  className="nav-link py-1"
>
  Home
</Link>
          </li>
          <li>
            <a
              href="#institution"
              className="nav-link text-[#A3A3A3] hover:text-[#EDEDED] transition-colors duration-300 py-1"
            >
              Institution
            </a>
          </li>
          <li>
            <li>
  <Link
  to="/clubs"
  className="nav-link py-1"
>
  Clubs
</Link>
</li>
          </li>
          <li>
            <a
              href="#gallery"
              className="nav-link text-[#A3A3A3] hover:text-[#EDEDED] transition-colors duration-300 py-1"
            >
              Gallery
            </a>
          </li>
          <li>
             <Link
  to="/events"
  className="nav-link py-1"
>
  Events
</Link>
          </li>
          <li>
  <a
    href="#contact"
    className="
      group relative
      inline-flex items-center gap-2
      overflow-hidden
      rounded-full
      border border-white/20
      px-5 py-2.5
      text-[10px] sm:text-[11px]
      font-medium
      uppercase
      tracking-[0.2em]
      text-[#EDEDED]
      transition-all duration-500
      hover:border-white/40
      hover:-translate-y-0.5
    "
  >
    {/* Hover background */}
    <span
      className="
        absolute inset-0
        -translate-x-full
        bg-[#EDEDED]
        transition-transform duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:translate-x-0
      "
    />

    {/* Text */}
    <span
      className="
        relative z-10
        transition-colors duration-500
        group-hover:text-[#0A0A0A]
      "
    >
      Contact
    </span>

    
  </a>
</li>
        </ul>
      </nav>
    </motion.header>
  );
}
