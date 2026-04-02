import Link from "next/link";
import { ArrowLeft, Search, Calendar, MapPin, Play } from "lucide-react";

export default function CoverageCategoryPage() {
  const coverage = [
    {
      title: "Loyalty Expo 2024 Recap",
      category: "Conference",
      date: "Sep 15, 2024",
      excerpt: "The key takeaways and trends from this year's Loyalty Expo in San Francisco.",
      slug: "loyalty-expo-2024-recap",
    },
    {
      title: "The Psychology of Engagement Workshop",
      category: "Workshop",
      date: "Feb 20, 2024",
      excerpt: "Highlights from our intensive workshop on the emotional drivers of customer loyalty.",
      slug: "psychology-of-engagement-workshop-recap",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
              Event <br />
              <span className="text-qbf-orange">Coverage.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Recaps, highlights, and photo galleries from the events and
              workshops we attend and host.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search coverage..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
          {[
            "All",
            "Conference",
            "Workshop",
            "Internal",
            "Other"
          ].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-bold text-sm hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {coverage.map((item, index) => (
            <Link
              key={index}
              href={`/coverage/${item.slug}`}
              className="group flex flex-col h-full bg-white border border-qbf-divider rounded-[3rem] overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all"
            >
              <div className="aspect-video bg-qbf-divider relative overflow-hidden">
                <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-all">
                    <Play size={24} />
                  </div>
                </div>
              </div>
              <div className="p-12">
                <div className="flex justify-between items-center mb-8">
                  <span className="bg-qbf-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-3xl font-display font-black text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors">
                  {item.title}
                </h3>
                <p className="text-xl text-qbf-gray mb-10 leading-relaxed flex-grow">
                  {item.excerpt}
                </p>
                <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                  View Recap <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
