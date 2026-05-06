"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save, ArrowLeft, Type, Layout, Tag, Clock, DollarSign, Hash,
  Plus, Trash2, ListChecks, Sparkles
} from "lucide-react";

const ICON_OPTIONS = [
  "stethoscope",
  "cpu",
  "settings",
  "users",
  "sparkles",
  "book",
];

const CATEGORY_OPTIONS = [
  "Diagnostic",
  "Strategy",
  "Management",
  "Tech",
  "Education",
];

type Cover = { title: string; description: string };

export default function SolutionEditor({ initial, mode }: { initial?: any; mode: "new" | "edit" }) {
  const [solution, setSolution] = useState<any>(
    initial || {
      slug: "",
      title: "",
      category: "Strategy",
      icon: "sparkles",
      tagline: "",
      valueProp: "",
      covers: [] as Cover[],
      deliverables: [] as string[],
      duration: "",
      format: "",
      pricing: "Enquire for pricing",
      ctaTitle: "Ready to get started?",
      status: "Published",
      order: 99,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const update = (patch: any) => setSolution((s: any) => ({ ...s, ...patch }));

  const updateCover = (i: number, patch: Partial<Cover>) => {
    const covers = [...(solution.covers || [])];
    covers[i] = { ...covers[i], ...patch };
    update({ covers });
  };

  const addCover = () =>
    update({
      covers: [...(solution.covers || []), { title: "", description: "" }],
    });

  const removeCover = (i: number) =>
    update({ covers: solution.covers.filter((_: any, idx: number) => idx !== i) });

  const updateDeliverable = (i: number, value: string) => {
    const deliverables = [...(solution.deliverables || [])];
    deliverables[i] = value;
    update({ deliverables });
  };

  const addDeliverable = () =>
    update({ deliverables: [...(solution.deliverables || []), ""] });

  const removeDeliverable = (i: number) =>
    update({ deliverables: solution.deliverables.filter((_: any, idx: number) => idx !== i) });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "new") {
        await fetch("/api/solutions", {
          method: "POST",
          body: JSON.stringify(solution),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch(`/api/solutions/${initial.slug}`, {
          method: "PUT",
          body: JSON.stringify(solution),
          headers: { "Content-Type": "application/json" },
        });
      }
      router.push("/admin/content/solutions");
      router.refresh();
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
          <Link href="/admin/content/solutions" className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-4xl font-display font-black">
            {mode === "new" ? "New Solution" : "Edit Solution"}
          </h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 disabled:opacity-50"
        >
          <Save size={24} /> {isLoading ? "Saving..." : "Save Solution"}
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
                value={solution.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="Loyalty Program Health Check..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-2xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                  <Hash size={14} className="text-qbf-orange" /> Slug
                </label>
                <input
                  type="text"
                  value={solution.slug}
                  onChange={(e) => update({ slug: e.target.value })}
                  placeholder="loyalty-program-health-check"
                  className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange font-mono"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                  <Hash size={14} className="text-qbf-orange" /> Order
                </label>
                <input
                  type="number"
                  value={solution.order ?? 99}
                  onChange={(e) => update({ order: parseInt(e.target.value) || 99 })}
                  className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Tagline (one-liner shown on cards)
              </label>
              <input
                type="text"
                value={solution.tagline}
                onChange={(e) => update({ tagline: e.target.value })}
                placeholder="Diagnose what is working, what is not..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-5 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Value Proposition (longer)
              </label>
              <textarea
                value={solution.valueProp}
                onChange={(e) => update({ valueProp: e.target.value })}
                rows={4}
                placeholder="An intensive audit of your existing loyalty program..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Covers (what this solution covers) */}
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display font-black flex items-center gap-3">
                <ListChecks size={20} className="text-qbf-orange" /> What this solution covers
              </h3>
              <button
                type="button"
                onClick={addCover}
                className="bg-qbf-black text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
              >
                <Plus size={16} /> Add cover
              </button>
            </div>
            {(solution.covers || []).map((cover: Cover, i: number) => (
              <div key={i} className="bg-qbf-white border border-qbf-divider rounded-[2rem] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">
                    Cover {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCover(i)}
                    className="text-qbf-gray hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value={cover.title}
                  onChange={(e) => updateCover(i, { title: e.target.value })}
                  placeholder="Cover title"
                  className="w-full bg-white border border-qbf-divider px-5 py-3 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
                />
                <textarea
                  value={cover.description}
                  onChange={(e) => updateCover(i, { description: e.target.value })}
                  rows={2}
                  placeholder="Description"
                  className="w-full bg-white border border-qbf-divider px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-qbf-orange resize-none"
                />
              </div>
            ))}
            {(solution.covers || []).length === 0 && (
              <p className="text-qbf-gray text-sm font-medium">No covers added yet.</p>
            )}
          </div>

          {/* Deliverables */}
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display font-black flex items-center gap-3">
                <Sparkles size={20} className="text-qbf-orange" /> Deliverables
              </h3>
              <button
                type="button"
                onClick={addDeliverable}
                className="bg-qbf-black text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            {(solution.deliverables || []).map((d: string, i: number) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={d}
                  onChange={(e) => updateDeliverable(i, e.target.value)}
                  placeholder="Comprehensive Health Check Report"
                  className="flex-1 bg-qbf-white border border-qbf-divider px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-qbf-orange"
                />
                <button
                  type="button"
                  onClick={() => removeDeliverable(i)}
                  className="text-qbf-gray hover:text-red-500 transition-all w-10 h-10 flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {(solution.deliverables || []).length === 0 && (
              <p className="text-qbf-gray text-sm font-medium">No deliverables added yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-10 shadow-2xl shadow-black/5 space-y-6">
            <h3 className="text-xl font-display font-black">Configuration</h3>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Category
              </label>
              <select
                value={solution.category}
                onChange={(e) => update({ category: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Sparkles size={14} className="text-qbf-orange" /> Icon
              </label>
              <select
                value={solution.icon}
                onChange={(e) => update({ icon: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                {ICON_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Clock size={14} className="text-qbf-orange" /> Duration
              </label>
              <input
                type="text"
                value={solution.duration}
                onChange={(e) => update({ duration: e.target.value })}
                placeholder="2 weeks"
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Format
              </label>
              <input
                type="text"
                value={solution.format}
                onChange={(e) => update({ format: e.target.value })}
                placeholder="Workshops + remote analysis"
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <DollarSign size={14} className="text-qbf-orange" /> Pricing
              </label>
              <input
                type="text"
                value={solution.pricing}
                onChange={(e) => update({ pricing: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> CTA Title
              </label>
              <input
                type="text"
                value={solution.ctaTitle}
                onChange={(e) => update({ ctaTitle: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Status
              </label>
              <select
                value={solution.status}
                onChange={(e) => update({ status: e.target.value })}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
