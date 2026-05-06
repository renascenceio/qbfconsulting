"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  MapPin,
  Briefcase,
  Tag,
  Clock,
  Type,
  Loader2,
} from "lucide-react";

type Mode = "create" | "edit";

type JobInput = {
  id?: string;
  slug?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  status: string;
  date: string;
};

const DEPARTMENTS = ["Strategy", "Implementation", "Management", "Tech", "Marketing"];
const TYPES = ["Full-time", "Contract", "Part-time", "Internship"];
const STATUSES = ["Active", "Closed", "Draft"];

export function CareerEditor({
  mode,
  initial,
}: {
  mode: Mode;
  initial: JobInput;
}) {
  const [job, setJob] = useState<JobInput>(initial);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const url =
        mode === "edit"
          ? `/api/careers/${encodeURIComponent(initial.slug || "")}`
          : "/api/careers";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/content/careers");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (mode !== "edit" || !initial.slug) return;
    if (!confirm(`Delete "${job.title}"?`)) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/careers/${initial.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      router.push("/admin/content/careers");
      router.refresh();
    } catch {
      setError("Failed to delete");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content/careers"
            className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-3xl font-display font-black">
            {mode === "edit" ? "Edit Role" : "New Role"}
          </h2>
        </div>
        <div className="flex gap-3">
          {mode === "edit" ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving}
              className="bg-white border border-red-200 text-red-600 px-5 py-3 rounded-full text-sm font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
            >
              Delete
            </button>
          ) : null}
          <button
            type="submit"
            disabled={isSaving}
            className="bg-qbf-orange text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            {isSaving ? "Saving..." : mode === "edit" ? "Save Changes" : "Post Role"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl text-sm">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-qbf-divider rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Briefcase size={14} className="text-qbf-orange" /> Title
              </label>
              <input
                required
                type="text"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-4 rounded-xl text-xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                Slug
              </label>
              <input
                type="text"
                value={job.slug || ""}
                onChange={(e) =>
                  setJob({ ...job, slug: e.target.value.toLowerCase() })
                }
                placeholder="auto-generated from title"
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-3 rounded-xl text-sm font-mono focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Description
              </label>
              <textarea
                value={job.description}
                onChange={(e) =>
                  setJob({ ...job, description: e.target.value })
                }
                rows={14}
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-5 rounded-xl focus:outline-none focus:border-qbf-orange transition-all font-body leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-qbf-divider rounded-2xl p-6 lg:p-8 space-y-6">
            <h3 className="text-lg font-display font-black">Details</h3>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                Status
              </label>
              <select
                value={job.status}
                onChange={(e) => setJob({ ...job, status: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Department
              </label>
              <select
                value={job.department}
                onChange={(e) =>
                  setJob({ ...job, department: e.target.value })
                }
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <MapPin size={14} className="text-qbf-orange" /> Location
              </label>
              <input
                type="text"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Clock size={14} className="text-qbf-orange" /> Type
              </label>
              <select
                value={job.type}
                onChange={(e) => setJob({ ...job, type: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                Display Date
              </label>
              <input
                type="text"
                value={job.date}
                onChange={(e) => setJob({ ...job, date: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
