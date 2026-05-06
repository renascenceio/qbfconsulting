"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesAdminPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    fetch("/api/case-studies")
      .then((res) => res.json())
      .then((data) => {
        setStudies(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this case study?")) return;
    await fetch(`/api/case-studies/${slug}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-display font-black">Case Studies</h2>
          <p className="text-qbf-gray mt-2">Real-world engagements shown on /case-studies.</p>
        </div>
        <Link
          href="/admin/content/case-studies/new"
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
        >
          <Plus size={24} /> New Case Study
        </Link>
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10">Title / Client</th>
              <th className="p-10">Industry</th>
              <th className="p-10">Region</th>
              <th className="p-10">Headline Metric</th>
              <th className="p-10">Status</th>
              <th className="p-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {studies.length > 0 ? (
              studies.map((s) => (
                <tr key={s.id} className="hover:bg-qbf-white/50 transition-all">
                  <td className="p-10">
                    <div className="font-bold text-qbf-black text-lg leading-snug mb-1">{s.title}</div>
                    <div className="text-xs text-qbf-gray font-medium flex items-center gap-1.5">
                      <Building2 size={12} /> {s.client}
                    </div>
                  </td>
                  <td className="p-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-qbf-orange-muted text-qbf-orange">
                      {s.industry}
                    </span>
                  </td>
                  <td className="p-10 text-qbf-gray font-bold text-sm uppercase tracking-widest">{s.region}</td>
                  <td className="p-10">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-qbf-orange" />
                      <span className="font-black text-qbf-black">{s.headlineMetric}</span>
                      <span className="text-xs text-qbf-gray font-medium">{s.headlineMetricLabel}</span>
                    </div>
                  </td>
                  <td className="p-10">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full ${
                      s.status === "Published"
                        ? "bg-green-50 text-green-600"
                        : "bg-qbf-divider text-qbf-gray"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-10 text-right">
                    <div className="flex gap-4 justify-end">
                      <Link
                        href={`/case-studies/${s.slug}`}
                        target="_blank"
                        className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-orange hover:text-white hover:border-qbf-orange transition-all"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/content/case-studies/${s.slug}`}
                        className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(s.slug)}
                        className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-20 text-center text-qbf-gray font-bold uppercase tracking-widest text-xs">
                  {isLoading ? "Loading case studies..." : "No case studies yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
