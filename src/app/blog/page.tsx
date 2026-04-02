"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogCategoryPage() {
  const posts = [
    {
      title: "The Death of the Tiered Program?",
      category: "Loyalty Strategy",
      date: "May 12, 2024",
      readTime: "8 min read",
      author: "Founder Name",
      slug: "death-of-tiered-program",
    },
    {
      title: "Loyalty Tech Selection Guide",
      category: "Loyalty Tech",
      date: "April 28, 2024",
      readTime: "12 min read",
      author: "Founder Name",
      slug: "loyalty-tech-selection-guide",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
              The <br />
              <span className="text-qbf-orange">Journal.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              In-depth analysis, strategic advice, and latest trends in the world
              of customer loyalty.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
          {[
            "All",
            "Loyalty Tech",
            "Loyalty Strategy",
            "Loyalty Education",
            "Loyalty Trends"
          ].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-bold text-sm hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <div className="group relative aspect-[21/9] bg-qbf-divider rounded-[3rem] overflow-hidden border border-qbf-divider cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-qbf-black/80 via-qbf-black/20 to-transparent group-hover:via-qbf-black/40 transition-all"></div>
            <div className="absolute bottom-12 left-12 right-12">
              <span className="bg-qbf-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 inline-block">
                Pinned Article
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight max-w-3xl">
                The Future of Customer Engagement: Predictions for 2025 and Beyond
              </h2>
              <div className="flex gap-6 text-white/70 text-sm font-medium">
                <span>Founder Name</span>
                <span>•</span>
                <span>May 25, 2024</span>
                <span>•</span>
                <span>15 min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.concat(posts).map((post, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="aspect-[4/3] bg-qbf-divider rounded-3xl mb-6 overflow-hidden relative border border-qbf-divider">
                <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur text-qbf-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-qbf-divider">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-qbf-gray mb-4 font-bold uppercase tracking-widest">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors">
                {post.title}
              </h3>
              <p className="text-qbf-gray mb-6 leading-relaxed">
                Excerpt goes here. A brief description of the article content
                to entice readers to click and read the full post.
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
    </div>
  );
}
