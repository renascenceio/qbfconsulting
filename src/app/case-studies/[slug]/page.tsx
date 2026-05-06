import Link from "next/link";
import { notFound } from "next/navigation";
import { findBy, readData } from "@/lib/db";
import {
  ArrowLeft, Building2, MapPin, Calendar, Users, Quote,
  TrendingUp, CheckCircle, Briefcase, ArrowUpRight
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const items: any[] = await readData("case-studies");
  return items.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study: any = await findBy("case-studies", "slug", slug);
  if (!study) return { title: "Case Study | QBF Consulting" };
  return {
    title: `${study.title} | QBF Consulting`,
    description: study.excerpt,
  };
}

export const dynamic = "force-dynamic";

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study: any = await findBy("case-studies", "slug", slug);

  if (!study) notFound();

  const allStudies: any[] = await readData("case-studies");
  const related = allStudies
    .filter((s: any) => s.slug !== study.slug && s.status !== "Draft")
    .slice(0, 3);

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/case-studies"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Case Studies
        </Link>

        {/* Hero */}
        <div className="mb-20">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-qbf-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              {study.category}
            </span>
            <span className="bg-qbf-white border border-qbf-divider text-qbf-gray text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              {study.industry}
            </span>
            <span className="bg-qbf-white border border-qbf-divider text-qbf-gray text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              {study.region}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-[1.05] tracking-tight max-w-5xl">
            {study.title}
          </h1>
          <p className="text-2xl md:text-3xl text-qbf-gray leading-relaxed max-w-4xl mb-8">
            {study.excerpt}
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap gap-8 items-center text-sm font-bold uppercase tracking-widest text-qbf-gray border-y border-qbf-divider py-6">
            {study.client && (
              <span className="flex items-center gap-2">
                <Building2 size={16} className="text-qbf-orange" />
                {study.client}
              </span>
            )}
            {study.region && (
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-qbf-orange" />
                {study.region}
              </span>
            )}
            {study.year && (
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-qbf-orange" />
                {study.year}
              </span>
            )}
            {study.duration && (
              <span className="flex items-center gap-2">
                <Briefcase size={16} className="text-qbf-orange" />
                {study.duration}
              </span>
            )}
            {study.teamSize && (
              <span className="flex items-center gap-2">
                <Users size={16} className="text-qbf-orange" />
                {study.teamSize}
              </span>
            )}
          </div>
        </div>

        {/* Metric grid */}
        {study.metrics && study.metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {study.metrics.map((m: any, i: number) => (
              <div
                key={i}
                className={`p-10 rounded-[2.5rem] border ${
                  i === 0
                    ? "bg-qbf-black text-white border-qbf-black"
                    : "bg-white border-qbf-divider"
                }`}
              >
                <TrendingUp
                  size={24}
                  className={i === 0 ? "text-qbf-orange mb-6" : "text-qbf-orange mb-6"}
                />
                <div
                  className={`text-5xl font-black mb-2 ${
                    i === 0 ? "text-qbf-orange" : "text-qbf-black"
                  }`}
                >
                  {m.value}
                </div>
                <div
                  className={`text-xs font-bold uppercase tracking-widest ${
                    i === 0 ? "text-white/70" : "text-qbf-gray"
                  }`}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenge & Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {study.challenge && (
            <div className="bg-white border border-qbf-divider rounded-[2.5rem] p-12">
              <span className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-4 inline-block">
                The Challenge
              </span>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-6 leading-tight">
                What we walked into
              </h2>
              <p className="text-lg text-qbf-gray leading-relaxed">
                {study.challenge}
              </p>
            </div>
          )}
          {study.approach && (
            <div className="bg-white border border-qbf-divider rounded-[2.5rem] p-12">
              <span className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-4 inline-block">
                Our Approach
              </span>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-6 leading-tight">
                How we worked
              </h2>
              <p className="text-lg text-qbf-gray leading-relaxed">
                {study.approach}
              </p>
            </div>
          )}
        </div>

        {/* Testimonial */}
        {study.testimonial && (
          <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] mb-20">
            <Quote size={40} className="text-qbf-orange mb-8" />
            <p className="text-2xl md:text-4xl font-display font-bold text-white leading-tight mb-8 max-w-4xl">
              "{study.testimonial}"
            </p>
            {study.testimonialAuthor && (
              <p className="text-sm font-bold uppercase tracking-widest text-qbf-orange">
                — {study.testimonialAuthor}
              </p>
            )}
          </div>
        )}

        {/* Tags */}
        {study.tags && study.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-20">
            {study.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-bold uppercase tracking-widest text-qbf-gray bg-white border border-qbf-divider px-4 py-2 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-qbf-black mb-12">
              More case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r: any) => (
                <Link
                  key={r.id}
                  href={`/case-studies/${r.slug}`}
                  className="bg-white border border-qbf-divider rounded-[2rem] p-8 hover:shadow-xl hover:border-qbf-orange/40 transition-all group"
                >
                  <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-6">
                    {r.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-qbf-black mb-3 leading-tight group-hover:text-qbf-orange transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-qbf-gray mb-6 leading-relaxed">
                    {r.excerpt}
                  </p>
                  <span className="text-qbf-orange font-bold text-xs flex items-center gap-2">
                    Read case study <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6 leading-tight">
            Ready to write your case study?
          </h2>
          <p className="text-xl text-qbf-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us where you are on the journey and we'll show you what good looks like for your sector.
          </p>
          <Link
            href="/contact"
            className="bg-qbf-orange text-white px-12 py-6 rounded-full text-2xl font-black hover:scale-105 transition-all shadow-xl shadow-qbf-orange/20 inline-flex items-center gap-3"
          >
            Get in Touch <CheckCircle size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
