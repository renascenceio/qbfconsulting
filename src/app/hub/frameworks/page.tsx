import Link from "next/link";
import { Lock, FileText, Layout, Search, Download } from "lucide-react";

export default function HubFrameworksPage() {
  const frameworks = [
    {
      title: "Loyalty Roadmap Template",
      topic: "Strategy",
      year: "2024",
      downloads: "850+",
      slug: "loyalty-roadmap-template",
    },
    {
      title: "Psychology Mapping Tool",
      topic: "Behavioral Science",
      year: "2024",
      downloads: "520+",
      slug: "psychology-mapping-tool",
    },
    {
      title: "Vendor Selection Matrix",
      topic: "Technology",
      year: "2023",
      downloads: "1.1k",
      slug: "vendor-selection-matrix",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <Link
              href="/hub"
              className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-8 hover:-translate-x-2 transition-transform"
            >
              Back to Hub
            </Link>
            <h1 className="text-5xl md:text-8xl font-display font-black text-qbf-black mb-8 leading-tight tracking-tight">
              Frameworks.
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Actionable templates and frameworks to implement your loyalty
              strategy.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search frameworks..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworks.map((framework, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col h-full cursor-pointer relative overflow-hidden"
            >
              <div className="aspect-[4/5] bg-qbf-divider rounded-2xl mb-8 relative overflow-hidden flex items-center justify-center border border-qbf-divider">
                <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors"></div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30 text-white/40">
                  <Layout size={32} />
                </div>
                {/* Lock Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-qbf-orange text-white rounded-full flex items-center justify-center shadow-xl shadow-qbf-orange/20">
                    <Lock size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-qbf-black/30">Free Registration Required</span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-6">
                <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  {framework.topic}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  {framework.year}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors">
                {framework.title}
              </h3>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  <Download size={14} className="text-qbf-orange" />
                  <span>{framework.downloads} Downloads</span>
                </div>
                <Link
                  href={`/hub/frameworks/${framework.slug}`}
                  className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  View Details <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
