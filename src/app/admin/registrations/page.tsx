"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Check,
  X,
  User,
  Building2,
  Trash2,
  Loader2,
} from "lucide-react";

type Registration = {
  id: string;
  kind: "talent" | "company";
  status: "Pending" | "Approved" | "Rejected";
  data: Record<string, any>;
  createdAt: string;
};

const TABS = ["Talent", "Company"] as const;
const STATUSES = ["Pending", "Approved", "Rejected"] as const;

export default function RegistrationReviewPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Talent");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUSES)[number] | "All">("All");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/registrations", { cache: "no-store" });
      const data = await res.json();
      setRegistrations(Array.isArray(data) ? data : []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return registrations
      .filter((r) =>
        activeTab === "Talent" ? r.kind === "talent" : r.kind === "company"
      )
      .filter((r) => statusFilter === "All" || r.status === statusFilter)
      .filter((r) => {
        if (!q) return true;
        return JSON.stringify(r.data || {})
          .toLowerCase()
          .includes(q);
      });
  }, [registrations, activeTab, statusFilter, search]);

  const updateStatus = async (
    id: string,
    status: "Approved" | "Rejected" | "Pending"
  ) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch {
      alert("Failed to update status.");
    } finally {
      setBusyId(null);
    }
  };

  const deleteReg = async (id: string) => {
    if (!confirm("Delete this registration?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-black">Registration Review</h2>
          <p className="text-sm text-qbf-gray mt-1">
            {registrations.filter((r) => r.status === "Pending").length} pending across{" "}
            {registrations.length} total
          </p>
        </div>
        <div className="flex bg-white border border-qbf-divider p-1 rounded-full">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeTab === tab
                  ? "bg-qbf-orange text-white"
                  : "text-qbf-gray hover:text-qbf-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {(["All", ...STATUSES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f as any)}
              className={`px-5 py-2 rounded-full border text-sm font-bold transition-all ${
                statusFilter === f
                  ? "bg-qbf-black text-white border-qbf-black"
                  : "border-qbf-divider text-qbf-gray hover:border-qbf-orange hover:text-qbf-orange"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            className="w-full bg-white border border-qbf-divider px-10 py-3 rounded-full text-sm focus:outline-none focus:border-qbf-orange transition-all"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray"
            size={16}
          />
        </div>
      </div>

      <div className="bg-white border border-qbf-divider rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-qbf-white border-b border-qbf-divider">
              <tr className="text-[11px] font-bold uppercase tracking-widest text-qbf-gray">
                <th className="px-6 py-4">
                  {activeTab === "Talent" ? "Name / Role" : "Company / Industry"}
                </th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qbf-divider">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    <Loader2 className="inline-block mr-2 animate-spin" size={14} />
                    Loading registrations...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    No registrations match this view
                  </td>
                </tr>
              ) : (
                filtered.map((reg) => {
                  const d = reg.data || {};
                  return (
                    <tr
                      key={reg.id}
                      className="hover:bg-qbf-white/60 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-qbf-divider rounded-lg flex items-center justify-center shrink-0">
                            {reg.kind === "talent" ? (
                              <User size={18} />
                            ) : (
                              <Building2 size={18} />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-qbf-black leading-tight">
                              {reg.kind === "talent"
                                ? d.name || "Unnamed"
                                : d.companyName || "Unnamed"}
                            </p>
                            <p className="text-sm text-qbf-gray font-medium">
                              {reg.kind === "talent"
                                ? d.role || "—"
                                : d.industry || "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-qbf-gray max-w-xs truncate">
                          {reg.kind === "talent"
                            ? `Skills: ${d.skills || "—"}`
                            : `Contact: ${d.contactEmail || "—"}`}
                        </p>
                        <p className="text-[11px] text-qbf-gray/70 mt-0.5">
                          {new Date(reg.createdAt).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                            reg.status === "Approved"
                              ? "bg-green-50 text-green-600"
                              : reg.status === "Rejected"
                              ? "bg-red-50 text-red-600"
                              : "bg-orange-50 text-qbf-orange"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => updateStatus(reg.id, "Approved")}
                            disabled={busyId === reg.id}
                            className="w-9 h-9 bg-qbf-white border border-green-200 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all disabled:opacity-50"
                            aria-label="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(reg.id, "Rejected")}
                            disabled={busyId === reg.id}
                            className="w-9 h-9 bg-qbf-white border border-red-200 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
                            aria-label="Reject"
                          >
                            <X size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteReg(reg.id)}
                            disabled={busyId === reg.id}
                            className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all disabled:opacity-50"
                            aria-label="Delete"
                          >
                            {busyId === reg.id ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
