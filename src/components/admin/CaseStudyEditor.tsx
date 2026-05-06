"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save, ArrowLeft, Type, Layout, Tag, Hash, Building2, MapPin,
  Calendar, Briefcase, Plus, Trash2, Quote, TrendingUp, Users
} from "lucide-react";

const CATEGORY_OPTIONS = ["Strategy", "Implementation", "Management", "Tech", "Education"];

type Metric = { label: string; value: string };

export default function CaseStudyEditor({
  initial,
  mode,
}: {
  initial?: any;
  mode: "new" | "edit";
}) {
  const [study, setStudy] = useState<any>(
    initial || {
      slug: "",
      title: "",
      client: "",
      industry: "",
      region: "",
      category: "Strategy",
      year: new Date().getFullYear().toString(),
      duration: "",
      teamSize: "",
      excerpt: "",
      challenge: "",
      approach: "",
      metrics: [] as Metric[],
      headlineMetric: "",
      headlineMetricLabel: "",
      testimonial: "",
      testimonialAuthor: "",
      tags: [] as string[],
      status: "Published",
    }
  );
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(", "));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const update = (patch: any) => setStudy((s: any) => ({ ...s, ...patch }));

  const updateMetric = (i: number, patch: Partial<Metric>) => {
    const metrics = [...(study.metrics || [])];
    metrics[i] = { ...metrics[i], ...patch };
    update({ metrics });
  };
  const addMetric = () =>
    update({ metrics: [...(study.metrics || []), { label: "", value: "" }] });
  const removeMetric = (i: number) =>
    update({ metrics: study.metrics.filter((_: any, idx: number) => idx !== i) });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      ...study,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (mode === "new") {
        await fetch("/api/case-studies", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch(`/api/case-studies/${initial.slug}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
      }
      router.push("/admin/content/case-studies");
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
          <Link
            href="/admin/content/case-studies"
            className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-4xl font-display font-black">
            {mode === "new" ? "New Case Study" : "Edit Case Study"}
          </h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 disabled:opacity-50"
        >
          <Save size={24} /> {isLoading ? "Saving..." : "Save Case Study"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Core */}
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Title
              </label>
              <input
                type="text"
                value={study.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="Project Redwood"
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-2xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                  <Hash size={14} className="text-qbf-orange" /> Slug
                </label>
                <input
                  type="text"
                  value={study.slug}
                  onChange={(e) => update({ slug: e.target.value })}
                  placeholder="project-redwood"
                  className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-mono text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                  <Building2 size={14} className="text-qbf-orange" /> Client
                </label>
                <input
                  type="text"
                  value={study.client}
                  onChange={(e) => update({ client: e.target.value })}
                  placeholder="Fortune 500 Global Retailer"
                  className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Excerpt (card summary)
              </label>
              <textarea
                value={study.excerpt}
                onChange={(e) => update({ excerpt: e.target.value })}
                rows={3}
                placeholder="A short, enticing one-paragraph summary..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> The Challenge
              </label>
              <textarea
                value={study.challenge}
                onChange={(e) => update({ challenge: e.target.value })}
                rows={4}
                placeholder="What we walked into..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Our Approach
              </label>
              <textarea
                value={study.approach}
                onChange={(e) => update({ approach: e.target.value })}
                rows={5}
                placeholder="How we worked..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-display font-black flex items-center gap-3">
                <TrendingUp size={20} className="text-qbf-orange" /> Metrics
              </h3>
              <button
                type="button"
                onClick={addMetric}
                className="bg-qbf-black text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90"
              >
                <Plus size={16} /> Add metric
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  Headline Metric Value
                </label>
                <input
                  type="text"
                  value={study.headlineMetric}
                  onChange={(e) => update({ headlineMetric: e.target.value })}
                  placeholder="+42%"
                  className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  Headline Metric Label
                </label>
                <input
                  type="text"
                  value={study.headlineMetricLabel}
                  onChange={(e) => update({ headlineMetricLabel: e.target.value })}
                  placeholder="Redemption Rate"
                  className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
            </div>

            {(study.metrics || []).map((m: Metric, i: number) => (
              <div key={i} className="bg-qbf-white border border-qbf-divider rounded-[1.5rem] p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">
                    Metric {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMetric(i)}
                    className="text-qbf-gray hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => updateMetric(i, { value: e.target.value })}
                    placeholder="+42%"
                    className="bg-white border border-qbf-divider px-4 py-2.5 rounded-lg text-sm font-bold focus:outline-none focus:border-qbf-orange"
                  />
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => updateMetric(i, { label: e.target.value })}
                    placeholder="Redemption Rate"
                    className="bg-white border border-qbf-divider px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-qbf-orange"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-6">
            <h3 className="text-xl font-display font-black flex items-center gap-3">
              <Quote size={20} className="text-qbf-orange" /> Testimonial
            </h3>
            <textarea
              value={study.testimonial}
              onChange={(e) => update({ testimonial: e.target.value })}
              rows={4}
              placeholder="Client testimonial quote..."
              className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange resize-none leading-relaxed"
            />
            <input
              type="text"
              value={study.testimonialAuthor}
              onChange={(e) => update({ testimonialAuthor: e.target.value })}
              placeholder="VP Customer, Fortune 500 Retailer"
              className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl text-sm font-bold focus:outline-none focus:border-qbf-orange"
            />
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-10 shadow-2xl shadow-black/5 space-y-6">
            <h3 className="text-xl font-display font-black">Configuration</h3>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Service Line
              </label>
              <select
                value={study.category}
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
                <Briefcase size={14} className="text-qbf-orange" /> Industry
              </label>
              <input
                type="text"
                value={study.industry}
                onChange={(e) => update({ industry: e.target.value })}
                placeholder="Retail"
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <MapPin size={14} className="text-qbf-orange" /> Region
              </label>
              <input
                type="text"
                value={study.region}
                onChange={(e) => update({ region: e.target.value })}
                placeholder="GCC, EU, North America..."
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                  <Calendar size={14} className="text-qbf-orange" /> Year
                </label>
                <input
                  type="text"
                  value={study.year}
                  onChange={(e) => update({ year: e.target.value })}
                  className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg font-bold text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                  <Briefcase size={14} className="text-qbf-orange" /> Duration
                </label>
                <input
                  type="text"
                  value={study.duration}
                  onChange={(e) => update({ duration: e.target.value })}
                  placeholder="9 months"
                  className="w-full bg-qbf-white border border-qbf-divider px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-qbf-orange"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Users size={14} className="text-qbf-orange" /> Team Size
              </label>
              <input
                type="text"
                value={study.teamSize}
                onChange={(e) => update({ teamSize: e.target.value })}
                placeholder="6 consultants"
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Coalition, Multi-market"
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Status
              </label>
              <select
                value={study.status}
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
