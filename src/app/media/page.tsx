import type { Metadata } from "next";
import Link from "next/link";
import { findBy } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "media");
  return {
    title: page?.seoTitle || "Media & Press | QBF Consulting",
    description:
      page?.seoDescription ||
      "Press, interviews, and contributed articles from QBF Consulting.",
  };
}

export default async function MediaCategoryPage() {
  const page: any = (await findBy("pages", "slug", "media")) || {};
  const heroTitle = page.heroTitle || "Media Coverage.";
  const heroSubtitle =
    page.heroSubtitle ||
    "Latest press, interviews, and contributed articles from QBF Consulting.";

  const mediaItems = [
    {
      publication: "Forbes",
      headline: "How QBF Consulting is Changing the Loyalty Game",
      date: "May 20, 2024",
      type: "Press",
      slug: "forbes-feature",
    },
    {
      publication: "TechCrunch",
      headline: "The Future of Customer Engagement in the AI Era",
      date: "April 15, 2024",
      type: "Interview",
      slug: "techcrunch-interview",
    },
    {
      publication: "Wired",
      headline: "The Psychology of Points: Why We Can't Stop Earning",
      date: "March 10, 2024",
      type: "Article",
      slug: "wired-article",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight text-balance">
            {heroTitle}
          </h1>
          <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl text-pretty">
            {heroSubtitle}
          </p>
          {page.intro ? (
            <p className="mt-6 text-base md:text-lg text-qbf-gray/90 leading-relaxed max-w-2xl">
              {page.intro}
            </p>
          ) : null}
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {["All", "Press", "Interview", "Article"].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full border border-qbf-divider font-bold text-sm hover:border-qbf-orange hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-qbf-divider hover:shadow-xl hover:shadow-black/5 transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 bg-qbf-divider rounded-xl mb-6 flex items-center justify-center font-black text-[10px] text-qbf-gray/40">
                LOGO
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-3">
                {item.publication} • {item.date}
              </p>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors">
                {item.headline}
              </h3>
              <Link
                href={`/media/${item.slug}`}
                className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Read Article <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
