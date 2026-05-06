import Link from "next/link";
import { notFound } from "next/navigation";
import { findBy, readData } from "@/lib/db";
import {
  ArrowLeft, CheckCircle, Stethoscope, Cpu, Settings, Users,
  Sparkles, BookOpen, Target, Clock, Layout, Tag, Layers
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

export async function generateStaticParams() {
  const solutions: any[] = readData("solutions");
  return solutions.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution: any = findBy("solutions", "slug", slug);
  if (!solution) return { title: "Solution | QBF Consulting" };
  return {
    title: `${solution.title} | QBF Consulting`,
    description: solution.tagline || solution.valueProp,
  };
}

export const dynamic = "force-dynamic";

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution: any = findBy("solutions", "slug", slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/solutions"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Solutions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-qbf-orange-muted rounded-2xl flex items-center justify-center text-qbf-orange border border-qbf-orange/20">
                {iconMap[solution.icon] || <Layers size={28} />}
              </div>
              <span className="bg-qbf-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                {solution.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-[1.05] tracking-tight">
              {solution.title}
            </h1>
            <p className="text-2xl md:text-3xl text-qbf-gray leading-relaxed mb-8">
              {solution.tagline}
            </p>
            <p className="text-lg text-qbf-gray leading-relaxed">
              {solution.valueProp}
            </p>
          </div>

          <div className="bg-white border border-qbf-divider rounded-[2.5rem] p-8 h-fit lg:sticky lg:top-28">
            <h3 className="text-xs font-bold uppercase tracking-widest text-qbf-gray mb-6">
              At a glance
            </h3>
            <div className="space-y-6">
              {solution.duration && (
                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-qbf-orange mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">Duration</p>
                    <p className="font-bold text-qbf-black">{solution.duration}</p>
                  </div>
                </div>
              )}
              {solution.format && (
                <div className="flex items-start gap-4">
                  <Layout size={18} className="text-qbf-orange mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">Format</p>
                    <p className="font-bold text-qbf-black">{solution.format}</p>
                  </div>
                </div>
              )}
              {solution.pricing && (
                <div className="flex items-start gap-4">
                  <Tag size={18} className="text-qbf-orange mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">Pricing</p>
                    <p className="font-bold text-qbf-black">{solution.pricing}</p>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/contact"
              className="bg-qbf-orange text-white px-6 py-4 rounded-full text-sm font-bold hover:opacity-90 transition-all mt-8 w-full text-center inline-block"
            >
              Enquire about this solution
            </Link>
          </div>
        </div>

        {solution.covers && solution.covers.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-black text-qbf-black mb-12">
              What this solution covers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solution.covers.map((cover: any, i: number) => (
                <div key={i} className="p-8 bg-white border border-qbf-divider rounded-[2rem]">
                  <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center mb-6 text-qbf-orange">
                    <Target size={20} />
                  </div>
                  <h4 className="text-xl font-display font-bold text-qbf-black mb-3">
                    {cover.title}
                  </h4>
                  <p className="text-qbf-gray leading-relaxed">
                    {cover.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {solution.deliverables && solution.deliverables.length > 0 && (
          <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-12 leading-tight">
              Deliverables
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solution.deliverables.map((item: string, i: number) => (
                <li key={i} className="flex gap-4 items-center font-bold text-lg">
                  <div className="w-8 h-8 bg-qbf-orange rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-12">
            {solution.ctaTitle || "Ready to get started?"}
          </h2>
          <Link
            href="/contact"
            className="bg-qbf-orange text-white px-12 py-6 rounded-full text-2xl font-black hover:scale-105 transition-all shadow-xl shadow-qbf-orange/20 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
