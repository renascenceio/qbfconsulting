import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findBy, readData } from "@/lib/db";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Building2,
  ListChecks,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

type EventItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
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
  speakers: { name: string; role: string }[];
  agenda: string[];
  tags: string[];
  status: string;
};

function formatDateRange(start: string, end?: string) {
  if (!start) return "";
  const s = new Date(start);
  if (Number.isNaN(s.getTime())) return start;
  const sStr = s.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  if (!end || end === start) return sStr;
  const e = new Date(end);
  if (Number.isNaN(e.getTime())) return sStr;
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`;
  }
  return `${sStr} – ${e.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = findBy<EventItem>("events", "slug", slug);
  if (!ev) return { title: "Event | QBF Consulting" };
  return {
    title: `${ev.title} | QBF Events`,
    description: ev.tagline || ev.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = findBy<EventItem>("events", "slug", slug);
  if (!event) return notFound();

  const related = readData<EventItem>("events")
    .filter((e) => e.slug !== event.slug && e.status !== "Draft" && e.category === event.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode:
      event.format === "Virtual"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.format === "Hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue || event.location,
      address: { "@type": "PostalAddress", addressLocality: event.location },
    },
    description: event.tagline || event.description,
    organizer: {
      "@type": "Organization",
      name: "QBF Consulting",
      url: "https://qbfconsulting.com",
    },
  };

  return (
    <div className="bg-qbf-white min-h-screen">
      <SchemaMarkup data={jsonLd} />

      <section className="pt-32 pb-16 bg-qbf-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-qbf-orange/20 via-qbf-black to-qbf-black"></div>
        <div className="max-content relative z-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-qbf-orange mb-10"
          >
            <ArrowLeft size={14} /> All Events
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-qbf-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                {event.category}
              </span>
              <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                {event.format}
              </span>
              {event.status === "Upcoming" && (
                <span className="bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  Upcoming
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 leading-[1.05] tracking-tight text-balance">
              {event.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl text-pretty">
              {event.tagline}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/10">
              <Stat icon={<Calendar size={18} />} label="Dates" value={formatDateRange(event.startDate, event.endDate)} />
              <Stat icon={<Clock size={18} />} label="Time" value={event.time || event.duration} />
              <Stat icon={<MapPin size={18} />} label="Location" value={event.location} />
              <Stat
                icon={<Users size={18} />}
                label="Capacity"
                value={
                  typeof event.capacity === "number" && event.capacity > 0
                    ? `${event.seatsLeft} of ${event.capacity} left`
                    : "Open"
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-display font-black text-qbf-black mb-6">About this event</h2>
                <p className="text-lg text-qbf-gray leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {event.agenda && event.agenda.length > 0 && (
                <div>
                  <h2 className="text-3xl font-display font-black text-qbf-black mb-6 flex items-center gap-3">
                    <ListChecks className="text-qbf-orange" size={28} />
                    Agenda
                  </h2>
                  <ul className="space-y-3">
                    {event.agenda.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-qbf-divider"
                      >
                        <CheckCircle className="text-qbf-orange shrink-0 mt-0.5" size={18} />
                        <span className="text-qbf-black font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.speakers && event.speakers.length > 0 && (
                <div>
                  <h2 className="text-3xl font-display font-black text-qbf-black mb-6">Led by</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.speakers.map((s, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-qbf-divider flex gap-4 items-center">
                        <div className="w-14 h-14 bg-qbf-orange-muted rounded-full border border-qbf-orange/20 flex items-center justify-center text-qbf-orange font-display font-black text-lg">
                          {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="font-bold text-qbf-black">{s.name}</p>
                          <p className="text-sm text-qbf-gray">{s.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray bg-white border border-qbf-divider px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="bg-qbf-black text-white p-10 rounded-[2.5rem] sticky top-28">
                <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-3">Investment</p>
                <p className="text-4xl font-display font-black mb-8">{event.price || "On request"}</p>

                <div className="space-y-4 text-sm text-white/80 mb-10">
                  {event.venue && (
                    <p className="flex items-start gap-3">
                      <Building2 size={16} className="text-qbf-orange shrink-0 mt-0.5" />
                      <span>{event.venue}</span>
                    </p>
                  )}
                  <p className="flex items-start gap-3">
                    <Calendar size={16} className="text-qbf-orange shrink-0 mt-0.5" />
                    <span>{formatDateRange(event.startDate, event.endDate)}</span>
                  </p>
                  {event.time && (
                    <p className="flex items-start gap-3">
                      <Clock size={16} className="text-qbf-orange shrink-0 mt-0.5" />
                      <span>{event.time}</span>
                    </p>
                  )}
                  {typeof event.capacity === "number" && event.capacity > 0 && (
                    <p className="flex items-start gap-3">
                      <Users size={16} className="text-qbf-orange shrink-0 mt-0.5" />
                      <span>
                        {event.seatsLeft} of {event.capacity} seats remaining
                      </span>
                    </p>
                  )}
                </div>

                <Link
                  href={event.registrationUrl || "/contact"}
                  className="bg-qbf-orange text-white px-6 py-4 rounded-full text-base font-bold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-3 w-full shadow-xl shadow-qbf-orange/20"
                >
                  Register interest <ArrowUpRight size={18} />
                </Link>
                <p className="text-xs text-white/50 mt-4 text-center leading-relaxed">
                  We will reply within one working day with availability and onboarding details.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-white border-t border-qbf-divider">
          <div className="max-content">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-black text-qbf-black">
                More {event.category} events
              </h2>
              <Link href="/events" className="text-qbf-orange font-bold text-sm hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/events/${r.slug}`}
                  className="bg-qbf-white p-8 rounded-[2rem] border border-qbf-divider hover:border-qbf-orange/40 hover:shadow-xl transition-all group flex flex-col"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-orange mb-3">
                    {formatDateRange(r.startDate, r.endDate)}
                  </span>
                  <h3 className="text-xl font-display font-bold text-qbf-black mb-3 leading-tight group-hover:text-qbf-orange transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-qbf-gray leading-relaxed flex-grow">{r.tagline}</p>
                  <span className="text-qbf-orange font-bold text-xs uppercase tracking-widest mt-6 inline-flex items-center gap-2">
                    Details →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-qbf-orange mb-2">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">{label}</p>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}
