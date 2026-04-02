"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap } from "lucide-react";

export default function CompanyPage() {
  const values = [
    {
      title: "Clarity",
      description: "We demystify the complex world of loyalty with straightforward, actionable advice.",
      icon: <Target className="text-qbf-orange" size={24} />,
    },
    {
      title: "Deference",
      description: "Our content and strategy always serve your brand's unique goals and needs.",
      icon: <Users className="text-qbf-orange" size={24} />,
    },
    {
      title: "Depth",
      description: "We don't do superficial. We dive deep into the mechanics of engagement.",
      icon: <Zap className="text-qbf-orange" size={24} />,
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
            Built for Loyalty <br />
            <span className="text-qbf-orange">Practitioners.</span>
          </h1>
          <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl mx-auto">
            QBF Consulting's digital presence is a loyalty community
            destination — a place to grow and grow with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-center">
          <div>
            <h2 className="text-3xl font-display font-black text-qbf-black mb-8">
              Mission & Vision
            </h2>
            <div className="prose prose-lg text-qbf-gray space-y-6">
              <p>
                Our mission is to help companies build long-lasting, meaningful
                relationships with their customers through strategic loyalty.
              </p>
              <p>
                We believe that loyalty is not just about points and discounts;
                it's about earning trust, delivering value, and building a
                community.
              </p>
            </div>
          </div>
          <div className="aspect-video bg-qbf-divider rounded-3xl overflow-hidden border border-qbf-divider"></div>
        </div>

        <div>
          <h2 className="text-3xl font-display font-black text-qbf-black mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-2xl border border-qbf-divider hover:shadow-xl hover:shadow-black/5 transition-all"
              >
                <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-qbf-black mb-4">
                  {value.title}
                </h3>
                <p className="text-qbf-gray leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
