import Link from "next/link";
import { Calendar, Plus, Pencil, MapPin } from "lucide-react";
import { findAll } from "@/lib/db";

interface EventItem {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  type?: string;
  format?: string;
  location?: string;
  startDate?: string;
  status?: string;
  capacity?: number;
  seatsLeft?: number;
}

export default async function EventsAdminPage() {
  const events = (await findAll<EventItem>("events")).sort((a, b) => {
    const ta = new Date(a.startDate || 0).getTime();
    const tb = new Date(b.startDate || 0).getTime();
    return tb - ta;
  });

  const categories = Array.from(
    new Set(events.map((e) => e.category).filter(Boolean) as string[])
  );

  return (
    <div>
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-5xl font-display font-black mb-4">Events</h2>
          <p className="text-qbf-gray text-lg max-w-2xl">
            CLMP cohorts, certifications, workshops, webinars, masterclasses,
            roundtables. Drive the whole events program from here.
          </p>
        </div>
        <Link
          href="/admin/content/events/new"
          className="bg-qbf-orange text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} /> New Event
        </Link>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((c) => {
            const count = events.filter((e) => e.category === c).length;
            return (
              <div
                key={c}
                className="bg-white border border-qbf-divider rounded-2xl p-6"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-2">
                  {c}
                </p>
                <p className="text-3xl font-display font-black">{count}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="bg-white rounded-3xl border border-qbf-divider overflow-hidden">
        <table className="w-full">
          <thead className="bg-qbf-divider/30 text-left">
            <tr>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Title
              </th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Category
              </th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Format
              </th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Date
              </th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Capacity
              </th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Status
              </th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-qbf-gray">
                  No events yet. Create your first event.
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr
                  key={e.slug}
                  className="border-t border-qbf-divider hover:bg-qbf-divider/20 transition-colors"
                >
                  <td className="p-6">
                    <p className="font-bold text-qbf-black">{e.title}</p>
                    <p className="text-xs text-qbf-gray flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {e.location || "—"}
                    </p>
                  </td>
                  <td className="p-6 text-sm">
                    <span className="bg-qbf-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {e.category || "—"}
                    </span>
                  </td>
                  <td className="p-6 text-sm">{e.format || "—"}</td>
                  <td className="p-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-qbf-gray" />
                      {e.startDate
                        ? new Date(e.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </div>
                  </td>
                  <td className="p-6 text-sm">
                    {typeof e.seatsLeft === "number" &&
                    typeof e.capacity === "number"
                      ? `${e.seatsLeft}/${e.capacity}`
                      : e.capacity || "—"}
                  </td>
                  <td className="p-6 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        e.status === "Sold Out"
                          ? "bg-red-100 text-red-700"
                          : e.status === "Few Seats"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {e.status || "Upcoming"}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <Link
                      href={`/admin/content/events/${e.slug}`}
                      className="inline-flex items-center gap-1 text-qbf-orange font-bold text-sm hover:underline"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
