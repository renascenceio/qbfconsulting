"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, FileText, Layout } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const HubTeaser = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding bg-qbf-black text-qbf-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qbf-orange/10 blur-[150px] pointer-events-none rounded-full -mr-64 -mt-64"></div>

      <div className="max-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-qbf-orange font-bold text-sm uppercase tracking-widest mb-6 block">
              {t("hub_teaser_tag")}
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black leading-tight mb-8">
              {t("hub_teaser_title")}
            </h2>
            <p className="text-xl text-qbf-gray mb-12 max-w-lg leading-relaxed">
              {t("hub_teaser_desc")}
            </p>
            <Link
              href="/hub"
              className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-3"
            >
              {t("hub_teaser_cta")} <span className="mx-1">→</span>
            </Link>
          </div>

          <div className="relative grid grid-cols-2 gap-6 rotate-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="flex flex-col gap-4 filter blur-[3px] pointer-events-none select-none opacity-40">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    {i % 2 === 0 ? <FileText size={20} /> : <Layout size={20} />}
                  </div>
                  <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                  <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                  <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                </div>

                {/* Overlay Lock */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-qbf-orange/20 border border-qbf-orange/30 rounded-full flex items-center justify-center text-qbf-orange">
                    <Lock size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                    {t("hub_teaser_gated")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
