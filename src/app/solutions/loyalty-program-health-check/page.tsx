import Link from "next/link";
import { ArrowLeft, CheckCircle, Target, Users, Zap, Search } from "lucide-react";

export default function SolutionItemPage({ params }: { params: { slug: string } }) {
  const title = "Loyalty Program Health Check";
  const valueProp = "An intensive audit of your existing loyalty program to identify gaps and opportunities for improvement.";

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
                { title: "Program Audit", description: "Deep dive into your existing program's performance.", icon: <Target className="text-qbf-orange" size={24} /> },
                { title: "Gap Analysis", description: "Identifying missing opportunities for engagement.", icon: <Users className="text-qbf-orange" size={24} /> },
                { title: "Tech Assessment", description: "Evaluating the performance of your current loyalty stack.", icon: <Zap className="text-qbf-orange" size={24} /> },
                { title: "Risk Mitigation", description: "Identifying potential risks and how to avoid them.", icon: <Search className="text-qbf-orange" size={24} /> },
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

        <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-display font-black mb-8 leading-tight">Deliverables</h2>
              <ul className="space-y-4">
                {[
                  "Comprehensive Health Check Report",
                  "Gap Analysis Summary",
                  "Prioritized List of Improvements",
                  "Tech Stack Recommendations",
                  "Presentation to Stakeholders"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center font-bold text-lg">
                    <div className="w-6 h-6 bg-qbf-orange rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-display font-black mb-8 leading-tight">Timeline & Format</h2>
              <div className="space-y-8">
                {[
                  { step: "Duration", title: "2 Weeks", description: "Remote assessment and stakeholder interviews." },
                  { step: "Format", title: "Workshops", description: "Interactive sessions with your core team." },
                  { step: "Pricing", title: "Enquire for pricing", description: "Customized to your program's size and complexity." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <div className="text-lg font-bold text-qbf-orange/50 uppercase tracking-widest shrink-0 w-24">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-qbf-gray leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-12">
            Ready for a health check?
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
