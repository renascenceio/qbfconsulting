"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const CTABand = () => {
  return (
    <section className="py-24 bg-qbf-orange text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden flex items-center justify-center">
        <span className="text-[20vw] font-display font-black leading-none whitespace-nowrap -rotate-6 select-none uppercase tracking-tighter">
          Ready to Build Loyalty? Ready to Build Loyalty?
        </span>
      </div>

      <div className="max-content relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-black mb-12 max-w-4xl mx-auto leading-tight">
            Ready to build a loyalty program that works?
          </h2>
          <Link
            href="/contact"
            className="bg-white text-qbf-orange px-12 py-6 rounded-full text-2xl font-black hover:scale-105 transition-all shadow-xl shadow-black/10 inline-block"
          >
            Talk to Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
