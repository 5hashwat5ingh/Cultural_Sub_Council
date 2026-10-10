
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const heroImage =
  "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791232371/Untitled_design_4.png";

const clubs = [
  {
    number: "01",
    name: "Dance Club",
    category: "MOVEMENT / PERFORMANCE",
    description:
      "A space where rhythm, movement and expression come together to create unforgettable performances.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791236623/WhatsApp_Image_2026-10-06_at_2.17.13_AM.jpg",
    path: "/clubs/dance",
  },
  {
    number: "02",
    name: "Dramatics Club",
    category: "THEATRE / STORYTELLING",
    description:
      "Exploring stories, characters and emotions through theatre, acting and stagecraft.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237165/WhatsApp_Image_2026-10-06_at_3.21.39_AM.jpg",
    path: "/clubs/dramatics",
  },
  {
    number: "03",
    name: "Music Club",
    category: "MUSIC / PERFORMANCE",
    description:
      "From melodies to live performances, a platform for voices, instruments and musical expression.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237274/WhatsApp_Image_2026-10-06_at_3.23.09_AM.jpg",
    path: "/clubs/music",
  },
  {
    number: "04",
    name: "Fine Arts Club",
    category: "ART / CREATIVITY",
    description:
      "A canvas for imagination, bringing ideas to life through colours, forms and visual expression.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791236837/WhatsApp_Image_2026-10-06_at_3.16.20_AM.jpg",
    path: "/clubs/fine-arts",
  },
  {
    number: "05",
    name: "Technical & Photography Club",
    category: "VISUALS / STORYTELLING / DESIGN / TECHNOLOGY",
    description:
      "Where creativity meets technology through design, digital experiences and visual communication.",
    image:
      "https://res.cloudinary.com/yh0rqnnu/image/upload/v1791237315/WhatsApp_Image_2026-10-06_at_3.24.43_AM.jpg",
    path: "/clubs/technical-design",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function ClubRow({ club, index }) {
  const reverse = index % 2 !== 0;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group border-t border-[#2B0A12]/20 py-8 sm:py-12 lg:py-16"
    >
      <div
        className={`grid grid-cols-1 items-center gap-7 md:grid-cols-12 md:gap-10 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <Link
          to={club.path}
          aria-label={`Explore ${club.name}`}
          className="relative block overflow-hidden bg-[#C6B982] md:col-span-7"
        >
          <div className="relative aspect-[5/3] overflow-hidden sm:aspect-[16/9]">
            <img
              src={club.image}
              alt={club.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#19070B]/65 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

            

            <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#F7EBD0]/70 text-xl text-[#F7EBD0] transition-all duration-300 group-hover:border-[#D9B86C] group-hover:bg-[#D9B86C] group-hover:text-[#2B0A12] sm:bottom-7 sm:right-7">
              ↗
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-center md:col-span-5 md:px-2 lg:px-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#9B783A]" />
            <span className="text-[10px] font-semibold tracking-[0.19em] text-[#7A1B2F] sm:text-xs">
              {club.category}
            </span>
          </div>

          <h2 className="max-w-lg font-serif text-4xl leading-[1.05] tracking-tight text-[#2B0A12] transition-colors duration-300 group-hover:text-[#7A1B2F] sm:text-5xl lg:text-6xl">
            {club.name}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#5C514A] sm:text-base sm:leading-8">
            {club.description}
          </p>

          <div className="mt-7">
            <Link
              to={club.path}
              className="inline-flex items-center gap-4 border-b border-[#2B0A12]/40 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2B0A12] transition-all duration-300 hover:gap-6 hover:border-[#7A1B2F] hover:text-[#7A1B2F]"
            >
              Explore Club
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>

          
        </div>
      </div>
    </motion.article>
  );
}

export default function ClubsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#DCD3A4] text-[#2B0A12]">
      <Navbar Gallery />
     
{/* HERO */}

<section className="relative w-full overflow-hidden bg-[#2B0A12]">
  <img
    src={heroImage}
    alt="Cultural Sub Council"
    className="mt-3 block h-auto w-full object-contain"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-[#1A080D]/35" />
  <div className="absolute inset-0 bg-gradient-to-r from-[#1A080D]/70 via-[#1A080D]/20 to-transparent" />

  {/* Bottom gradient */}
  <div className="absolute inset-x-0 bottom-0 h-[2%] bg-gradient-to-t from-[#DCD3A4] to-transparent" />

  {/* Hero content */}
  
<div className="absolute inset-0 z-10 flex items-center justify-center">
  <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-10 lg:px-20">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="mx-auto flex max-w-5xl flex-col items-center text-center"
    >
      <motion.h1
        variants={fadeUp}
        className="font-serif text-3xl leading-[1.02] tracking-tight text-[#F7EBD0] sm:text-5xl md:text-7xl lg:text-[100px] xl:text-[110px]"
      >
        Where
        <span className="italic text-[#D9B86C] px-7">
          Creativity
        </span>
        <br />
        Lives.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mx-auto mt-3 max-w-[280px] text-center text-[11px] leading-5 text-[#F7EBD0]/90 sm:mt-5 sm:max-w-md sm:text-sm sm:leading-6 md:mt-6 md:max-w-2xl md:text-base md:leading-7"
      >
        Discover the people, passions and creative spaces that bring our
        campus to life. Find your community and make something extraordinary.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-4 flex justify-center sm:mt-6 md:mt-8"
      >
<a
  href="#explore-clubs"
  className="
    group
    relative
    inline-flex
    items-center
    justify-center
    gap-4
    overflow-hidden
    rounded-full
    border
    border-[#D9B86C]/70
    bg-[#2B0A12]/30
    px-5
    py-3
    text-[9px]
    font-semibold
    uppercase
    tracking-[0.16em]
    text-[#F7EBD0]
    shadow-[0_0_25px_rgba(217,184,108,0.08)]
    backdrop-blur-sm
    transition-all
    duration-500
    hover:border-[#D9B86C]
    hover:text-[#2B0A12]
    hover:shadow-[0_0_35px_rgba(217,184,108,0.22)]
    active:scale-[0.97]
    sm:gap-5
    sm:px-7
    sm:py-4
    sm:text-[10px]
    md:px-8
    md:py-4
    md:text-xs
  "
>
  {/* Animated gold background */}
  <span
    className="
      absolute
      inset-0
      origin-left
      scale-x-0
      rounded-full
      bg-[#D9B86C]
      transition-transform
      duration-500
      ease-out
      group-hover:scale-x-100
    "
  />

  {/* Button label */}
  <span className="relative z-10">
    Discover Our Clubs
  </span>

</a>
      </motion.div>
    </motion.div>
  </div>
</div>

</section>

      {/* CLUB DIRECTORY */}
      <section
        id="explore-clubs"
        className="mx-auto max-w-[1500px] scroll-mt-8 px-6 pb-20 pt-10 sm:px-10 sm:pt-16 lg:px-20 lg:pb-28"
      >
        

       

        <div>
          {clubs.map((club, index) => (
            <ClubRow key={club.number} club={club} index={index} />
          ))}
        </div>
      </section>

      {/* CLOSING */}
     

      <Footer />
    </main>
  );
}