"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export type PageContent = {
  slug: string;
  name: string;
  path: string;
  heroTitle: string;
  heroSubtitle: string;
  intro?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export function PageEditor({ initial }: { initial: PageContent }) {
  const router = useRouter();
  const [page, setPage] = useState<PageContent>(initial);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  function update<K extends keyof PageContent>(key: K, value: PageContent[K]) {
    setPage((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/pages/${page.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });
    setSaving(false);
    if (res.ok) {
      setSavedAt(new Date());
      router.refresh();
    } else {
      alert("Failed to save page.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end gap-6">
        <div>
          <Link
            href="/admin/content/pages"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-qbf-gray hover:text-qbf-orange mb-3"
          >
            <ArrowLeft size={14} /> All Pages
          </Link>
          <h2 className="text-4xl font-display font-black mb-2">{page.name}</h2>
          <p className="text-qbf-gray font-mono text-sm">{page.path}</p>
        </div>
        <div className="flex items-center gap-4">
          {savedAt && (
            <span className="text-xs text-qbf-gray font-medium">
              Saved {savedAt.toLocaleTimeString()}
            </span>
          )}
          <Link
            href={page.path}
            target="_blank"
            className="border border-qbf-divider px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:border-qbf-black transition-colors"
          >
            View Live
          </Link>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-qbf-orange text-white px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider">
            <h3 className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-6">Hero</h3>
            <div className="space-y-6">
              <Field label="Headline">
                <textarea
                  value={page.heroTitle}
                  onChange={(e) => update("heroTitle", e.target.value)}
                  rows={2}
                  className="input-base"
                />
              </Field>
              <Field label="Subheadline">
                <textarea
                  value={page.heroSubtitle}
                  onChange={(e) => update("heroSubtitle", e.target.value)}
                  rows={3}
                  className="input-base"
                />
              </Field>
              <Field label="Intro paragraph (optional)">
                <textarea
                  value={page.intro || ""}
                  onChange={(e) => update("intro", e.target.value)}
                  rows={4}
                  className="input-base"
                />
              </Field>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider">
            <h3 className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-6">SEO</h3>
            <div className="space-y-6">
              <Field label="SEO Title">
                <input
                  value={page.seoTitle || ""}
                  onChange={(e) => update("seoTitle", e.target.value)}
                  className="input-base"
                />
              </Field>
              <Field label="SEO Description">
                <textarea
                  value={page.seoDescription || ""}
                  onChange={(e) => update("seoDescription", e.target.value)}
                  rows={3}
                  className="input-base"
                />
              </Field>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-qbf-black text-white p-8 rounded-[2.5rem]">
            <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-4">Preview</p>
            <h4 className="text-2xl font-display font-black mb-3 leading-tight">{page.heroTitle}</h4>
            <p className="text-sm text-white/70 leading-relaxed">{page.heroSubtitle}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-qbf-divider text-sm text-qbf-gray space-y-3">
            <p><span className="font-bold text-qbf-black">Slug:</span> <span className="font-mono">{page.slug}</span></p>
            <p><span className="font-bold text-qbf-black">Path:</span> <span className="font-mono">{page.path}</span></p>
            <p className="text-xs text-qbf-gray/80 leading-relaxed">
              Hero copy and SEO metadata are pulled from this entry on every public page render.
            </p>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .input-base {
          width: 100%;
          background: var(--qbf-white, #fafaf9);
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #111;
          outline: none;
          transition: border-color 0.15s;
        }
        .input-base:focus {
          border-color: #f15a29;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-qbf-gray mb-2">{label}</span>
      {children}
    </label>
  );
}
