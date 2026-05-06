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

export default async function AdminPagesList() {
  const pages = await readData<PageContent>("pages");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-3">Content</p>
          <h2 className="text-4xl font-display font-black mb-2">Pages</h2>
          <p className="text-qbf-gray font-medium max-w-2xl">
            Edit the headline, subheading, intro, and SEO metadata for every public page on the site.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-qbf-divider overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-qbf-divider bg-qbf-white">
              <th className="text-left p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">Page</th>
              <th className="text-left p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">Path</th>
              <th className="text-left p-6 text-xs font-bold uppercase tracking-widest text-qbf-gray">Headline</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.slug} className="border-b border-qbf-divider last:border-0 hover:bg-qbf-white/60 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-qbf-black">{p.name}</p>
                  <p className="text-xs font-mono text-qbf-gray">{p.slug}</p>
                </td>
                <td className="p-6">
                  <Link
                    href={p.path}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-medium text-qbf-gray hover:text-qbf-orange transition-colors"
                  >
                    {p.path}
                    <ExternalLink size={14} />
                  </Link>
                </td>
                <td className="p-6 max-w-md">
                  <p className="text-sm text-qbf-black truncate">{p.heroTitle}</p>
                </td>
                <td className="p-6 text-right">
                  <Link
                    href={`/admin/content/pages/${p.slug}`}
                    className="inline-flex items-center gap-2 bg-qbf-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-qbf-orange transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
