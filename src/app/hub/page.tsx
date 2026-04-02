"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, FileText, Layout, Download, Users, Zap } from "lucide-react";

export default function HubLandingPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const registered = localStorage.getItem("hub_registered") === "true";
    setIsRegistered(registered);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("hub_registered", "true");
    localStorage.setItem("hub_user", JSON.stringify(formData));
    setIsRegistered(true);
  };

  const stats = [
    { label: "Resources", value: "24+" },
    { label: "Downloads", value: "1.2k" },
    { label: "Members", value: "500+" },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-32 gap-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-display font-black text-qbf-black mb-8 leading-tight tracking-tight">
              The Loyalty <br />
              <span className="text-qbf-orange">Hub.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-qbf-gray leading-relaxed mb-12">
              {isRegistered
                ? `Welcome back to the Hub. You have full access to all exclusive resources.`
                : "Free, gated resources for loyalty practitioners. Reports, frameworks, and templates to help you grow."
              }
            </p>
            <div className="flex flex-wrap gap-12 border-t border-qbf-divider pt-12">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-display font-black text-qbf-black mb-1">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-qbf-orange">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {!isRegistered && (
            <div className="w-full lg:w-96 bg-qbf-black text-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-qbf-orange/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-qbf-orange/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-3xl font-display font-black mb-8 relative z-10">Join the Community</h2>
              <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-3 rounded-xl focus:outline-none focus:border-qbf-orange text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">Work Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-3 rounded-xl focus:outline-none focus:border-qbf-orange text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray">Role</label>
                  <input
                    required
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-3 rounded-xl focus:outline-none focus:border-qbf-orange text-white"
                  />
                </div>
                <button type="submit" className="bg-qbf-orange text-white w-full py-4 rounded-full font-bold hover:opacity-90 transition-all mt-4">
                  Register for Free
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[3rem] border border-qbf-divider group hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="w-16 h-16 bg-qbf-orange-muted rounded-2xl flex items-center justify-center mb-10">
              <FileText className="text-qbf-orange" size={32} />
            </div>
            <h3 className="text-4xl font-display font-black text-qbf-black mb-6">Reports</h3>
            <p className="text-xl text-qbf-gray mb-10 leading-relaxed">
              In-depth industry reports and analysis on the state of loyalty.
            </p>
            <Link
              href="/hub/reports"
              className="bg-qbf-black text-white px-8 py-4 rounded-full font-bold inline-block"
            >
              Explore Reports
            </Link>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-qbf-divider group hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="w-16 h-16 bg-qbf-orange-muted rounded-2xl flex items-center justify-center mb-10">
              <Layout className="text-qbf-orange" size={32} />
            </div>
            <h3 className="text-4xl font-display font-black text-qbf-black mb-6">Frameworks</h3>
            <p className="text-xl text-qbf-gray mb-10 leading-relaxed">
              Actionable frameworks and templates to implement strategy.
            </p>
            <Link
              href="/hub/frameworks"
              className="bg-qbf-black text-white px-8 py-4 rounded-full font-bold inline-block"
            >
              Explore Frameworks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
