"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

type Mode = "create" | "edit";

type UserInput = {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const ROLES = ["Super Admin", "Admin", "Editor", "Author"];
const STATUSES = ["Active", "Suspended"];

export function UserEditor({
  mode,
  initial,
}: {
  mode: Mode;
  initial: UserInput;
}) {
  const [user, setUser] = useState<UserInput>(initial);
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
          ? `/api/users/${encodeURIComponent(initial.id || "")}`
          : "/api/users";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Save failed");
      }
      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/users"
            className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-3xl font-display font-black">
            {mode === "edit" ? "Edit User" : "New User"}
          </h2>
        </div>
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
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl text-sm">
          {error}
        </div>
      ) : null}

      <div className="bg-white border border-qbf-divider rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              Name
            </label>
            <input
              required
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg text-sm font-medium focus:outline-none focus:border-qbf-orange"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              Email
            </label>
            <input
              required
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg text-sm font-medium focus:outline-none focus:border-qbf-orange"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              Role
            </label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg text-sm font-bold focus:outline-none focus:border-qbf-orange"
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              Status
            </label>
            <select
              value={user.status}
              onChange={(e) => setUser({ ...user, status: e.target.value })}
              className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg text-sm font-bold focus:outline-none focus:border-qbf-orange"
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-qbf-gray">
          Note: roles are stored for the admin record only. Login is currently controlled by the credentials in <code className="font-mono text-qbf-black">/api/auth</code> — wire users to the auth handler to extend access.
        </p>
      </div>
    </form>
  );
}
