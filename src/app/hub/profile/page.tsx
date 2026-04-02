"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Mail, Briefcase, Bookmark, FileText, Layout, ArrowRight, Settings } from "lucide-react";

export default function MemberProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [savedResources, setSavedResources] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("hub_user");
    if (userData) setUser(JSON.parse(userData));

    const saved = JSON.parse(localStorage.getItem("hub_saved") || "[]");
    setSavedResources(saved);
  }, []);

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sidebar / Info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-qbf-divider rounded-[3rem] p-10 shadow-2xl shadow-black/5 sticky top-32">
              <div className="w-24 h-24 bg-qbf-black rounded-3xl mb-8 flex items-center justify-center text-white">
                <User size={48} />
              </div>
              <h1 className="text-3xl font-display font-black text-qbf-black mb-2">{user?.name || "Member Name"}</h1>
              <p className="text-qbf-orange font-bold uppercase tracking-widest text-xs mb-8">{user?.role || "Loyalty Practitioner"}</p>

              <div className="space-y-6 pt-8 border-t border-qbf-divider">
                <div className="flex gap-4 items-center text-qbf-gray font-medium">
                  <Mail size={18} className="text-qbf-orange" />
                  <span>{user?.email || "member@email.com"}</span>
                </div>
                <div className="flex gap-4 items-center text-qbf-gray font-medium">
                  <Briefcase size={18} className="text-qbf-orange" />
                  <span>{user?.role || "Position at Company"}</span>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <Link
                  href="/hub/register/talent"
                  className="flex items-center justify-between p-4 bg-qbf-white border border-qbf-divider rounded-2xl hover:border-qbf-orange transition-all group"
                >
                  <span className="font-bold text-sm">Talent Profile</span>
                  <ArrowRight size={16} className="text-qbf-gray group-hover:text-qbf-orange group-hover:translate-x-1 transition-all" />
                </Link>
                <button className="w-full flex items-center gap-3 p-4 text-qbf-gray hover:text-qbf-black transition-all font-bold text-sm">
                  <Settings size={18} /> Edit Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Content / Saved Resources */}
          <div className="w-full lg:w-2/3">
            <div className="mb-12">
              <h2 className="text-4xl font-display font-black text-qbf-black mb-4">Your Saved Resources</h2>
              <p className="text-xl text-qbf-gray">Quick access to the reports and frameworks you've bookmarked.</p>
            </div>

            {savedResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {savedResources.map((res, i) => (
                  <Link
                    key={i}
                    href={res.href}
                    className="bg-white border border-qbf-divider rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-black/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center mb-6">
                      {res.type === 'Report' ? <FileText className="text-qbf-orange" size={24} /> : <Layout className="text-qbf-orange" size={24} />}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray mb-2">{res.type}</p>
                    <h3 className="text-2xl font-display font-bold text-qbf-black mb-6 leading-tight group-hover:text-qbf-orange transition-colors">
                      {res.title}
                    </h3>
                    <span className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Now <span>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-qbf-divider rounded-[3rem] p-20 text-center">
                <div className="w-16 h-16 bg-qbf-white border border-qbf-divider rounded-2xl flex items-center justify-center mx-auto mb-8 text-qbf-gray/20">
                  <Bookmark size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-qbf-black mb-4">No saved resources yet</h3>
                <p className="text-qbf-gray mb-12">Explore the Hub and bookmark resources for easy access.</p>
                <Link
                  href="/hub"
                  className="bg-qbf-black text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all inline-block"
                >
                  Browse Resources
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
