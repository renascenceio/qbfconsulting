"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react";
import Link from "next/link";

type Post = {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  author?: string;
  date?: string;
  status?: string;
};

const FILTERS = ["All", "Published", "Draft", "Scheduled"] as const;
type Filter = (typeof FILTERS)[number];

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [busySlug, setBusySlug] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts
      .filter((p) => filter === "All" || p.status === filter)
      .filter((p) => {
        if (!q) return true;
        return (
          (p.title || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          (p.author || "").toLowerCase().includes(q)
        );
      });
  }, [posts, filter, search]);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (e) {
      alert("Failed to delete the post.");
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-black">Blog Posts</h2>
          <p className="text-sm text-qbf-gray mt-1">
            {posts.length} total · {posts.filter((p) => p.status === "Published").length} published
          </p>
        </div>
        <Link
          href="/admin/content/blog/new"
          className="bg-qbf-orange text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <Plus size={18} /> New Post
        </Link>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full border text-sm font-bold transition-all ${
                filter === f
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
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
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
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qbf-divider">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-qbf-gray font-bold uppercase tracking-widest text-xs"
                  >
                    <Loader2 className="inline-block mr-2 animate-spin" size={14} />{" "}
                    Loading posts...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-qbf-gray font-bold uppercase tracking-widest text-xs"
                  >
                    No posts found
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr
                    key={post.slug}
                    className="hover:bg-qbf-white/60 transition-all"
                  >
                    <td className="px-6 py-5 font-bold text-qbf-black max-w-md leading-snug">
                      <Link
                        href={`/admin/content/blog/${post.slug}`}
                        className="hover:text-qbf-orange"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-5">
                      {post.category ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-qbf-orange/10 text-qbf-orange">
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-qbf-gray text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-qbf-gray font-medium text-sm">
                      {post.author || "—"}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          post.status === "Published"
                            ? "bg-green-50 text-green-600"
                            : post.status === "Scheduled"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-qbf-divider text-qbf-gray"
                        }`}
                      >
                        {post.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-qbf-gray font-medium text-sm">
                      {post.date || "—"}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-qbf-orange hover:text-white hover:border-qbf-orange transition-all"
                          aria-label="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/content/blog/${post.slug}`}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.slug, post.title)}
                          disabled={busySlug === post.slug}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
                          aria-label="Delete"
                        >
                          {busySlug === post.slug ? (
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
