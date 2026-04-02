import Link from "next/link";
import { ArrowLeft, Search, CheckCircle, Target, Users, Zap, Briefcase } from "lucide-react";

export default function CaseStudiesCategoryPage() {
  const caseStudies = [
    {
      title: "Project Redwood",
      category: "Strategy",
      excerpt: "Developing a global loyalty roadmap for a Fortune 500 retailer.",
      outcome: "42% Redemption Rate",
      slug: "project-redwood",
    },
    {
      title: "The Atlas Program",
      category: "Implementation",
      excerpt: "Launching a tech-first airline loyalty program from scratch.",
      outcome: "12% Active Share",
      slug: "atlas-program",
    },
    {
      title: "Echo One",
      category: "Management",
      excerpt: "Ongoing optimization and performance management for Echo One.",
      outcome: "2.4x Engagement",
      slug: "echo-one",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
              Case <br />
              <span className="text-qbf-orange">Studies.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Real-world examples of how we've helped global brands build
              measurable business value through loyalty strategy.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search case studies..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
          {[
            "All",
            "Tech",
            "Strategy",
            "Education",
            "Trends"
          ].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-bold text-sm hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Case Study */}
        <div className="mb-20">
          <div className="group relative aspect-[21/9] bg-qbf-black rounded-[3rem] overflow-hidden border border-white/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-qbf-black via-qbf-black/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12">
              <span className="bg-qbf-orange text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 inline-block">
                Featured Case Study
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight max-w-3xl">
                Global Loyalty Roadmap for a Fortune 500 Retailer
              </h2>
              <div className="flex gap-8 text-white/70 text-sm font-bold uppercase tracking-widest items-center">
                <span className="text-3xl font-black text-qbf-orange">42%</span>
                <span>Redemption Rate Increase</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {caseStudies.map((study, index) => (
            <Link
              key={index}
              href={`/case-studies/${study.slug}`}
              className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  {study.category}
                </span>
                <span className="text-2xl font-black text-qbf-black">
                  {study.outcome.split(" ")[0]}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors">
                {study.title}
              </h3>
              <p className="text-xl text-qbf-gray mb-10 leading-relaxed flex-grow">
                {study.excerpt}
              </p>
              <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                Read Case Study <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
