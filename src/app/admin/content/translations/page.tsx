"use client";

import { useState, useEffect } from "react";
import { Globe, Save, Check, Search, Plus, Trash2 } from "lucide-react";

export default function TranslationManagementPage() {
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  useEffect(() => {
    fetch("/api/translations")
      .then(res => res.json())
      .then(data => {
        setTranslations(data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await fetch("/api/translations", {
      method: "POST",
      body: JSON.stringify(translations),
      headers: { "Content-Type": "application/json" },
    });
    setIsSaving(false);
  };

  const updateTranslation = (key: string, value: string) => {
    setTranslations({
      ...translations,
      [activeLang]: {
        ...translations[activeLang],
        [key]: value
      }
    });
  };

  if (isLoading) return <div className="p-20 text-center font-bold">Loading translations...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-display font-black">Translation Manager</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 disabled:opacity-50"
        >
          {isSaving ? <Check size={24} /> : <Save size={24} />}
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <div className="flex gap-4 mb-12">
        {[
          { code: "en", name: "English" },
          { code: "ar", name: "Arabic (RTL)" },
          { code: "hi", name: "Hindi" }
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => setActiveLang(lang.code)}
            className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all border ${
              activeLang === lang.code
                ? "bg-qbf-black text-white border-qbf-black"
                : "bg-white text-qbf-gray border-qbf-divider hover:border-qbf-orange"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10 w-1/3">Key / UI Identifier</th>
              <th className="p-10">Translation ({activeLang.toUpperCase()})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {Object.keys(translations["en"] || {}).map((key) => (
              <tr key={key} className="hover:bg-qbf-white/50 transition-all">
                <td className="p-10 font-bold text-qbf-gray text-sm uppercase tracking-widest">{key}</td>
                <td className="p-10">
                  <textarea
                    value={translations[activeLang]?.[key] || ""}
                    onChange={(e) => updateTranslation(key, e.target.value)}
                    dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                    rows={1}
                    className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl focus:outline-none focus:border-qbf-orange transition-all font-medium text-lg resize-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
