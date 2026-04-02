"use client";

import { motion } from "framer-motion";

const logos = [
  "Forbes", "TechCrunch", "Wired", "Fast Company", "Financial Times",
  "The Guardian", "Tech Insider", "Inc Magazine", "Business Insider"
];

export const MediaStrip = () => {
  return (
    <section className="py-20 bg-qbf-white border-t border-qbf-divider overflow-hidden">
      <div className="max-content mb-12 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-widest text-qbf-gray">
          Trusted By Industry Leaders
        </h4>
        <div className="h-px bg-qbf-divider flex-grow ml-8"></div>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1035],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-20 items-center shrink-0 pr-20"
        >
          {logos.concat(logos).map((logo, index) => (
            <span
              key={index}
              className="text-2xl md:text-3xl font-display font-black text-qbf-gray/20 whitespace-nowrap hover:text-qbf-orange transition-colors"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
