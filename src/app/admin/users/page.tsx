"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  ShieldCheck,
  Mail,
} from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
};

const ROLES = ["All", "Super Admin", "Admin", "Editor", "Author"];
const STATUSES = ["All", "Active", "Suspended"];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setIsLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users
      .filter((u) => roleFilter === "All" || u.role === roleFilter)
      .filter((u) => statusFilter === "All" || u.status === statusFilter)
      .filter((u) => {
        if (!q) return true;
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        );
      });
  }, [users, search, roleFilter, statusFilter]);

  const handleDelete = async (user: User) => {
    if (user.role === "Super Admin") {
      alert("You cannot delete a Super Admin from the UI.");
      return;
    }
    if (!confirm(`Remove ${user.name} (${user.email})?`)) return;
    setBusyId(user.id);
    try {
      const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch {
      alert("Failed to delete the user.");
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const next = user.status === "Active" ? "Suspended" : "Active";
    setBusyId(user.id);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, status: next }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: next } : u))
      );
    } catch {
      alert("Failed to update status.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-black">User Management</h2>
          <p className="text-sm text-qbf-gray mt-1">
            {users.length} total users · {users.filter((u) => u.status === "Active").length} active
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="bg-qbf-orange text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <Plus size={18} /> New User
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white border border-qbf-divider px-4 py-2.5 rounded-full text-sm font-bold focus:outline-none focus:border-qbf-orange"
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-qbf-divider px-4 py-2.5 rounded-full text-sm font-bold focus:outline-none focus:border-qbf-orange"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search users..."
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
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
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
                    Loading users...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-qbf-white/60 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-qbf-orange/10 text-qbf-orange flex items-center justify-center text-sm font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-qbf-black leading-tight">
                            {user.name}
                          </p>
                          {user.role === "Super Admin" ? (
                            <p className="text-[10px] font-bold text-qbf-orange uppercase tracking-widest flex items-center gap-1 mt-0.5">
                              <ShieldCheck size={11} /> Super Admin
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-qbf-gray text-sm font-medium">
                      <span className="inline-flex items-center gap-2">
                        <Mail size={14} className="text-qbf-gray/70" />
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          user.role === "Super Admin"
                            ? "bg-qbf-orange/10 text-qbf-orange"
                            : user.role === "Admin"
                            ? "bg-blue-50 text-blue-600"
                            : user.role === "Editor"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-qbf-divider text-qbf-gray"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(user)}
                        disabled={busyId === user.id}
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          disabled={
                            busyId === user.id || user.role === "Super Admin"
                          }
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Delete"
                        >
                          {busyId === user.id ? (
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
