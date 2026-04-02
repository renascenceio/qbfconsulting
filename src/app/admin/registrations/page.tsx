"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Check, X, User, Building2, Eye } from "lucide-react";

export default function RegistrationReviewPage() {
  const [talent, setTalent] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Talent");

  useEffect(() => {
    const talentData = JSON.parse(localStorage.getItem("hub_talent") || "[]");
    const companyData = JSON.parse(localStorage.getItem("hub_companies") || "[]");
    setTalent(talentData);
    setCompanies(companyData);
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-display font-black">Registration Review</h2>
        <div className="flex bg-qbf-white p-1 rounded-full border border-qbf-divider">
          {["Talent", "Company"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === tab
                  ? "bg-qbf-orange text-white"
                  : "text-qbf-gray hover:text-qbf-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-4">
          {["Pending", "Approved", "Rejected"].map((f) => (
            <button key={f} className="px-6 py-2 rounded-full border border-qbf-divider font-bold text-sm hover:border-qbf-orange hover:text-qbf-orange transition-all">
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            className="w-full bg-white border border-qbf-divider px-10 py-3 rounded-full text-sm focus:outline-none focus:border-qbf-orange transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={16} />
        </div>
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10">{activeTab === "Talent" ? "Name / Role" : "Company / Industry"}</th>
              <th className="p-10">Details</th>
              <th className="p-10">Status</th>
              <th className="p-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {(activeTab === "Talent" ? talent : companies).length > 0 ? (
              (activeTab === "Talent" ? talent : companies).map((item, i) => (
                <tr key={i} className="hover:bg-qbf-white/50 transition-all group">
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-qbf-divider rounded-xl flex items-center justify-center shrink-0">
                        {activeTab === "Talent" ? <User size={20} /> : <Building2 size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-qbf-black text-lg leading-tight">
                          {activeTab === "Talent" ? item.name : item.companyName}
                        </p>
                        <p className="text-sm text-qbf-gray font-medium">
                          {activeTab === "Talent" ? item.role : item.industry}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <p className="text-sm text-qbf-gray max-w-xs truncate">
                      {activeTab === "Talent" ? `Skills: ${item.skills}` : `Contact: ${item.contactEmail}`}
                    </p>
                  </td>
                  <td className="p-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-orange-100 text-qbf-orange">
                      Pending
                    </span>
                  </td>
                  <td className="p-10 text-right">
                    <div className="flex gap-4 justify-end">
                      <button className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:border-qbf-black transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="w-10 h-10 bg-qbf-white border border-green-200 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                        <Check size={18} />
                      </button>
                      <button className="w-10 h-10 bg-qbf-white border border-red-200 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-20 text-center text-qbf-gray font-bold uppercase tracking-widest text-xs">
                  No pending registrations
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
