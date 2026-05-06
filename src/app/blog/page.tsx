"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

type Post = {
  id?: string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  status?: string;
};

export default function BlogCategoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/posts").then((r) => r.json()),
      fetch("/api/pages/blog").then((r) => r.json()).catch(() => null),
    ]).then(([data, pageData]) => {
      setPosts(Array.isArray(data) ? data : []);
      setPage(pageData);
      setIsLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(posts.filter((p) => p.status !== "Draft").map((p) => p.category).filter(Boolean)))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts
      .filter((p) => p.status !== "Draft")
      .filter((p) => activeFilter === "All" || p.category === activeFilter)
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          (p.excerpt || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
        );
      });
  }, [posts, activeFilter, search]);

  return (
    <div className="bg-qbf-white min-h-screen">
      <section className="pt-40 pb-12 border-b border-qbf-divider">
        <div className="max-content">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-[1.05] tracking-tight">
                {page?.heroTitle || "The Journal."}
              </h1>
              <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
                {page?.heroSubtitle ||
                  "In-depth analysis, strategic advice, and the latest trends across the world of customer loyalty."}
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-content">
          <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "text-qbf-orange border-b-2 border-qbf-orange"
                    : "text-qbf-gray hover:text-qbf-orange"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-xl text-qbf-gray font-medium">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-qbf-divider rounded-[3rem]">
              <p className="text-xl text-qbf-gray font-medium mb-4">No articles match this view.</p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearch("");
                }}
                className="text-sm font-bold text-qbf-orange hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug || post.id || index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/blog/${post.slug || post.id}`} className="block">
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
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-qbf-gray mb-6 leading-relaxed">{post.excerpt}</p>
                    <span className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Article <span>→</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
