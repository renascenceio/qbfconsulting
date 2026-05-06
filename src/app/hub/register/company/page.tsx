"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Globe, Mail, Users, Check, ArrowRight } from "lucide-react";

export default function CompanyRegistrationPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactEmail: "",
    rolesHiringFor: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "company", data: formData }),
      });
    } catch {
      // ignore network errors here
    }
    const existingCompanies = JSON.parse(localStorage.getItem("hub_companies") || "[]");
    localStorage.setItem(
      "hub_companies",
      JSON.stringify([...existingCompanies, { ...formData, id: Date.now() }])
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
            Your company profile has been submitted. Our team will review your application for the matching program.
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
              Register <br />
              <span className="text-qbf-orange">Your Company.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Connect with the world's most qualified loyalty practitioners and
              build your dream engagement team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-qbf-divider rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                  <Building2 size={14} className="text-qbf-orange" /> Company Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Acme Corp"
                  className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                  <Globe size={14} className="text-qbf-orange" /> Industry
                </label>
                <input
                  required
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  placeholder="Retail / Fintech / Travel"
                  className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium"
                />
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                <Mail size={14} className="text-qbf-orange" /> Contact Email
              </label>
              <input
                required
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                placeholder="hiring@acme.com"
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium"
              />
            </div>

            <div className="space-y-4 mb-12">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray ml-4 flex items-center gap-2">
                <Users size={14} className="text-qbf-orange" /> Role Types Hiring For
              </label>
              <textarea
                required
                value={formData.rolesHiringFor}
                onChange={(e) => setFormData({...formData, rolesHiringFor: e.target.value})}
                rows={4}
                placeholder="e.g. Loyalty Strategists, Data Analysts, Product Managers"
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-4 rounded-2xl focus:outline-none focus:border-qbf-orange transition-all text-qbf-black font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-qbf-orange text-white py-6 rounded-full text-xl font-black hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 flex items-center justify-center gap-3"
            >
              Submit Company Profile <ArrowRight size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
