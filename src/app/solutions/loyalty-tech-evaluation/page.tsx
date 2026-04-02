import Link from "next/link";
import { ArrowLeft, CheckCircle, Target, Users, Zap, Search } from "lucide-react";

export default function SolutionItemPage() {
  const title = "Loyalty Tech Evaluation";
  const valueProp = "An objective evaluation of your current loyalty technology stack and recommendations for future-proof solutions.";

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/solutions"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Solutions
        </Link>

        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-8xl font-display font-black text-qbf-black mb-8 leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-2xl md:text-3xl text-qbf-gray leading-relaxed max-w-3xl">
            {valueProp}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-12">
            <h2 className="text-3xl font-display font-black text-qbf-black mb-8">What this solution covers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Stack Audit", description: "Reviewing every layer of your loyalty tech architecture.", icon: <Target className="text-qbf-orange" size={24} /> },
                { title: "Vendor Assessment", description: "Evaluating performance and support from your providers.", icon: <Users className="text-qbf-orange" size={24} /> },
                { title: "Gap Analysis", description: "Identifying technical missing pieces for your roadmap.", icon: <Zap className="text-qbf-orange" size={24} /> },
                { title: "Future-Proofing", description: "Defining the next-gen architecture for engagement.", icon: <Search className="text-qbf-orange" size={24} /> },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-qbf-divider rounded-2xl flex flex-col gap-6">
                  <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-qbf-black mb-2">{item.title}</h4>
                    <p className="text-sm text-qbf-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square bg-qbf-divider rounded-[3rem] border border-qbf-divider relative overflow-hidden">
            <div className="absolute inset-0 bg-qbf-orange/5"></div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-12">
            Ready to evaluate your stack?
          </h2>
          <Link
            href="/contact"
            className="bg-qbf-orange text-white px-12 py-6 rounded-full text-2xl font-black hover:scale-105 transition-all shadow-xl shadow-qbf-orange/20 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
