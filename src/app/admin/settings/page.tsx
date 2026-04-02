"use client";

import { useState } from "react";
import { Mail, Globe, Bell, Save, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-display font-black">Settings</h2>
        <button
          onClick={handleSave}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
        >
          {isSaved ? <Check size={24} /> : <Save size={24} />}
          {isSaved ? "Saved" : "Save Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Newsletter Settings */}
        <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center text-qbf-orange border border-qbf-orange/20">
              <Mail size={24} />
            </div>
            <h3 className="text-2xl font-display font-bold">Newsletter Automation</h3>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-qbf-black">Welcome Sequence</p>
                <p className="text-sm text-qbf-gray">Automatically send welcome email to new members.</p>
              </div>
              <input type="checkbox" className="w-12 h-6 appearance-none bg-qbf-divider rounded-full relative cursor-pointer checked:bg-green-500 transition-all before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-6 before:transition-all" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-qbf-black">Weekly Digest</p>
                <p className="text-sm text-qbf-gray">Send summary of new resources every Monday.</p>
              </div>
              <input type="checkbox" className="w-12 h-6 appearance-none bg-qbf-divider rounded-full relative cursor-pointer checked:bg-green-500 transition-all before:content-[''] before:absolute before:w-5 before:h-5 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-6 before:transition-all" />
            </div>
            <div className="space-y-4 pt-6 border-t border-qbf-divider">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray">Provider API Key</label>
              <input type="password" placeholder="••••••••••••••••" className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl focus:outline-none focus:border-qbf-orange transition-all" />
            </div>
          </div>
        </div>

        {/* Localization Settings */}
        <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 border border-blue-100">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-display font-bold">Multilingual Setup</h3>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-qbf-black">English (Default)</p>
                <p className="text-sm text-qbf-gray">Primary site language.</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full">Active</span>
            </div>
            <div className="flex justify-between items-center opacity-60">
              <div>
                <p className="font-bold text-qbf-black">Arabic</p>
                <p className="text-sm text-qbf-gray">Coming soon (Phase 3).</p>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-qbf-orange hover:underline">Enable</button>
            </div>
            <div className="flex justify-between items-center opacity-60">
              <div>
                <p className="font-bold text-qbf-black">French</p>
                <p className="text-sm text-qbf-gray">Coming soon (Phase 3).</p>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-qbf-orange hover:underline">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
