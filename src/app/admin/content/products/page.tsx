"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

type Product = {
  id?: string;
  slug: string;
  name: string;
  category?: string;
  price?: string;
  status?: string;
};

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busySlug, setBusySlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Remove "${product.name}"?`)) return;
    setBusySlug(product.slug);
    try {
      const res = await fetch(`/api/products/${product.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p.slug !== product.slug));
    } catch {
      alert("Failed to delete the product.");
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-black">Products & Courses</h2>
          <p className="text-sm text-qbf-gray mt-1">
            {products.length} item{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/content/products/new"
          className="bg-qbf-orange text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <Plus size={18} /> New Product
        </Link>
      </div>

      <div className="bg-white border border-qbf-divider rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-qbf-white border-b border-qbf-divider">
              <tr className="text-[11px] font-bold uppercase tracking-widest text-qbf-gray">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qbf-divider">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    <Loader2 className="inline-block mr-2 animate-spin" size={14} />
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-qbf-gray text-xs uppercase tracking-widest font-bold"
                  >
                    No products published
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.slug}
                    className="hover:bg-qbf-white/60 transition-all"
                  >
                    <td className="px-6 py-4 font-bold text-qbf-black max-w-md leading-snug">
                      <Link
                        href={`/admin/content/products/${product.slug}`}
                        className="hover:text-qbf-orange"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {product.category ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-green-50 text-green-600">
                          {product.category}
                        </span>
                      ) : (
                        <span className="text-qbf-gray text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-qbf-gray text-sm font-medium">
                      {product.price || "Enquire"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          product.status === "Published"
                            ? "bg-green-50 text-green-600"
                            : "bg-qbf-divider text-qbf-gray"
                        }`}
                      >
                        {product.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/content/products/${product.slug}`}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          disabled={busySlug === product.slug}
                          className="w-9 h-9 bg-qbf-white border border-qbf-divider rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
                          aria-label="Delete"
                        >
                          {busySlug === product.slug ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
