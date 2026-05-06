"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type HeroProps = {
  title?: string;
  subtitle?: string;
  intro?: string;
};

export const Hero = ({ title, subtitle, intro }: HeroProps = {}) => {
  const { t } = useI18n();
  const heroTitle = title || t("hero_title");
  const heroSubtitle = subtitle || t("hero_subtitle");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <section className="relative overflow-hidden section-padding md:min-h-[90vh] flex items-center bg-qbf-white">
      {/* Background Texture Placeholder */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-content relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-left rtl:text-right"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.05] tracking-tight text-qbf-black mb-8"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-qbf-gray max-w-2xl mb-12 leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          {intro ? (
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-qbf-gray/90 max-w-2xl mb-10 leading-relaxed"
            >
              {intro}
            </motion.p>
          ) : null}

          <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
            <Link
              href="/hub"
              className="bg-qbf-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity"
            >
              Explore the Hub
            </Link>
            <Link
              href="/services"
              className="border-2 border-qbf-black text-qbf-black px-8 py-4 rounded-full text-lg font-bold hover:bg-qbf-black hover:text-qbf-white transition-all"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
