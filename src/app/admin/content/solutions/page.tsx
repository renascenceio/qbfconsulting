"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, Layers } from "lucide-react";
import Link from "next/link";

export default function SolutionsAdminPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    fetch("/api/solutions")
      .then(res => res.json())
      .then(data => {
        setSolutions(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this solution?")) return;
    await fetch(`/api/solutions/${slug}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-display font-black">Solutions</h2>
          <p className="text-qbf-gray mt-2">Productised loyalty engagements shown on /solutions.</p>
        </div>
        <Link
          href="/admin/content/solutions/new"
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
        >
          <Plus size={24} /> New Solution
        </Link>
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10">Title</th>
              <th className="p-10">Category</th>
              <th className="p-10">Duration</th>
              <th className="p-10">Status</th>
              <th className="p-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {solutions.length > 0 ? (
              solutions.map((solution) => (
                <tr key={solution.id} className="hover:bg-qbf-white/50 transition-all">
                  <td className="p-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-qbf-orange-muted rounded-xl flex items-center justify-center text-qbf-orange shrink-0">
                        <Layers size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-qbf-black text-lg leading-snug">{solution.title}</div>
                        <div className="text-xs text-qbf-gray font-mono mt-1">/{solution.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-qbf-orange-muted text-qbf-orange">
                      {solution.category}
                    </span>
                  </td>
                  <td className="p-10 text-qbf-gray font-bold text-sm uppercase tracking-widest">{solution.duration}</td>
                  <td className="p-10">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full ${
                      solution.status === "Published"
                        ? "bg-green-50 text-green-600"
                        : "bg-qbf-divider text-qbf-gray"
                    }`}>
                      {solution.status}
                    </span>
                  </td>
                  <td className="p-10 text-right">
                    <div className="flex gap-4 justify-end">
                      <Link
                        href={`/solutions/${solution.slug}`}
                        target="_blank"
                        className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-orange hover:text-white hover:border-qbf-orange transition-all"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/content/solutions/${solution.slug}`}
                        className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(solution.slug)}
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
                <td colSpan={5} className="p-20 text-center text-qbf-gray font-bold uppercase tracking-widest text-xs">
                  {isLoading ? "Loading solutions..." : "No solutions yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
