import Link from "next/link";
import { ArrowLeft, CheckCircle, FileText, GraduationCap, Layout, Target } from "lucide-react";

export default function CLMPPage() {
  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/products"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-8xl font-display font-black text-qbf-black mb-8 leading-tight tracking-tight">
            CLMP Certification
          </h1>
          <p className="text-2xl md:text-3xl text-qbf-gray leading-relaxed max-w-3xl">
            The Certified Loyalty Marketing Professional™ (CLMP) workshop is
            the premier certification for loyalty practitioners worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-12">
            <h2 className="text-3xl font-display font-black text-qbf-black mb-8">Curriculum Outline</h2>
            <div className="space-y-6">
              {[
                { title: "Loyalty Fundamentals", description: "The core principles of customer engagement and loyalty.", icon: <Target className="text-qbf-orange" size={24} /> },
                { title: "Strategic Design", description: "How to build a loyalty roadmap from scratch.", icon: <Layout className="text-qbf-orange" size={24} /> },
                { title: "Data & Tech", description: "Choosing the right tools and analyzing the right data.", icon: <GraduationCap className="text-qbf-orange" size={24} /> },
                { title: "Final Assessment", description: "Comprehensive exam to earn your certification.", icon: <FileText className="text-qbf-orange" size={24} /> },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-qbf-divider rounded-2xl flex gap-8 items-start">
                  <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-qbf-black mb-2">{item.title}</h4>
                    <p className="text-sm text-qbf-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-qbf-black text-white p-12 md:p-16 rounded-[3rem]">
            <h2 className="text-3xl font-display font-black mb-8">Certification Overview</h2>
            <div className="space-y-10">
              <div>
                <h4 className="text-qbf-orange font-bold uppercase tracking-widest text-sm mb-4">Exam Format</h4>
                <p className="text-lg text-qbf-gray leading-relaxed">Multiple-choice exam with 60 questions, covering all modules of the workshop.</p>
              </div>
              <div>
                <h4 className="text-qbf-orange font-bold uppercase tracking-widest text-sm mb-4">Who should apply</h4>
                <ul className="space-y-4">
                  {[
                    "Mid-to-senior level marketing professionals",
                    "Heads of Loyalty and Customer Engagement",
                    "Strategy and Product Managers",
                    "Agencies and Consultants"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-center font-bold text-white">
                      <div className="w-5 h-5 bg-qbf-orange rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-16">
              <Link
                href="/events/clmp-certification-workshop"
                className="bg-qbf-orange text-white block w-full text-center py-6 rounded-full text-xl font-black hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
              >
                Join Next Intake
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
