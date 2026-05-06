"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";

const CATEGORY_OPTIONS = [
  "CLMP",
  "Certification",
  "Workshop",
  "Webinar",
  "Masterclass",
  "Roundtable",
  "Conference",
];

const FORMAT_OPTIONS = ["In-person", "Online", "Hybrid"];

const STATUS_OPTIONS = ["Upcoming", "Few Seats", "Sold Out", "Past", "Draft"];

type Speaker = { name: string; role?: string };

type EventState = {
  slug: string;
  title: string;
  category: string;
  type?: string;
  tagline?: string;
  description?: string;
  format: string;
  location?: string;
  venue?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  duration?: string;
  capacity?: number;
  seatsLeft?: number;
  price?: string;
  registrationUrl?: string;
  speakers?: Speaker[];
  agenda?: string[];
  tags?: string[];
  status: string;
  featured?: boolean;
};

export default function EventEditor({
  initial,
  mode,
}: {
  initial?: Partial<EventState>;
  mode: "new" | "edit";
}) {
  const [event, setEvent] = useState<EventState>({
    slug: initial?.slug || "",
    title: initial?.title || "",
    category: initial?.category || "Workshop",
    type: initial?.type || "",
    tagline: initial?.tagline || "",
    description: initial?.description || "",
    format: initial?.format || "In-person",
    location: initial?.location || "",
    venue: initial?.venue || "",
    startDate: initial?.startDate || "",
    endDate: initial?.endDate || "",
    time: initial?.time || "",
    duration: initial?.duration || "",
    capacity: initial?.capacity,
    seatsLeft: initial?.seatsLeft,
    price: initial?.price || "",
    registrationUrl: initial?.registrationUrl || "/contact",
    speakers: initial?.speakers || [],
    agenda: initial?.agenda || [],
    tags: initial?.tags || [],
    status: initial?.status || "Upcoming",
    featured: initial?.featured || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const update = <K extends keyof EventState>(key: K, value: EventState[K]) =>
    setEvent((s) => ({ ...s, [key]: value }));

  const addAgenda = () =>
    update("agenda", [...(event.agenda || []), ""]);

  const updateAgenda = (i: number, value: string) => {
    const next = [...(event.agenda || [])];
    next[i] = value;
    update("agenda", next);
  };

  const removeAgenda = (i: number) =>
    update("agenda", (event.agenda || []).filter((_, idx) => idx !== i));

  const addSpeaker = () =>
    update("speakers", [...(event.speakers || []), { name: "", role: "" }]);

  const updateSpeaker = (i: number, patch: Partial<Speaker>) => {
    const next = [...(event.speakers || [])];
    next[i] = { ...next[i], ...patch };
    update("speakers", next);
  };

  const removeSpeaker = (i: number) =>
    update("speakers", (event.speakers || []).filter((_, idx) => idx !== i));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url =
        mode === "edit"
          ? `/api/events/${initial?.slug}`
          : "/api/events";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to save");
      router.push("/admin/content/events");
      router.refresh();
    } catch (err) {
      console.log("[v0] save event error", err);
      alert("Failed to save event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/events/${initial?.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      router.push("/admin/content/events");
      router.refresh();
    } catch (err) {
      console.log("[v0] delete event error", err);
      alert("Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="flex items-center justify-between mb-12">
        <div>
          <Link
            href="/admin/content/events"
            className="text-qbf-gray hover:text-qbf-orange flex items-center gap-2 mb-4 text-sm font-bold"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <h2 className="text-5xl font-display font-black">
            {mode === "new" ? "New Event" : `Edit: ${initial?.title}`}
          </h2>
        </div>
        <div className="flex gap-3">
          {mode === "edit" ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="border border-red-300 text-red-600 px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} /> Delete
            </button>
          ) : null}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-qbf-orange text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={16} /> {isLoading ? "Saving…" : "Save Event"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-qbf-divider">
            <h3 className="font-display font-black text-2xl mb-6">Core Info</h3>
            <div className="space-y-4">
              <Field label="Title">
                <input
                  className="qbf-input"
                  value={event.title}
                  onChange={(e) => update("title", e.target.value)}
                  required
                />
              </Field>
              <Field label="Slug (URL)">
                <input
                  className="qbf-input"
                  value={event.slug}
                  onChange={(e) => update("slug", e.target.value)}
                  placeholder="clmp-certification-london-jun-2026"
                  required
                />
              </Field>
              <Field label="Tagline (one-line summary)">
                <input
                  className="qbf-input"
                  value={event.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className="qbf-input min-h-[140px]"
                  value={event.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-qbf-divider">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-black text-2xl">Agenda</h3>
              <button
                type="button"
                onClick={addAgenda}
                className="text-qbf-orange text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add item
              </button>
            </div>
            <div className="space-y-3">
              {(event.agenda || []).length === 0 ? (
                <p className="text-qbf-gray text-sm">
                  No agenda yet. Add session breakdowns or day-by-day topics.
                </p>
              ) : null}
              {(event.agenda || []).map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="qbf-input flex-1"
                    value={item}
                    onChange={(e) => updateAgenda(i, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeAgenda(i)}
                    className="border border-qbf-divider rounded-full px-3 text-qbf-gray hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-qbf-divider">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-black text-2xl">Speakers</h3>
              <button
                type="button"
                onClick={addSpeaker}
                className="text-qbf-orange text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add speaker
              </button>
            </div>
            <div className="space-y-3">
              {(event.speakers || []).length === 0 ? (
                <p className="text-qbf-gray text-sm">
                  No speakers added yet.
                </p>
              ) : null}
              {(event.speakers || []).map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <input
                    className="qbf-input"
                    placeholder="Name"
                    value={s.name}
                    onChange={(e) =>
                      updateSpeaker(i, { name: e.target.value })
                    }
                  />
                  <input
                    className="qbf-input"
                    placeholder="Role / Company"
                    value={s.role || ""}
                    onChange={(e) =>
                      updateSpeaker(i, { role: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeSpeaker(i)}
                    className="border border-qbf-divider rounded-full px-3 text-qbf-gray hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-qbf-divider">
            <h3 className="font-display font-black text-2xl mb-6">
              Categorisation
            </h3>
            <div className="space-y-4">
              <Field label="Category">
                <select
                  className="qbf-input"
                  value={event.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Format">
                <select
                  className="qbf-input"
                  value={event.format}
                  onChange={(e) => update("format", e.target.value)}
                >
                  {FORMAT_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  className="qbf-input"
                  value={event.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  {STATUS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={event.featured || false}
                  onChange={(e) => update("featured", e.target.checked)}
                />
                Featured event
              </label>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-qbf-divider">
            <h3 className="font-display font-black text-2xl mb-6">
              Schedule & Location
            </h3>
            <div className="space-y-4">
              <Field label="Start date">
                <input
                  type="date"
                  className="qbf-input"
                  value={event.startDate || ""}
                  onChange={(e) => update("startDate", e.target.value)}
                />
              </Field>
              <Field label="End date">
                <input
                  type="date"
                  className="qbf-input"
                  value={event.endDate || ""}
                  onChange={(e) => update("endDate", e.target.value)}
                />
              </Field>
              <Field label="Time">
                <input
                  className="qbf-input"
                  placeholder="09:00 – 17:00 BST"
                  value={event.time || ""}
                  onChange={(e) => update("time", e.target.value)}
                />
              </Field>
              <Field label="Duration">
                <input
                  className="qbf-input"
                  placeholder="5 days"
                  value={event.duration || ""}
                  onChange={(e) => update("duration", e.target.value)}
                />
              </Field>
              <Field label="Location (city, country)">
                <input
                  className="qbf-input"
                  value={event.location || ""}
                  onChange={(e) => update("location", e.target.value)}
                />
              </Field>
              <Field label="Venue">
                <input
                  className="qbf-input"
                  value={event.venue || ""}
                  onChange={(e) => update("venue", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-qbf-divider">
            <h3 className="font-display font-black text-2xl mb-6">
              Capacity & Pricing
            </h3>
            <div className="space-y-4">
              <Field label="Capacity">
                <input
                  type="number"
                  className="qbf-input"
                  value={event.capacity ?? ""}
                  onChange={(e) =>
                    update(
                      "capacity",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </Field>
              <Field label="Seats left">
                <input
                  type="number"
                  className="qbf-input"
                  value={event.seatsLeft ?? ""}
                  onChange={(e) =>
                    update(
                      "seatsLeft",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </Field>
              <Field label="Price (display)">
                <input
                  className="qbf-input"
                  placeholder="GBP 4,950"
                  value={event.price || ""}
                  onChange={(e) => update("price", e.target.value)}
                />
              </Field>
              <Field label="Registration URL">
                <input
                  className="qbf-input"
                  placeholder="/contact or https://..."
                  value={event.registrationUrl || ""}
                  onChange={(e) => update("registrationUrl", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .qbf-input {
          width: 100%;
          background: white;
          border: 1px solid var(--qbf-divider, #e5e5e5);
          border-radius: 999px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 500;
          color: var(--qbf-black, #111);
          outline: none;
          transition: border-color 0.2s;
        }
        .qbf-input:focus {
          border-color: var(--qbf-orange, #ff5500);
        }
        textarea.qbf-input {
          border-radius: 20px;
          font-family: inherit;
          line-height: 1.5;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-qbf-gray mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );
}
