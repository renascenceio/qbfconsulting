"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    title: "The Death of the Tiered Program?",
    category: "Strategy",
    date: "May 12, 2024",
    excerpt: "Why the traditional tiered model is struggling and what's next.",
    slug: "death-of-tiered-program",
  },
  {
    title: "Loyalty Tech Selection Guide",
    category: "Technology",
    date: "April 28, 2024",
    excerpt: "The 10 questions to ask before you buy your next loyalty engine.",
    slug: "loyalty-tech-selection-guide",
  },
  {
    title: "The Psychology of Points",
    category: "Behavioral Science",
    date: "April 15, 2024",
    excerpt: "Understanding why points still work (when done correctly).",
    slug: "psychology-of-points",
  },
];

export const LatestJournal = () => {
  return (
    <section className="section-padding bg-qbf-white border-t border-qbf-divider">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6">
              Latest from <br /> the Journal.
            </h2>
            <p className="text-xl text-qbf-gray">
              Insights, analysis, and strategic advice from our experts.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-qbf-orange font-bold text-sm hover:underline"
          >
            Read All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.015 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-qbf-divider rounded-2xl mb-6 overflow-hidden relative border border-qbf-divider">
                <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-white/90 backdrop-blur text-qbf-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-qbf-divider">
                    {post.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-qbf-gray mb-3 font-medium uppercase tracking-wider">
                {post.date}
              </p>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors">
                {post.title}
              </h3>
              <p className="text-qbf-gray mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Read Article <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
