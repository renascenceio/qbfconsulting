import Link from "next/link";
import type { Metadata } from "next";
import {
  Building2,
  User,
  ArrowUpRight,
  Target,
  TrendingUp,
  Globe2,
  Award,
  Quote,
} from "lucide-react";
import { findBy } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "about");
  return {
    title: page?.seoTitle || "About | QBF Consulting",
    description:
      page?.seoDescription ||
      "QBF Consulting is a loyalty consulting practice built for boards, P&Ls, and operators.",
  };
}

export default async function AboutIndexPage() {
  const page: any = (await findBy("pages", "slug", "about")) || {};

  const stats = [
    { label: "Years in market", value: "20+" },
    { label: "Global brands served", value: "50+" },
    { label: "Markets covered", value: "15+" },
    { label: "Practitioners certified", value: "1,200+" },
  ];

  const principles = [
    {
      icon: <Target className="text-qbf-orange" size={22} />,
      title: "Defended on the P&L",
      description:
        "Every program we ship has a CFO-grade business case. Loyalty earns its place on the P&L or it doesn't ship.",
    },
    {
      icon: <TrendingUp className="text-qbf-orange" size={22} />,
      title: "Measured, not marketed",
      description:
        "We instrument programs from day one. Member economics, incremental margin, redemption health — measured every quarter.",
    },
    {
      icon: <Globe2 className="text-qbf-orange" size={22} />,
      title: "Global, with local depth",
      description:
        "Practitioners on the ground in the GCC, Europe, North America, and APAC. Regional nuance is not optional.",
    },
    {
      icon: <Award className="text-qbf-orange" size={22} />,
      title: "Practitioner-led",
      description:
        "Our consultants have run programs, not just advised on them. Operators talk to operators.",
    },
  ];

  const sections = [
    {
      icon: <Building2 className="text-qbf-orange" size={28} />,
      eyebrow: "The Company",
      title: "Who we are.",
      description:
        "Two decades of practitioner experience, built into a consulting practice for the operators behind the world's most demanding loyalty programs.",
      href: "/about/company",
      cta: "Read the company story",
    },
    {
      icon: <User className="text-qbf-orange" size={28} />,
      eyebrow: "The Founder",
      title: "Aslan Patov.",
      description:
        "Founder, board advisor, and a CLMP-certified practitioner. Two decades shipping loyalty programs that boards still defend.",
      href: "/about/founder",
      cta: "Meet the founder",
    },
  ];

  return (
    <div className="bg-qbf-white min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 border-b border-qbf-divider">
        <div className="max-content">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-6 inline-block">
              About QBF
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-[1.05] tracking-tight text-balance">
              {page.heroTitle || "About QBF Consulting."}
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-3xl text-pretty">
              {page.heroSubtitle ||
                "We are a loyalty consulting practice built for boards, P&Ls, and the practitioners who have to make programs work in the real world."}
            </p>
            {page.intro && (
              <p className="mt-6 text-lg text-qbf-gray leading-relaxed max-w-3xl">
                {page.intro}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-16 border-b border-qbf-divider">
        <div className="max-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-display font-black text-qbf-black leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two cards: Company / Founder */}
      <section className="section-padding">
        <div className="max-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="bg-white p-12 rounded-[3rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 hover:border-qbf-orange/40 transition-all group flex flex-col"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 bg-qbf-orange-muted rounded-2xl flex items-center justify-center border border-qbf-orange/20">
                    {s.icon}
                  </div>
                  <div className="w-12 h-12 bg-qbf-white border border-qbf-divider rounded-full flex items-center justify-center text-qbf-gray group-hover:bg-qbf-orange group-hover:text-white group-hover:border-qbf-orange group-hover:rotate-45 transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-4">
                  {s.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-qbf-black mb-5 leading-tight group-hover:text-qbf-orange transition-colors">
                  {s.title}
                </h2>
                <p className="text-lg text-qbf-gray leading-relaxed mb-10">
                  {s.description}
                </p>
                <span className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                  {s.cta} <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-white border-y border-qbf-divider">
        <div className="max-content">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange mb-4">
              How we work
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6 leading-tight">
              Four principles, every engagement.
            </h2>
            <p className="text-xl text-qbf-gray leading-relaxed">
              We hold ourselves to the same operating standard our clients hold their programs to.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="bg-qbf-white p-8 rounded-[2rem] border border-qbf-divider flex gap-6"
              >
                <div className="w-12 h-12 bg-white border border-qbf-divider rounded-xl flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-qbf-black mb-2">
                    {p.title}
                  </h3>
                  <p className="text-qbf-gray leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding">
        <div className="max-content max-w-4xl">
          <Quote className="text-qbf-orange mb-6" size={36} />
          <blockquote className="text-3xl md:text-4xl font-display font-bold text-qbf-black leading-tight mb-8 text-balance">
            Loyalty is a P&L line, not a marketing line. We were built to make
            sure it earns its place there.
          </blockquote>
          <p className="text-sm font-bold uppercase tracking-widest text-qbf-gray">
            — The QBF Team
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="max-content">
          <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-display font-black mb-4 leading-tight">
                Want to work with us?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Tell us where you are on the journey. We will route you to the right person on the team.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl shadow-qbf-orange/20 inline-flex items-center gap-3 shrink-0"
            >
              Get in touch <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
