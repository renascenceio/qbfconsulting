"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Building2, Search, Filter, Mail, ArrowRight } from "lucide-react";

export default function CommunityMatchingPage() {
  const [talent, setTalent] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Talent");
  const [query, setQuery] = useState("");

  useEffect(() => {
    // In Phase 2, we just show everything registered for demo purposes
    const talentData = JSON.parse(localStorage.getItem("hub_talent") || "[]");
    const companyData = JSON.parse(localStorage.getItem("hub_companies") || "[]");
    setTalent(talentData);
    setCompanies(companyData);
  }, []);

  const items = activeTab === "Talent" ? talent : companies;
  const filteredItems = items.filter(item => {
    const name = activeTab === "Talent" ? item.name : item.companyName;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-3xl">
            <Link href="/hub" className="text-qbf-orange font-bold text-sm hover:underline">← Back to Hub</Link>
            <h1 className="text-5xl md:text-8xl font-display font-black text-qbf-black mt-6 mb-8 leading-tight tracking-tight">
              Community <br />
              <span className="text-qbf-orange">Matching.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Connecting elite loyalty practitioners with the world's leading brands.
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <div className="flex bg-white p-1 rounded-full border border-qbf-divider self-start lg:self-end">
              {["Talent", "Companies"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === "Companies" ? "Company" : "Talent")}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                    (activeTab === "Talent" && tab === "Talent") || (activeTab === "Company" && tab === "Companies")
                      ? "bg-qbf-orange text-white"
                      : "text-qbf-gray hover:text-qbf-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-qbf-divider rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-black/5 transition-all group"
              >
                <div className="w-16 h-16 bg-qbf-black rounded-2xl mb-8 flex items-center justify-center text-white">
                  {activeTab === "Talent" ? <User size={32} /> : <Building2 size={32} />}
                </div>
                <h3 className="text-2xl font-display font-bold text-qbf-black mb-2 leading-tight group-hover:text-qbf-orange transition-colors">
                  {activeTab === "Talent" ? item.name : item.companyName}
                </h3>
                <p className="text-qbf-orange font-bold uppercase tracking-widest text-[10px] mb-6">
                  {activeTab === "Talent" ? item.role : item.industry}
                </p>
                <p className="text-qbf-gray mb-10 leading-relaxed line-clamp-3">
                  {activeTab === "Talent" ? `Expertise: ${item.skills}` : `Hiring for: ${item.rolesHiringFor}`}
                </p>
                <button className="w-full bg-qbf-black text-white py-4 rounded-full font-bold text-sm hover:bg-qbf-orange transition-all flex items-center justify-center gap-3">
                  <Mail size={16} /> Contact {activeTab === "Talent" ? "Member" : "Company"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-20 text-center">
            <h3 className="text-2xl font-display font-black text-qbf-black mb-4">No {activeTab.toLowerCase()} matches found</h3>
            <p className="text-qbf-gray mb-12">Be the first to join the matching pool!</p>
            <Link
              href={`/hub/register/${activeTab.toLowerCase()}`}
              className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-all inline-block shadow-xl shadow-qbf-orange/20"
            >
              Register Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
