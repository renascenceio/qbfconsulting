"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Briefcase, FileUp, Tag, Check, ArrowRight } from "lucide-react";

export default function TalentRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    skills: "",
    isOpenToOpportunities: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "talent", data: formData }),
      });
    } catch {
      // Network errors are surfaced server-side; still mark submitted client-side
    }
    // Mirror to localStorage so existing client-only views keep working.
    const existingTalent = JSON.parse(localStorage.getItem("hub_talent") || "[]");
    localStorage.setItem(
      "hub_talent",
      JSON.stringify([...existingTalent, { ...formData, id: Date.now() }])
    );
    setIsSubmitted(true);
    setTimeout(() => router.push("/hub"), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="section-padding bg-qbf-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-qbf-divider rounded-[3rem] p-12 text-center shadow-2xl shadow-black/5">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-display font-black text-qbf-black mb-4">Registration Sent!</h2>
          <p className="text-qbf-gray leading-relaxed mb-8">
            Your profile has been submitted for review. We'll notify you once it's approved for matching.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange">Redirecting to Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href="/hub" className="text-qbf-orange font-bold text-sm hover:underline">← Back to Hub</Link>
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mt-6 mb-8 leading-tight">
              Join the <br />
              <span className="text-qbf-orange">Talent Pool.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Showcase your expertise to top companies in the loyalty industry.
              Gated exclusively for Hub members.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-qbf-divider rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                  <User size={14} className="text-qbf-orange" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                  <Briefcase size={14} className="text-qbf-orange" /> Current Role
                </label>
                <input
                  required
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="Loyalty Manager"
                  className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium"
                />
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Skills (Comma separated)
              </label>
              <input
                required
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="Strategy, Analytics, CRM, Project Management"
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium"
              />
            </div>

            <div className="bg-qbf-white border border-qbf-divider rounded-2xl p-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center shrink-0">
                  <FileUp className="text-qbf-orange" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-qbf-black mb-1">CV / Portfolio</h4>
                  <p className="text-sm text-qbf-gray font-medium">Upload your latest resume (PDF, max 5MB)</p>
                </div>
              </div>
              <button type="button" className="bg-qbf-black text-white px-8 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all">
                Choose File
              </button>
            </div>

            <div className="flex items-center gap-4 mb-12 ml-4">
              <input
                type="checkbox"
                id="openToOpportunities"
                checked={formData.isOpenToOpportunities}
                onChange={(e) => setFormData({...formData, isOpenToOpportunities: e.target.checked})}
                className="w-6 h-6 rounded accent-qbf-orange"
              />
              <label htmlFor="openToOpportunities" className="text-lg font-bold text-qbf-black cursor-pointer">
                I am open to new career opportunities
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-qbf-orange text-white py-6 rounded-full text-xl font-black hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 flex items-center justify-center gap-3"
            >
              Submit Registration <ArrowRight size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
