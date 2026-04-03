import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | QBF Consulting Journal`,
    description: `Expert insights and analysis on ${params.slug.replace(/-/g, ' ')} for loyalty practitioners.`,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Death of the Tiered Program?",
    "image": "https://qbfconsulting.com/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": "Founder Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QBF Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qbfconsulting.com/logo.png"
      }
    },
    "datePublished": "2024-05-12"
  };

  return (
    <article className="section-padding bg-qbf-white min-h-screen">
      <SchemaMarkup data={jsonLd} />
      <div className="max-content">
        <Link
          href="/blog"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <span className="bg-qbf-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">
              Loyalty Strategy
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-qbf-black mb-12 leading-tight">
              The Death of the Tiered Program?
            </h1>
            <div className="flex flex-wrap gap-8 items-center border-y border-qbf-divider py-8 text-sm font-bold uppercase tracking-widest text-qbf-gray">
              <div className="flex items-center gap-2">
                <User size={16} className="text-qbf-orange" />
                <span>Founder Name</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-qbf-orange" />
                <span>May 12, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-qbf-orange" />
                <span>8 min read</span>
              </div>
            </div>
          </header>

          <div className="aspect-[21/9] bg-qbf-divider rounded-[3rem] mb-16 overflow-hidden border border-qbf-divider relative">
            <div className="absolute inset-0 bg-qbf-orange/5"></div>
          </div>

          <div className="prose prose-xl prose-orange max-w-none text-qbf-gray space-y-8 leading-relaxed mb-16">
            <p className="font-bold text-qbf-black text-2xl leading-snug">
              For decades, the tiered loyalty program has been the undisputed king
              of customer engagement. Bronze, Silver, Gold — the formula was
              simple, and it worked. But is the era of tiers coming to an end?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <blockquote className="border-l-4 border-qbf-orange pl-8 py-4 my-12 italic text-3xl font-display font-bold text-qbf-black">
              "The modern consumer doesn't want to wait for 12 months to
              reach Gold status. They want value, and they want it now."
            </blockquote>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <div className="bg-qbf-orange/5 border border-qbf-orange/20 p-8 rounded-3xl my-12">
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4">Key Takeaways</h3>
              <ul className="space-y-4">
                <li>Immediate gratification is the new standard.</li>
                <li>Dynamic rewards are replacing static tiers.</li>
                <li>Community engagement is the ultimate loyalty lever.</li>
              </ul>
            </div>
            <p>
              In conclusion, the tiered model isn't necessarily "dead," but it is
              undergoing a radical transformation. Programs that fail to adapt to
              the need for immediate value and community connection will find
              themselves left behind.
            </p>
          </div>

          <footer className="pt-16 border-t border-qbf-divider flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
              {["Loyalty", "Strategy", "Trends"].map((tag) => (
                <span key={tag} className="text-xs font-bold uppercase tracking-widest text-qbf-gray bg-white border border-qbf-divider px-4 py-2 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-6 items-center">
              <span className="text-sm font-bold uppercase tracking-widest text-qbf-gray">Share:</span>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange hover:text-qbf-orange transition-all">
                  <Linkedin size={18} />
                </button>
                <button className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange hover:text-qbf-orange transition-all">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange hover:text-qbf-orange transition-all">
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
