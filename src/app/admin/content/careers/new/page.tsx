"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, MapPin, Briefcase, Tag, Clock, Type, Layout } from "lucide-react";
import Link from "next/link";

export default function NewJobPage() {
  const [job, setJob] = useState({
    title: "",
    slug: "",
    department: "Strategy",
    location: "Remote",
    type: "Full-time",
    description: "",
    status: "Active",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: JSON.stringify(job),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/content/careers");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-6">
          <Link href="/admin/content/careers" className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-4xl font-display font-black">New Job Listing</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 disabled:opacity-50"
        >
          <Save size={24} /> {isLoading ? "Saving..." : "Post Job"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Briefcase size={14} className="text-qbf-orange" /> Job Title
              </label>
              <input
                type="text"
                value={job.title}
                onChange={(e) => setJob({...job, title: e.target.value})}
                placeholder="Senior Loyalty Strategist..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-2xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Job Description
              </label>
              <textarea
                value={job.description}
                onChange={(e) => setJob({...job, description: e.target.value})}
                rows={15}
                placeholder="Write the role responsibilities, requirements, and benefits..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-8 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange transition-all font-body leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-10 shadow-2xl shadow-black/5 space-y-8">
            <h3 className="text-xl font-display font-black">Details</h3>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Department
              </label>
              <select
                value={job.department}
                onChange={(e) => setJob({...job, department: e.target.value})}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                <option>Strategy</option>
                <option>Implementation</option>
                <option>Management</option>
                <option>Tech</option>
                <option>Marketing</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <MapPin size={14} className="text-qbf-orange" /> Location
              </label>
              <input
                type="text"
                value={job.location}
                onChange={(e) => setJob({...job, location: e.target.value})}
                placeholder="Remote / London / Dubai"
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Clock size={14} className="text-qbf-orange" /> Employment Type
              </label>
              <select
                value={job.type}
                onChange={(e) => setJob({...job, type: e.target.value})}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                <option>Full-time</option>
                <option>Contract</option>
                <option>Part-time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
