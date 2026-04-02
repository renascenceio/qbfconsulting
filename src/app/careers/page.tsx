import Link from "next/link";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";

export default function CareersCategoryPage() {
  const jobs = [
    {
      title: "Loyalty Strategist",
      location: "London / Remote",
      type: "Full-time",
      date: "May 20, 2024",
      department: "Strategy",
      slug: "loyalty-strategist",
    },
    {
      title: "Technical Implementation Lead",
      location: "Remote",
      type: "Full-time",
      date: "April 15, 2024",
      department: "Technology",
      slug: "technical-implementation-lead",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
              Join the <br />
              <span className="text-qbf-orange">Mission.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              We're looking for passionate loyalty practitioners to join our
              growing team and build the future of customer engagement.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search roles..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
          {[
            "All",
            "Strategy",
            "Technology",
            "Operations",
            "Design"
          ].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-bold text-sm hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {jobs.map((job, index) => (
            <Link
              key={index}
              href={`/careers/${job.slug}`}
              className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col h-full"
            >
              <div className="mb-10">
                <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  {job.department}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-10 leading-tight group-hover:text-qbf-orange transition-colors">
                {job.title}
              </h3>
              <div className="space-y-4 mb-10 mt-auto">
                <div className="flex items-center gap-3 text-qbf-gray text-sm font-bold uppercase tracking-widest">
                  <MapPin size={16} className="text-qbf-orange" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-qbf-gray text-sm font-bold uppercase tracking-widest">
                  <Briefcase size={16} className="text-qbf-orange" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-3 text-qbf-gray text-sm font-bold uppercase tracking-widest">
                  <Clock size={16} className="text-qbf-orange" />
                  <span>{job.date}</span>
                </div>
              </div>
              <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Apply Now <span>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight">
            No open roles that <br /> fit your profile?
          </h2>
          <p className="text-xl text-qbf-gray mb-12 max-w-2xl mx-auto leading-relaxed">
            We're always on the lookout for talented practitioners. Submit
            your CV speculatively and we'll keep you in mind for future
            opportunities.
          </p>
          <Link
            href="/contact?type=career"
            className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-opacity inline-block shadow-xl shadow-qbf-orange/20"
          >
            Submit Speculatively
          </Link>
        </div>
      </div>
    </div>
  );
}
