"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, Quote, ArrowUpRight,
  Building2, TrendingUp, Briefcase
} from "lucide-react";

type Metric = { label: string; value: string };
type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  region: string;
  category: string;
  year: string;
  duration: string;
  teamSize: string;
  excerpt: string;
  metrics: Metric[];
  headlineMetric: string;
  headlineMetricLabel: string;
  testimonial: string;
  testimonialAuthor: string;
  tags: string[];
  status: string;
};

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/case-studies").then((r) => r.json()),
      fetch("/api/pages/case-studies").then((r) => r.json()).catch(() => null),
    ]).then(([data, pageData]) => {
      setStudies(Array.isArray(data) ? data : []);
      setPage(pageData);
      setIsLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(studies.map((s) => s.category).filter(Boolean)))];
  }, [studies]);

  const industries = useMemo(() => {
    return ["All", ...Array.from(new Set(studies.map((s) => s.industry).filter(Boolean)))];
  }, [studies]);

  const regions = useMemo(() => {
    return ["All", ...Array.from(new Set(studies.map((s) => s.region).filter(Boolean)))];
  }, [studies]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return studies
      .filter((s) => s.status !== "Draft")
      .filter((s) => activeCategory === "All" || s.category === activeCategory)
      .filter((s) => activeIndustry === "All" || s.industry === activeIndustry)
      .filter((s) => activeRegion === "All" || s.region === activeRegion)
      .filter((s) => {
        if (!q) return true;
        return (
          s.title.toLowerCase().includes(q) ||
          (s.client || "").toLowerCase().includes(q) ||
          (s.excerpt || "").toLowerCase().includes(q) ||
          (s.tags || []).some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [studies, activeCategory, activeIndustry, activeRegion, search]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveIndustry("All");
    setActiveRegion("All");
    setSearch("");
  };

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
              {page?.heroTitle || "Case Studies."}
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              {page?.heroSubtitle ||
                "Real-world examples of how we've helped global brands build measurable business value through loyalty."}
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by client, sector, tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        {/* Filter rails */}
        <div className="space-y-4 mb-12 pb-8 border-b border-qbf-divider">
          <FilterRail
            label="Service line"
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <FilterRail
            label="Industry"
            options={industries}
            active={activeIndustry}
            onChange={setActiveIndustry}
          />
          <FilterRail
            label="Region"
            options={regions}
            active={activeRegion}
            onChange={setActiveRegion}
          />
          {(activeCategory !== "All" || activeIndustry !== "All" || activeRegion !== "All" || search) && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-qbf-gray font-medium">
                Showing <span className="font-bold text-qbf-black">{filtered.length}</span> of {studies.length}
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-bold uppercase tracking-widest text-qbf-orange hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-xl text-qbf-gray font-medium">Loading case studies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-qbf-divider rounded-[3rem]">
            <p className="text-xl text-qbf-gray font-medium mb-4">No case studies match these filters.</p>
            <button
              onClick={resetFilters}
              className="text-sm font-bold text-qbf-orange hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link
                href={`/case-studies/${featured.slug}`}
                className="block mb-20 group"
              >
                <div className="relative aspect-[21/9] bg-qbf-black rounded-[3rem] overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-qbf-orange/20 via-qbf-black to-qbf-black"></div>
                  <div className="absolute top-12 right-12 hidden md:flex items-center gap-3">
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-white">
                      Featured Case Study
                    </div>
                    <div className="w-12 h-12 bg-qbf-orange rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="bg-qbf-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                        {featured.category}
                      </span>
                      <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                        {featured.industry}
                      </span>
                      <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                        {featured.region}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight max-w-3xl">
                      {featured.title}
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-10 text-white/90 items-center">
                      <div>
                        <div className="text-3xl md:text-5xl font-black text-qbf-orange mb-1">
                          {featured.headlineMetric}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-white/70">
                          {featured.headlineMetricLabel}
                        </div>
                      </div>
                      {featured.metrics?.slice(1, 3).map((m, i) => (
                        <div key={i}>
                          <div className="text-2xl md:text-3xl font-black text-white mb-1">{m.value}</div>
                          <div className="text-xs font-bold uppercase tracking-widest text-white/50">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
              {rest.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CaseStudyCard study={study} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FilterRail({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
      <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray md:w-24 shrink-0">
        {label}
      </span>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all border ${
              active === opt
                ? "bg-qbf-black text-white border-qbf-black"
                : "bg-white text-qbf-gray border-qbf-divider hover:border-qbf-orange hover:text-qbf-orange"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="bg-white p-8 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 hover:border-qbf-orange/40 transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-wrap gap-2">
          <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            {study.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray bg-qbf-white border border-qbf-divider px-3 py-1.5 rounded-full">
            {study.industry}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">
          {study.year}
        </span>
      </div>

      <h3 className="text-2xl font-display font-bold text-qbf-black mb-3 leading-tight group-hover:text-qbf-orange transition-colors">
        {study.title}
      </h3>
      <p className="text-sm text-qbf-gray mb-6 font-medium flex items-center gap-2">
        <Building2 size={14} className="text-qbf-orange" />
        {study.client}
      </p>

      <p className="text-base text-qbf-gray mb-8 leading-relaxed flex-grow">
        {study.excerpt}
      </p>

      {/* Headline metric strip */}
      <div className="bg-qbf-white border border-qbf-divider rounded-2xl p-5 mb-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <div className="text-3xl font-black text-qbf-black leading-none mb-1">
              {study.headlineMetric}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">
              {study.headlineMetricLabel}
            </div>
          </div>
          <TrendingUp size={20} className="text-qbf-orange" />
        </div>
      </div>

      {/* Meta strip */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-qbf-gray font-medium mb-6 pb-6 border-b border-qbf-divider">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-qbf-orange" />
          {study.region}
        </span>
        {study.duration && (
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-qbf-orange" />
            {study.duration}
          </span>
        )}
        {study.teamSize && (
          <span className="flex items-center gap-1.5">
            <Users size={12} className="text-qbf-orange" />
            {study.teamSize}
          </span>
        )}
      </div>

      {/* Testimonial preview */}
      {study.testimonial && (
        <div className="mb-6 italic text-sm text-qbf-gray leading-relaxed">
          <Quote size={16} className="text-qbf-orange mb-2" />
          <p className="line-clamp-3">{study.testimonial}</p>
          {study.testimonialAuthor && (
            <p className="not-italic text-[10px] font-bold uppercase tracking-widest text-qbf-black mt-2">
              — {study.testimonialAuthor}
            </p>
          )}
        </div>
      )}

      <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
        Read full case study <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
