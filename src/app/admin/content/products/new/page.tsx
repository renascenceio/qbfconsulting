"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Type, Layout, Tag, DollarSign, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    category: "CLMP",
    price: "Enquire for pricing",
    description: "",
    status: "Published",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/content/products");
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
          <Link href="/admin/content/products" className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-4xl font-display font-black">New Product / Course</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 disabled:opacity-50"
        >
          <Save size={24} /> {isLoading ? "Saving..." : "Publish Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Type size={14} className="text-qbf-orange" /> Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
                placeholder="CLMP Certification..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-6 rounded-[2rem] text-2xl font-display font-bold focus:outline-none focus:border-qbf-orange transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Layout size={14} className="text-qbf-orange" /> Description
              </label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
                rows={15}
                placeholder="Details about the course, curriculum, and target audience..."
                className="w-full bg-qbf-white border border-qbf-divider px-8 py-8 rounded-[2rem] text-lg focus:outline-none focus:border-qbf-orange transition-all font-body leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-qbf-divider rounded-[3rem] p-10 shadow-2xl shadow-black/5 space-y-8">
            <h3 className="text-xl font-display font-black">Configuration</h3>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <Tag size={14} className="text-qbf-orange" /> Category
              </label>
              <select
                value={product.category}
                onChange={(e) => setProduct({...product, category: e.target.value})}
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange appearance-none"
              >
                <option>CLMP</option>
                <option>Workshop</option>
                <option>Training</option>
                <option>Strategic Solution</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-qbf-gray flex items-center gap-2">
                <DollarSign size={14} className="text-qbf-orange" /> Pricing
              </label>
              <input
                type="text"
                value={product.price}
                onChange={(e) => setProduct({...product, price: e.target.value})}
                placeholder="$999 or Enquire..."
                className="w-full bg-qbf-white border border-qbf-divider px-6 py-4 rounded-xl font-bold text-sm focus:outline-none focus:border-qbf-orange"
              />
            </div>

            <div className="pt-6 border-t border-qbf-divider">
              <div className="bg-qbf-divider aspect-video rounded-2xl flex flex-col items-center justify-center text-qbf-gray/40 border-2 border-dashed border-qbf-gray/10 cursor-pointer hover:border-qbf-orange transition-all">
                <ImageIcon size={32} />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-4">Product Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
