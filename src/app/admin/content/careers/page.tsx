"use client";

import { useState, useEffect } from "react";
import { Plus, MapPin, Briefcase, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CareerManagementPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-display font-black">Careers</h2>
        <Link
          href="/admin/content/careers/new"
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
        >
          <Plus size={24} /> New Role
        </Link>
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10">Role Title</th>
              <th className="p-10">Department</th>
              <th className="p-10">Location</th>
              <th className="p-10">Type</th>
              <th className="p-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {jobs.length > 0 ? (
              jobs.map((job, i) => (
                <tr key={i} className="hover:bg-qbf-white/50 transition-all group">
                  <td className="p-10 font-bold text-qbf-black text-lg max-w-sm leading-snug">{job.title}</td>
                  <td className="p-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-blue-50 text-blue-600">
                      {job.department}
                    </span>
                  </td>
                  <td className="p-10">
                    <div className="text-qbf-gray font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={14} /> {job.location}
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="text-qbf-gray font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={14} /> {job.type}
                    </div>
                  </td>
                  <td className="p-10 text-right">
                    <div className="flex gap-4 justify-end">
                      <button className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-20 text-center text-qbf-gray font-bold uppercase tracking-widest text-xs">
                  {isLoading ? "Loading roles..." : "No open roles published"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
