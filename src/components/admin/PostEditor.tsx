"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Type,
  Layout,
  Tag,
  User,
  Calendar,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";

type Mode = "create" | "edit";

type PostInput = {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  status: string;
  readTime: string;
  date: string;
  tags?: string[];
};

const CATEGORIES = [
  "Loyalty Strategy",
  "Loyalty Tech",
  "Loyalty Education",
  "Loyalty Trends",
];

const STATUSES = ["Draft", "Published", "Scheduled"];

export function PostEditor({
  mode,
  initial,
}: {
  mode: Mode;
  initial: PostInput;
}) {
  const [post, setPost] = useState<PostInput>({
    ...initial,
    tags: initial.tags || [],
  });
  const [tagsInput, setTagsInput] = useState<string>(
    (initial.tags || []).join(", ")
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = { ...post, tags };

      const url =
        mode === "edit"
          ? `/api/posts/${encodeURIComponent(initial.slug || "")}`
          : "/api/posts";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/content/blog");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to save the post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (mode !== "edit" || !initial.slug) return;
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/posts/${initial.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/content/blog");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to delete");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content/blog"
            className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-3xl font-display font-black">
            {mode === "edit" ? "Edit Post" : "New Blog Post"}
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
            {isSaving ? "Saving..." : mode === "edit" ? "Save Changes" : "Publish Post"}
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
                <Type size={14} className="text-qbf-orange" /> Title
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="The Future of Loyalty..."
                required
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-4 rounded-xl text-xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Slug
              </label>
              <input
                type="text"
                value={post.slug || ""}
                onChange={(e) =>
                  setPost({ ...post, slug: e.target.value.toLowerCase() })
                }
                placeholder="auto-generated from title"
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-3 rounded-xl text-sm font-mono focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Excerpt
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                rows={3}
                placeholder="A brief summary for the card view..."
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-4 rounded-xl focus:outline-none focus:border-qbf-orange transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Body Content
              </label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                rows={18}
                placeholder="Write your article here. Separate paragraphs with a blank line."
                className="w-full bg-qbf-white border border-qbf-divider px-5 py-5 rounded-xl focus:outline-none focus:border-qbf-orange transition-all font-body leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-qbf-divider rounded-2xl p-6 lg:p-8 space-y-6">
            <h3 className="text-lg font-display font-black">Settings</h3>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                Status
              </label>
              <select
                value={post.status}
                onChange={(e) => setPost({ ...post, status: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Category
              </label>
              <select
                value={post.category}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <User size={14} className="text-qbf-orange" /> Author
              </label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Calendar size={14} className="text-qbf-orange" /> Display Date
              </label>
              <input
                type="text"
                value={post.date}
                onChange={(e) => setPost({ ...post, date: e.target.value })}
                placeholder="May 12, 2024"
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Clock size={14} className="text-qbf-orange" /> Read Time
              </label>
              <input
                type="text"
                value={post.readTime}
                onChange={(e) =>
                  setPost({ ...post, readTime: e.target.value })
                }
                placeholder="5 min read"
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Loyalty, Strategy, Trends"
                className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
              <p className="text-[11px] text-qbf-gray">
                Comma-separated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
