"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function CareersCategoryPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

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

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {jobs.map((job, index) => (
              <Link
                key={index}
                href={`/careers/${job.slug || job.id}`}
                className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col h-full"
              >
                <div className="mb-10">
                  <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    {job.department}
                  </span>
                </div>
                <h2 className="text-2xl font-display font-bold text-qbf-black mb-10 leading-tight group-hover:text-qbf-orange transition-colors">
                  {job.title}
                </h2>
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
                    <span>{job.date || 'Recently Posted'}</span>
                  </div>
                </div>
                <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                  Apply Now <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-20 text-center mb-32">
            <h2 className="text-2xl font-display font-black text-qbf-black mb-4">
              {isLoading ? "Checking for opportunities..." : "No open roles currently"}
            </h2>
            <p className="text-qbf-gray mb-0">Check back later or submit speculatively below.</p>
          </div>
        )}

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
            className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-all inline-block shadow-xl shadow-qbf-orange/20"
          >
            Submit Speculatively
          </Link>
        </div>
      </div>
    </div>
  );
}
