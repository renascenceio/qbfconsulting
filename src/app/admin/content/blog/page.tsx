"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-display font-black">Blog Posts</h2>
        <Link href="/admin/content/blog/new" className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20">
          <Plus size={24} /> New Post
        </Link>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-4">
          {["All", "Published", "Draft", "Scheduled"].map((f) => (
            <button key={f} className="px-6 py-2 rounded-full border border-qbf-divider font-bold text-sm hover:border-qbf-orange hover:text-qbf-orange transition-all">
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full bg-white border border-qbf-divider px-10 py-3 rounded-full text-sm focus:outline-none focus:border-qbf-orange transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={16} />
        </div>
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10">Title</th>
              <th className="p-10">Category</th>
              <th className="p-10">Author</th>
              <th className="p-10">Date</th>
              <th className="p-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <tr key={i} className="hover:bg-qbf-white/50 transition-all group">
                  <td className="p-10 font-bold text-qbf-black text-lg max-w-sm leading-snug">{post.title}</td>
                  <td className="p-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-qbf-orange-muted text-qbf-orange">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-10 text-qbf-gray font-bold text-sm uppercase tracking-widest">{post.author}</td>
                  <td className="p-10 text-qbf-gray font-bold text-sm uppercase tracking-widest">{post.date}</td>
                  <td className="p-10 text-right">
                    <div className="flex gap-4 justify-end">
                      <Link href={`/blog/${post.slug || post.id}`} className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-orange hover:text-white hover:border-qbf-orange transition-all">
                        <Eye size={18} />
                      </Link>
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
                  {isLoading ? "Loading posts..." : "No posts found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
