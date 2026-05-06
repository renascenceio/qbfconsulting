import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { findAll } from "@/lib/db";

interface EventItem {
  slug: string;
  title: string;
  category?: string;
  type?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  time?: string;
  location?: string;
  status?: "draft" | "published";
}

function splitDate(iso?: string) {
  if (!iso) return { day: "", month: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    const parts = iso.split(" ");
    return { day: parts[1] ?? "", month: parts[0] ?? "" };
  }
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(),
  };
}

export const UpcomingEvents = async () => {
  const all = await findAll<EventItem>("events");
  const now = Date.now();
  const events = all
    .filter((e) => e.status !== "draft")
    .filter((e) => {
      const end = e.endDate || e.startDate || e.date;
      if (!end) return true;
      const t = new Date(end).getTime();
      return Number.isNaN(t) ? true : t >= now - 1000 * 60 * 60 * 24;
    })
    .sort((a, b) => {
      const ta = new Date(a.startDate || a.date || 0).getTime();
      const tb = new Date(b.startDate || b.date || 0).getTime();
      return ta - tb;
    })
    .slice(0, 2);

  if (events.length === 0) return null;

  return (
    <section className="section-padding bg-qbf-white border-t border-qbf-divider">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6 text-balance">
              Upcoming <br /> Events.
            </h2>
            <p className="text-xl text-qbf-gray">
              Workshops, certifications, webinars, and roundtables for loyalty operators.
            </p>
          </div>
          <Link
            href="/events"
            className="text-qbf-orange font-bold text-sm hover:underline"
          >
            View All Events →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => {
            const { day, month } = splitDate(event.startDate || event.date);
            const label = event.category || event.type || "Event";
            return (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="bg-white p-8 md:p-12 rounded-3xl border border-qbf-divider group hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer relative overflow-hidden block"
              >
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="bg-qbf-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {label}
                  </span>
                  <div className="text-right">
                    <p className="text-3xl font-display font-black text-qbf-black">
                      {day}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-wider text-qbf-orange">
                      {month}
                    </p>
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-black text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors text-balance">
                  {event.title}
                </h3>
                <div className="flex flex-col md:flex-row gap-6 mb-10 text-qbf-gray font-medium">
                  {event.time ? (
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{event.time}</span>
                    </div>
                  ) : null}
                  {event.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{event.location}</span>
                    </div>
                  ) : null}
                </div>
                <span className="bg-qbf-orange text-white px-8 py-4 rounded-full text-lg font-bold inline-block group-hover:opacity-90 transition-opacity">
                  View Details
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
