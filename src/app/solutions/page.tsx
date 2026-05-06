import Link from "next/link";
import { readData, findBy } from "@/lib/db";
import {
  Stethoscope, Cpu, Settings, Users, Sparkles, BookOpen,
  ArrowUpRight, CheckCircle, Layers
} from "lucide-react";
import type { Metadata } from "next";

const iconMap: Record<string, React.ReactNode> = {
  stethoscope: <Stethoscope size={28} />,
  cpu: <Cpu size={28} />,
  settings: <Settings size={28} />,
  users: <Users size={28} />,
  sparkles: <Sparkles size={28} />,
  book: <BookOpen size={28} />,
};

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "solutions");
  return {
    title: page?.seoTitle || "Loyalty Solutions | QBF Consulting",
    description: page?.seoDescription || "Productised loyalty solutions from QBF Consulting.",
  };
}

export default async function SolutionsPage() {
  const page: any = (await findBy("pages", "slug", "solutions")) || {};
  const solutions: any[] = (await readData<any>("solutions"))
    .filter((s: any) => s.status !== "Draft")
    .sort((a: any, b: any) => (a.order || 99) - (b.order || 99));

  const categories = Array.from(new Set(solutions.map((s: any) => s.category)));

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-6 inline-block">
            Loyalty Management Solutions
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight tracking-tight">
            {page.heroTitle || "Loyalty Solutions."}
          </h1>
          <p className="text-2xl text-qbf-gray leading-relaxed max-w-3xl">
            {page.heroSubtitle ||
              "Packaged engagements that solve specific loyalty challenges, with clear scope, deliverables, and timelines."}
          </p>
          {page.intro && (
            <p className="text-lg text-qbf-gray leading-relaxed mt-8 max-w-3xl">
              {page.intro}
            </p>
          )}
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-bold uppercase tracking-widest text-qbf-gray bg-white border border-qbf-divider px-4 py-2 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {solutions.map((solution: any) => (
            <Link
              key={solution.id}
              href={`/solutions/${solution.slug}`}
              className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 hover:border-qbf-orange/40 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-qbf-orange-muted rounded-2xl flex items-center justify-center text-qbf-orange border border-qbf-orange/20">
                  {iconMap[solution.icon] || <Layers size={28} />}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray bg-qbf-white border border-qbf-divider px-3 py-1.5 rounded-full">
                  {solution.category}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors">
                {solution.title}
              </h3>
              <p className="text-qbf-gray mb-6 leading-relaxed text-base">
                {solution.tagline}
              </p>

              <div className="space-y-3 mb-8 pb-8 border-b border-qbf-divider">
                {solution.duration && (
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-qbf-gray">Duration</span>
                    <span className="text-qbf-black">{solution.duration}</span>
                  </div>
                )}
                {solution.format && (
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-qbf-gray">Format</span>
                    <span className="text-qbf-black text-right max-w-[60%]">{solution.format}</span>
                  </div>
                )}
              </div>

              <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                Explore Solution <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-4 leading-tight">
              Need something custom?
            </h2>
            <p className="text-white/70 leading-relaxed">
              Every engagement we run starts with a conversation. Tell us where you are on the journey and we will scope what fits.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl shadow-qbf-orange/20 inline-flex items-center gap-3 shrink-0"
          >
            Talk to us <CheckCircle size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
