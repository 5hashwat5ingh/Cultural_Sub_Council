import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * TextReveal Component
 * Reusable masked text reveal with Framer Motion.
 * Splits input text by lines and words, wrapping each word in an overflow-hidden container
 * and animating it upward with a smooth cubic-bezier curve.
 * 
 * @param {string|string[]} text - Text content to reveal (supports \n for line breaks)
 * @param {string} [as='h1'] - HTML element tag
 * @param {string} [className=''] - Additional CSS classes
 * @param {number} [delay=0.5] - Initial delay before reveal starts
 * @param {number} [duration=0.9] - Duration of reveal per word
 * @param {number} [stagger=0.09] - Stagger delay between words
 * @param {number[]} [ease=[0.22, 1, 0.36, 1]] - Custom cubic-bezier easing curve
 */
export default function TextReveal({
  text,
  as: Component = 'h1',
  className = '',
  delay = 0.5,
  duration = 0.9,
  stagger = 0.09,
  ease = [0.22, 1, 0.36, 1],
}) {
  const shouldReduceMotion = useReducedMotion();

  // Normalize text input into lines
  const lines = Array.isArray(text)
    ? text
    : typeof text === 'string'
    ? text.split('\n')
    : [String(text)];

  // Container variants to orchestrate children stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  // Word item variants: masked upward translation with opacity
  const wordVariants = {
    hidden: {
      y: shouldReduceMotion ? '0%' : '110%',
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        ease: ease,
      },
    },
  };

  // Motion component based on 'as' prop
  const MotionComponent = motion[Component] || motion.h1;

  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={Array.isArray(text) ? text.join(' ') : text}
    >
      {lines.map((line, lineIdx) => {
        const words = line.trim().split(/\s+/);

        return (
          <span
            key={`line-${lineIdx}`}
            className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
          >
            {words.map((word, wordIdx) => (
              <span
                key={`word-${lineIdx}-${wordIdx}`}
                className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0 pb-[0.08em] -mb-[0.08em]"
              >
                <motion.span
                  variants={wordVariants}
                  className="inline-block will-change-transform"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </MotionComponent>
  );
}
