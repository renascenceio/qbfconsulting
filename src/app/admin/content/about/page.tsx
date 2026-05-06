import Link from "next/link";
import { readData } from "@/lib/db";
import { ExternalLink, Pencil } from "lucide-react";

type PageContent = {
  slug: string;
  name: string;
  path: string;
  heroTitle: string;
  heroSubtitle: string;
};

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const pages = (await readData<PageContent>("pages")).filter((p) =>
    p.slug === "about" || p.slug === "about-company" || p.slug === "about-founder"
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-3">Content</p>
          <h2 className="text-4xl font-display font-black mb-2">About</h2>
          <p className="text-qbf-gray font-medium max-w-2xl">
            Edit the headline, subheading, intro, and SEO metadata for the About overview, company, and founder pages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pages.map((p) => (
          <div
            key={p.slug}
            className="bg-white p-8 rounded-[2.5rem] border border-qbf-divider hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-3">{p.name}</p>
            <p className="font-mono text-xs text-qbf-gray mb-6">{p.path}</p>
            <p className="text-lg font-display font-bold text-qbf-black mb-3 leading-tight">{p.heroTitle}</p>
            <p className="text-sm text-qbf-gray leading-relaxed mb-8 flex-grow">{p.heroSubtitle}</p>
            <div className="flex gap-3 mt-auto">
              <Link
                href={`/admin/content/pages/${p.slug}`}
                className="inline-flex items-center gap-2 bg-qbf-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-qbf-orange transition-colors"
              >
                <Pencil size={14} /> Edit
              </Link>
              <Link
                href={p.path}
                target="_blank"
                className="inline-flex items-center gap-2 border border-qbf-divider px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-qbf-gray hover:border-qbf-black hover:text-qbf-black transition-colors"
              >
                View <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
