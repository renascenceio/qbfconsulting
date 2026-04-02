import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, FileText, Lock, Share2, User, Calendar } from "lucide-react";

export default function HubReportItemPage({ params }: { params: { slug: string } }) {
  const isRegistered = false; // Mock state

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/hub/reports"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Reports
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
            <div className="aspect-[4/5] bg-qbf-divider rounded-[3rem] border border-qbf-divider relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-qbf-orange/5 animate-pulse"></div>
              <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-[2rem] flex items-center justify-center border border-white/30 text-white/40">
                <FileText size={48} />
              </div>
            </div>

            <div>
              <div className="flex gap-4 mb-8">
                <span className="bg-qbf-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  Industry Report
                </span>
                <span className="bg-qbf-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  2024
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-qbf-black mb-8 leading-tight tracking-tight">
                State of Loyalty 2024
              </h1>
              <div className="flex flex-wrap gap-8 items-center border-y border-qbf-divider py-8 mb-12 text-sm font-bold uppercase tracking-widest text-qbf-gray">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-qbf-orange" />
                  <span>QBF Research</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-qbf-orange" />
                  <span>June 15, 2024</span>
                </div>
              </div>

              <div className="prose prose-xl text-qbf-gray leading-relaxed mb-12">
                <p>
                  Our comprehensive annual report on the evolving landscape of
                  customer loyalty, based on data from 500+ global brands and
                  10,000+ consumers.
                </p>
              </div>

              {!isRegistered ? (
                <div className="bg-qbf-black text-white p-12 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-qbf-orange/20 blur-3xl rounded-full -mr-12 -mt-12"></div>
                  <h3 className="text-2xl font-display font-bold mb-6">Register to Download</h3>
                  <p className="text-qbf-gray mb-8">This resource is exclusive to registered loyalty hub members.</p>
                  <Link
                    href="/hub"
                    className="bg-qbf-orange text-white block w-full text-center py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
                  >
                    Create Free Account
                  </Link>
                </div>
              ) : (
                <button className="bg-qbf-orange text-white w-full py-6 rounded-full text-xl font-black hover:scale-105 transition-all shadow-xl shadow-qbf-orange/20 flex items-center justify-center gap-4">
                  Download PDF (12MB) <Download size={24} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-8">What you'll learn</h2>
              <ul className="space-y-6">
                {[
                  "Key loyalty trends to watch in 2024 and beyond.",
                  "The impact of AI on customer engagement strategies.",
                  "Consumer sentiment and shifting reward preferences.",
                  "Benchmarks for redemption rates and active share.",
                  "Successful case studies from various industries."
                ].map((item, i) => (
                  <li key={i} className="flex gap-6 items-start font-bold text-lg text-qbf-black leading-snug">
                    <div className="w-8 h-8 bg-qbf-orange rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-8">Related Resources</h2>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="p-8 bg-white border border-qbf-divider rounded-[2rem] flex gap-8 items-center hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-qbf-divider rounded-2xl flex items-center justify-center shrink-0 border border-qbf-divider">
                      <FileText size={24} className="text-qbf-gray/40" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-qbf-black mb-1 leading-tight">State of Loyalty {2024 - i}</h4>
                      <p className="text-sm text-qbf-gray font-bold uppercase tracking-widest">Industry Report • {2024 - i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
