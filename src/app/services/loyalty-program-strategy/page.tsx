import Link from "next/link";
import { ArrowLeft, CheckCircle, Target, Users, Zap, Search } from "lucide-react";

export default function ServiceItemPage({ params }: { params: { slug: string } }) {
  // Mock data based on the slug could be used here
  const title = "Loyalty Program Strategy";
  const valueProp = "Design long-term loyalty roadmaps that balance business objectives with human behavior.";

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/services"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Services
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
            <h2 className="text-3xl font-display font-black text-qbf-black mb-8">What this service covers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Strategic Design", description: "Creating the blueprint for long-term customer engagement.", icon: <Target className="text-qbf-orange" size={24} /> },
                { title: "Behavioral Mapping", description: "Understanding the emotional drivers of your customers.", icon: <Users className="text-qbf-orange" size={24} /> },
                { title: "Roadmap Planning", description: "Defining a clear path from design to delivery.", icon: <Zap className="text-qbf-orange" size={24} /> },
                { title: "Tech Strategy", description: "Choosing the right tools for your loyalty program.", icon: <Search className="text-qbf-orange" size={24} /> },
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
              <h2 className="text-4xl font-display font-black mb-8 leading-tight">Who it's for</h2>
              <p className="text-xl text-qbf-gray mb-12 max-w-lg leading-relaxed">
                Enterprises looking to design, build, or optimize their customer
                loyalty programs for long-term success.
              </p>
              <ul className="space-y-4">
                {[
                  "Chief Marketing Officers",
                  "Heads of Customer Loyalty",
                  "Product Strategy Teams",
                  "Innovation Leaders"
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
              <h2 className="text-4xl font-display font-black mb-8 leading-tight">How we work</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Discovery", description: "Deep dive into your business goals and customer data." },
                  { step: "02", title: "Strategy Design", description: "Defining the core concept and value proposition." },
                  { step: "03", title: "Operational Roadmap", description: "Defining the tech and processes required for success." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <div className="text-4xl font-display font-black text-qbf-orange/20 shrink-0">{item.step}</div>
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
            Ready to get started?
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
