"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Type, Layout, Tag, User, Calendar } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const [post, setPost] = useState({
    title: "",
    slug: "",
    category: "Loyalty Strategy",
    author: "Founder Name",
    excerpt: "",
    content: "",
    status: "Draft",
    readTime: "5 min read",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/content/blog");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-6">
          <Link href="/admin/content/blog" className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-4xl font-display font-black">New Blog Post</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 disabled:opacity-50"
        >
          <Save size={24} /> {isLoading ? "Saving..." : "Publish Post"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Title
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="The Future of Loyalty..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-2xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Excerpt
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({...post, excerpt: e.target.value})}
                rows={3}
                placeholder="A brief summary for the card view..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange transition-all resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Body Content
              </label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({...post, content: e.target.value})}
                rows={15}
                placeholder="Write your article here..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-8 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange transition-all font-body leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-10 shadow-2xl shadow-black/5 space-y-8">
            <h3 className="text-xl font-display font-black">Settings</h3>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Category
              </label>
              <select
                value={post.category}
                onChange={(e) => setPost({...post, category: e.target.value})}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                <option>Loyalty Strategy</option>
                <option>Loyalty Tech</option>
                <option>Loyalty Education</option>
                <option>Loyalty Trends</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <User size={14} className="text-qbf-orange" /> Author
              </label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => setPost({...post, author: e.target.value})}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Calendar size={14} className="text-qbf-orange" /> Read Time
              </label>
              <input
                type="text"
                value={post.readTime}
                onChange={(e) => setPost({...post, readTime: e.target.value})}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="pt-6 border-t border-qbf-divider">
              <div className="bg-qbf-divider aspect-video rounded-2xl flex flex-col items-center justify-center text-qbf-gray/40 border-2 border-dashed border-qbf-gray/10 cursor-pointer hover:border-qbf-orange transition-all">
                <ImageIcon size={32} />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-4">Featured Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
