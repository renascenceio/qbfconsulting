"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogCategoryPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    activeFilter === "All" || post.category === activeFilter
  );

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
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                activeFilter === filter ? "text-qbf-orange border-b-2 border-qbf-orange" : "text-qbf-gray hover:text-qbf-orange"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.map((post, index) => (
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
                <h2 className="text-2xl font-display font-bold text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors">
                  {post.title}
                </h2>
                <p className="text-qbf-gray mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug || post.id}`}
                  className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Read Article <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-qbf-gray font-medium">
              {isLoading ? "Loading posts..." : "No articles found in this category."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
