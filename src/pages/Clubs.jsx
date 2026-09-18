import React from "react";
import { motion } from "framer-motion";

const clubs = [
  {
    number: "01",
    name: "Dance Club",
    category: "MOVEMENT / PERFORMANCE",
    description:
      "A space where rhythm, movement and expression come together to create unforgettable performances.",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    name: "Dramatics Club",
    category: "THEATRE / STORYTELLING",
    description:
      "Exploring stories, characters and emotions through theatre, acting and stagecraft.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    name: "Music Club",
    category: "MUSIC / PERFORMANCE",
    description:
      "From melodies to live performances, a platform for voices, instruments and musical expression.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "04",
    name: "Fine Arts Club",
    category: "ART / CREATIVITY",
    description:
      "A canvas for imagination, bringing ideas to life through colours, forms and visual expression.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "05",
    name: "Photography Club",
    category: "VISUALS / STORYTELLING",
    description:
      "Capturing moments, people and perspectives that tell the story of our campus.",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "06",
    name: "Technical & Design Club",
    category: "DESIGN / TECHNOLOGY",
    description:
      "Where creativity meets technology through design, digital experiences and visual communication.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
  },
];
export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EDEDED]">

      {/* ========================================= */}
      {/* PAGE HEADER                               */}
      {/* ========================================= */}

      <section className="px-6 pb-20 pt-36 sm:px-12 sm:pt-44 lg:px-20 lg:pb-28">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 sm:text-xs">
              Cultural Sub Council
            </span>

            <span className="h-px w-12 bg-white/20" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-5xl
              text-[clamp(4rem,9vw,9rem)]
              font-semibold
              leading-[0.85]
              tracking-[-0.06em]
            "
          >
            Where
            <br />
            <span className="text-white/35">
              Creativity Lives.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-10
              max-w-xl
              text-sm
              leading-7
              text-white/45
              sm:text-base
            "
          >
            Explore the creative communities that bring
            talent, expression and culture to life across
            our campus.
          </motion.p>

        </div>
      </section>


      {/* ========================================= */}
      {/* CLUBS                                     */}
      {/* ========================================= */}

      <section className="px-6 pb-32 sm:px-12 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="border-t border-white/10">

            {clubs.map((club, index) => (
              <motion.article
                key={club.name}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group
                  border-b
                  border-white/10
                "
              >

                <div
                  className="
                    flex
                    min-h-[220px]
                    flex-col
                    gap-8
                    py-10
                    sm:py-14
                    lg:min-h-[260px]
                    lg:flex-row
                    lg:items-center
                    lg:gap-12
                  "
                >

                  {/* NUMBER */}

                  <span
                    className="
                      w-8
                      shrink-0
                      text-[10px]
                      tracking-[0.2em]
                      text-white/25
                    "
                  >
                    {club.number}
                  </span>


                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-[200px]
                      w-full
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      bg-white/5
                      sm:h-[250px]
                      lg:h-[180px]
                      lg:w-[300px]
                    "
                  >
                    <img
                      src={club.image}
                      alt={club.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        grayscale
                        transition-all
                        duration-700
                        group-hover:scale-105
                        group-hover:grayscale-0
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/20
                        transition-opacity
                        duration-500
                        group-hover:opacity-0
                      "
                    />
                  </div>


                  {/* CONTENT */}

                  <div className="flex-1">

                    <p
                      className="
                        mb-3
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-white/30
                      "
                    >
                      {club.category}
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-medium
                        tracking-[-0.04em]
                        transition-transform
                        duration-500
                        group-hover:translate-x-2
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      {club.name}
                    </h2>

                    <p
                      className="
                        mt-4
                        max-w-xl
                        text-sm
                        leading-6
                        text-white/40
                      "
                    >
                      {club.description}
                    </p>

                  </div>


                  {/* ARROW */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      text-lg
                      text-white/40
                      transition-all
                      duration-500
                      group-hover:border-white/30
                      group-hover:bg-white
                      group-hover:text-black
                    "
                  >
                    <span
                      className="
                        transition-transform
                        duration-500
                        group-hover:rotate-45
                      "
                    >
                      ↗
                    </span>
                  </div>

                </div>

              </motion.article>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}