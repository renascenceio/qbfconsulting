import Link from "next/link";
import { Zap, Layout, Settings, Target, Users, CheckCircle } from "lucide-react";

const services = [
  {
    title: "Loyalty Program Strategy",
    description: "Design long-term loyalty roadmaps that balance business objectives with human behavior.",
    icon: <Zap className="text-qbf-orange" size={24} />,
    href: "/services/loyalty-program-strategy",
  },
  {
    title: "Loyalty Program Implementation",
    description: "Move from concepts to fully-operational systems. We bridge the gap between design and technology.",
    icon: <Layout className="text-qbf-orange" size={24} />,
    href: "/services/loyalty-program-implementation",
  },
  {
    title: "Loyalty Program Management",
    description: "Ongoing optimization and performance management to ensure your program keeps delivering value.",
    icon: <Settings className="text-qbf-orange" size={24} />,
    href: "/services/loyalty-program-management",
  },
];

export default function ServicesPage() {
  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
            Our <br />
            <span className="text-qbf-orange">Services.</span>
          </h1>
          <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
            We provide end-to-end expertise for modern loyalty programs,
            from initial design to ongoing management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-white p-10 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center mb-8">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-6 leading-tight group-hover:text-qbf-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-qbf-gray mb-10 leading-relaxed flex-grow">
                {service.description}
              </p>
              <span className="text-qbf-orange font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                Explore Service <span>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-8 leading-tight">
              Why work with <br /> QBF Consulting?
            </h2>
            <div className="space-y-8">
              {[
                { title: "Deep Expertise", description: "Our team has led some of the world's most successful customer engagement programs." },
                { title: "Human-Centric Design", description: "We balance business objectives with human behavior and emotional connection." },
                { title: "Operational Excellence", description: "We move from abstract strategy to fully-operational systems." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-8 h-8 bg-qbf-orange text-white rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-qbf-black mb-2">{item.title}</h4>
                    <p className="text-qbf-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square bg-qbf-divider rounded-[3rem] border border-qbf-divider relative overflow-hidden">
            <div className="absolute inset-0 bg-qbf-orange/5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
