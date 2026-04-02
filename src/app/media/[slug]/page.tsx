import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function MediaItemPage({ params }: { params: { slug: string } }) {
  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <Link
          href="/media"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Media
        </Link>

        <div className="max-w-4xl bg-white border border-qbf-divider rounded-[3rem] overflow-hidden p-12 md:p-20">
          <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
            <div className="w-32 h-32 bg-qbf-divider rounded-3xl shrink-0 flex items-center justify-center font-black text-xs text-qbf-gray/40 border border-qbf-divider">
              PUBLICATION LOGO
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-qbf-orange mb-4">
                Forbes • May 20, 2024
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-8 leading-tight">
                How QBF Consulting is Changing the Loyalty Game
              </h1>
              <div className="prose prose-xl text-qbf-gray leading-relaxed mb-12 italic">
                "QBF Consulting is not just another strategy firm. They are
                pioneering a new approach to customer engagement that prioritizes
                depth over superficial tactics."
              </div>
              <Link
                href="https://forbes.com"
                target="_blank"
                className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-3 shadow-xl shadow-qbf-orange/20"
              >
                Read Full Article <ExternalLink size={20} />
              </Link>
            </div>
          </div>

          <div className="pt-16 border-t border-qbf-divider">
            <h2 className="text-2xl font-display font-bold text-qbf-black mb-6">
              Internal Commentary from QBF
            </h2>
            <div className="prose prose-lg text-qbf-gray space-y-6">
              <p>
                In this feature, we discuss the core philosophy of our agency:
                that loyalty is a strategic asset, not just a marketing cost.
                We were thrilled to share our insights on the evolving landscape
                of customer behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
