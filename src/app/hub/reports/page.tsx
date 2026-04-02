import Link from "next/link";
import { Lock, FileText, Layout, Search, Download } from "lucide-react";

export default function HubReportsPage() {
  const reports = [
    {
      title: "State of Loyalty 2024",
      topic: "Industry Trends",
      year: "2024",
      downloads: "420+",
      slug: "state-of-loyalty-2024",
    },
    {
      title: "Loyalty Psychology Report",
      topic: "Behavioral Science",
      year: "2024",
      downloads: "280+",
      slug: "loyalty-psychology-report",
    },
    {
      title: "Tech Selection Framework",
      topic: "Technology",
      year: "2023",
      downloads: "650+",
      slug: "tech-selection-framework",
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
              Reports.
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              In-depth analysis and state-of-the-industry reports.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
          {[
            "All",
            "2024",
            "2023",
            "Strategy",
            "Technology",
            "Behavioral Science"
          ].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-bold text-sm hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col h-full cursor-pointer relative overflow-hidden"
            >
              <div className="aspect-[4/5] bg-qbf-divider rounded-2xl mb-8 relative overflow-hidden flex items-center justify-center border border-qbf-divider">
                <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors"></div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30 text-white/40">
                  <FileText size={32} />
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
                  {report.topic}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  {report.year}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors">
                {report.title}
              </h3>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-qbf-gray">
                  <Download size={14} className="text-qbf-orange" />
                  <span>{report.downloads} Downloads</span>
                </div>
                <Link
                  href={`/hub/reports/${report.slug}`}
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
