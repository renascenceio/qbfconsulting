"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "Project Redwood",
    category: "Strategy",
    excerpt: "Developing a global loyalty roadmap for a Fortune 500 retailer.",
    outcome: "42% Redemption Rate",
    slug: "project-redwood",
  },
  {
    title: "The Atlas Program",
    category: "Implementation",
    excerpt: "Launching a tech-first airline loyalty program from scratch.",
    outcome: "12% Active Share",
    slug: "atlas-program",
  },
  {
    title: "Echo One",
    category: "Management",
    excerpt: "Ongoing optimization and performance management for Echo One.",
    outcome: "2.4x Engagement",
    slug: "echo-one",
  },
];

export const CaseStudies = () => {
  return (
    <section className="section-padding bg-qbf-white border-t border-qbf-divider">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6">
              Proven Results <br /> For Global Brands.
            </h2>
            <p className="text-xl text-qbf-gray">
              We deliver measurable business value through strategic loyalty
              design and implementation.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="text-qbf-orange font-bold text-sm hover:underline"
          >
            View All Case Studies →
          </Link>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.015 }}
              className="min-w-[80vw] md:min-w-0 bg-white p-8 rounded-2xl border border-qbf-divider group hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-qbf-orange-muted text-qbf-orange text-xs font-bold px-3 py-1.5 rounded-full">
                  {study.category}
                </span>
                <span className="text-2xl font-black text-qbf-black">
                  {study.outcome}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4">
                {study.title}
              </h3>
              <p className="text-qbf-gray mb-8 leading-relaxed">
                {study.excerpt}
              </p>
              <Link
                href={`/case-studies/${study.slug}`}
                className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Read Case Study <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
