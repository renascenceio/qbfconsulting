"use client";

import { useState, useEffect } from "react";
import { Plus, MapPin, Briefcase, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

type Job = {
  id?: string;
  slug: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  status?: string;
};

export default function CareerManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busySlug, setBusySlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/careers", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (job: Job) => {
    if (!confirm(`Remove "${job.title}"? This cannot be undone.`)) return;
    setBusySlug(job.slug);
    try {
      const res = await fetch(`/api/careers/${job.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setJobs((prev) => prev.filter((j) => j.slug !== job.slug));
    } catch {
      alert("Failed to delete the role.");
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-black">Careers</h2>
          <p className="text-sm text-qbf-gray mt-1">
            {jobs.length} role{jobs.length === 1 ? "" : "s"} listed
          </p>
        </div>
        <Link
          href="/admin/content/careers/new"
          className="bg-qbf-orange text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <Plus size={18} /> New Role
        </Link>
      </div>

      <div className="bg-white border border-qbf-divider rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-qbf-white border-b border-qbf-divider">
              <tr className="text-[11px] font-bold uppercase tracking-widest text-qbf-gray">
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qbf-divider">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    <Loader2 className="inline-block mr-2 animate-spin" size={14} />
                    Loading roles...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    No open roles published
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.slug}
                    className="hover:bg-qbf-white/60 transition-all"
                  >
                    <td className="px-6 py-4 font-bold text-qbf-black max-w-md leading-snug">
                      <Link
                        href={`/admin/content/careers/${job.slug}`}
                        className="hover:text-qbf-orange"
                      >
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {job.department ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-blue-50 text-blue-600">
                          {job.department}
                        </span>
                      ) : (
                        <span className="text-qbf-gray text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-qbf-gray text-sm font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} /> {job.location || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-qbf-gray text-sm font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase size={13} /> {job.type || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/content/careers/${job.slug}`}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(job)}
                          disabled={busySlug === job.slug}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
                          aria-label="Delete"
                        >
                          {busySlug === job.slug ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
