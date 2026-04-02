"use client";

import { useState } from "react";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import Link from "next/link";

const mockResults = [
  { type: "Blog", title: "The Death of the Tiered Program?", slug: "death-of-tiered-program" },
  { type: "Blog", title: "Loyalty Tech Selection Guide", slug: "loyalty-tech-selection-guide" },
  { type: "Case Study", title: "Project Redwood", slug: "project-redwood" },
  { type: "Event", title: "The CLMP Certification Workshop", slug: "clmp-certification-workshop" },
  { type: "Hub Resource", title: "State of Loyalty 2024", slug: "state-of-loyalty-2024" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredResults = mockResults.filter(result => {
    const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || result.type === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-12">Search.</h1>

          <div className="relative mb-12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full bg-white border border-qbf-divider px-16 py-6 rounded-full text-2xl focus:outline-none focus:border-qbf-orange transition-all shadow-xl shadow-black/5"
            />
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-qbf-gray" size={32} />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-qbf-gray hover:text-qbf-orange transition-colors"
              >
                <X size={32} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-16">
            {["All", "Blog", "Case Study", "Event", "Hub Resource"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-full border font-bold text-sm transition-all ${
                  filter === f
                    ? "bg-qbf-orange border-qbf-orange text-white"
                    : "bg-white border-qbf-divider text-qbf-gray hover:border-qbf-orange hover:text-qbf-orange"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, i) => (
                <Link
                  key={i}
                  href={`/${result.type.toLowerCase().replace(" ", "-") === 'hub-resource' ? 'hub/reports' : result.type.toLowerCase().replace(" ", "-")}/${result.slug}`}
                  className="block bg-white p-8 rounded-3xl border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-orange mb-2 block">
                        {result.type}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-qbf-black group-hover:text-qbf-orange transition-colors">
                        {result.title}
                      </h3>
                    </div>
                    <span className="text-qbf-gray font-black text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 bg-white border border-qbf-divider rounded-[3rem]">
                <p className="text-2xl text-qbf-gray font-medium mb-8">No results found for "{query}"</p>
                <p className="text-sm font-bold uppercase tracking-widest text-qbf-black mb-12">Try searching for these instead:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Loyalty Strategy", "Case Studies", "Reports"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-6 py-2 bg-qbf-white border border-qbf-divider rounded-full font-bold text-xs hover:border-qbf-orange hover:text-qbf-orange transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
