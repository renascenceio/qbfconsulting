"use client";

import { motion } from "framer-motion";
import { Zap, Layout, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Strategy",
    description: "Design long-term loyalty roadmaps that balance business objectives with human behavior.",
    icon: <Zap className="text-qbf-orange" size={32} />,
    href: "/services/loyalty-program-strategy",
  },
  {
    title: "Implementation",
    description: "Move from concepts to fully-operational systems. We bridge the gap between design and technology.",
    icon: <Layout className="text-qbf-orange" size={32} />,
    href: "/services/loyalty-program-implementation",
  },
  {
    title: "Management",
    description: "Ongoing optimization and performance management to ensure your program keeps delivering value.",
    icon: <Settings className="text-qbf-orange" size={32} />,
    href: "/services/loyalty-program-management",
  },
];

export const WhatWeDo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <section className="section-padding bg-qbf-white border-t border-qbf-divider">
      <div className="max-content">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6">
            Everything You Need <br /> To Succeed.
          </h2>
          <p className="text-xl text-qbf-gray">
            From design to delivery, we provide end-to-end expertise for modern
            loyalty programs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.015 }}
              className="bg-white p-8 md:p-10 rounded-2xl border border-qbf-divider hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer group"
            >
              <div className="mb-8">{service.icon}</div>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4">
                {service.title}
              </h3>
              <p className="text-qbf-gray mb-8 leading-relaxed">
                {service.description}
              </p>
              <span className="text-qbf-orange font-bold text-sm inline-flex items-center group-hover:gap-2 transition-all">
                Learn More <span className="ml-1">→</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
