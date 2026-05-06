"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

type Speaker = { name: string; role: string };
type EventItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  tagline: string;
  description: string;
  format: string;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  time: string;
  duration: string;
  capacity: number;
  seatsLeft: number;
  price: string;
  registrationUrl: string;
  speakers: Speaker[];
  tags: string[];
  status: string;
  featured?: boolean;
};

function formatDateRange(start: string, end?: string) {
  if (!start) return "";
  const s = new Date(start);
  if (Number.isNaN(s.getTime())) return start;
  const sStr = s.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  if (!end || end === start) return sStr;
  const e = new Date(end);
  if (Number.isNaN(e.getTime())) return sStr;
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`;
  }
  return `${sStr} – ${e.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
}

function dateParts(start: string) {
  if (!start) return { day: "—", month: "—" };
  const d = new Date(start);
  if (Number.isNaN(d.getTime())) return { day: "—", month: "—" };
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFormat, setActiveFormat] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/events").then((r) => r.json()),
      fetch("/api/pages/events").then((r) => r.json()).catch(() => null),
    ]).then(([data, pageData]) => {
      setEvents(Array.isArray(data) ? data : []);
      setPage(pageData);
      setIsLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(events.map((e) => e.category).filter(Boolean)))];
  }, [events]);

  const formats = useMemo(() => {
    return ["All", ...Array.from(new Set(events.map((e) => e.format).filter(Boolean)))];
  }, [events]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events
      .filter((e) => e.status !== "Draft")
      .filter((e) => activeCategory === "All" || e.category === activeCategory)
      .filter((e) => activeFormat === "All" || e.format === activeFormat)
      .filter((e) => {
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          (e.tagline || "").toLowerCase().includes(q) ||
          (e.location || "").toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
  }, [events, activeCategory, activeFormat, search]);

  const featured = filtered.find((e) => e.featured) || filtered[0];
  const rest = filtered.filter((e) => e !== featured);

  return (
    <div className="bg-qbf-white min-h-screen">
      <section className="pt-40 pb-16 border-b border-qbf-divider">
        <div className="max-content">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-6 inline-block">
                Events & Workshops
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-[1.05] tracking-tight text-balance">
                {page?.heroTitle || "Events & Workshops."}
              </h1>
              <p className="text-2xl text-qbf-gray leading-relaxed text-pretty">
                {page?.heroSubtitle ||
                  "Live training, masterclasses, and roundtables across the regions we operate in."}
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 border-b border-qbf-divider">
        <div className="max-content space-y-5">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray md:w-24 shrink-0">
              Type
            </span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? "bg-qbf-black text-white border-qbf-black"
                      : "bg-white text-qbf-gray border-qbf-divider hover:border-qbf-orange hover:text-qbf-orange"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray md:w-24 shrink-0">
              Format
            </span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFormat(f)}
                  className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all border ${
                    activeFormat === f
                      ? "bg-qbf-black text-white border-qbf-black"
                      : "bg-white text-qbf-gray border-qbf-divider hover:border-qbf-orange hover:text-qbf-orange"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-content">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-xl text-qbf-gray font-medium">Loading events...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-qbf-divider rounded-[3rem]">
              <p className="text-xl text-qbf-gray font-medium mb-4">No events match these filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveFormat("All");
                  setSearch("");
                }}
                className="text-sm font-bold text-qbf-orange hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {featured && (
                <Link href={`/events/${featured.slug}`} className="block mb-16 group">
                  <div className="relative bg-qbf-black rounded-[3rem] overflow-hidden border border-white/10 p-12 md:p-16">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-qbf-orange/25 via-qbf-black to-qbf-black"></div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
                      <div className="md:col-span-2">
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="bg-qbf-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                            <Sparkles size={12} /> Featured
                          </span>
                          <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {featured.category}
                          </span>
                          <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {featured.format}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-5 leading-tight max-w-2xl">
                          {featured.title}
                        </h2>
                        <p className="text-white/70 leading-relaxed mb-8 max-w-2xl">
                          {featured.tagline}
                        </p>
                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-white/90 text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-qbf-orange" />
                            {formatDateRange(featured.startDate, featured.endDate)}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin size={16} className="text-qbf-orange" />
                            {featured.location}
                          </span>
                          {featured.duration && (
                            <span className="flex items-center gap-2">
                              <Clock size={16} className="text-qbf-orange" />
                              {featured.duration}
                            </span>
                          )}
                          {typeof featured.capacity === "number" && featured.capacity > 0 && (
                            <span className="flex items-center gap-2">
                              <Users size={16} className="text-qbf-orange" />
                              {featured.seatsLeft} of {featured.capacity} seats left
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex md:justify-end">
                        <span className="bg-qbf-orange text-white px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-3 group-hover:scale-105 transition-transform shadow-2xl shadow-qbf-orange/30">
                          View event <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rest.map((event, index) => {
                  const dp = dateParts(event.startDate);
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/events/${event.slug}`}
                        className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 hover:border-qbf-orange/40 transition-all group flex flex-col h-full relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-qbf-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                              {event.category}
                            </span>
                            <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                              {event.format}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-3xl font-display font-black text-qbf-black leading-none">{dp.day}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-qbf-orange mt-1">{dp.month}</p>
                          </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-black text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-qbf-gray leading-relaxed mb-8 flex-grow">
                          {event.tagline}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-xs text-qbf-gray font-medium mb-6">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-qbf-orange" />
                            {formatDateRange(event.startDate, event.endDate)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-qbf-orange" />
                            {event.location}
                          </span>
                          {event.duration && (
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} className="text-qbf-orange" />
                              {event.duration}
                            </span>
                          )}
                          {event.price && (
                            <span className="flex items-center gap-1.5 font-bold text-qbf-black">
                              {event.price}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-qbf-divider">
                          <span className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                            {typeof event.capacity === "number" && event.capacity > 0
                              ? `${event.seatsLeft} of ${event.capacity} seats`
                              : "Open registration"}
                          </span>
                          <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                            Details <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
