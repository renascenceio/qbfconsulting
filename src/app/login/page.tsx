"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "aslan@renascence.io" && password === "Admin123!") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-qbf-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-qbf-divider rounded-[3rem] p-12 shadow-2xl shadow-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-qbf-orange/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <span className="font-display text-4xl font-black text-qbf-black">
              QBF<span className="text-qbf-orange">.</span>
            </span>
          </Link>
          <h1 className="text-3xl font-display font-black text-qbf-black mb-2">Welcome Back</h1>
          <p className="text-qbf-gray font-medium">Please enter your details.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold mb-8 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray ml-4">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@company.com"
                className="w-full bg-qbf-white border border-qbf-divider px-12 py-4 rounded-full focus:outline-none focus:border-qbf-orange transition-all text-qbf-black"
                required
              />
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-qbf-gray" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-qbf-gray ml-4">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-qbf-white border border-qbf-divider px-12 py-4 rounded-full focus:outline-none focus:border-qbf-orange transition-all text-qbf-black"
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-qbf-gray" size={18} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-qbf-orange text-white py-5 rounded-full text-lg font-black hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20 flex items-center justify-center gap-3"
          >
            Log In <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm font-bold text-qbf-gray hover:text-qbf-orange transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
