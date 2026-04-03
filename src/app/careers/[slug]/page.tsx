import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { ArrowLeft, Search, MapPin, Briefcase, Clock, Calendar } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | QBF Consulting Careers`,
    description: `Join QBF Consulting as a ${params.slug.replace(/-/g, ' ')}. Explore our open roles and build the future of loyalty.`,
  };
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Loyalty Strategist",
    "description": "We are looking for a passionate loyalty practitioner to join our growing team.",
    "datePosted": "2024-05-20",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "QBF Consulting",
      "sameAs": "https://qbfconsulting.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "UK"
      }
    }
  };

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <SchemaMarkup data={jsonLd} />
      <div className="max-content">
        <Link
          href="/careers"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Careers
        </Link>

        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <span className="bg-qbf-orange-muted text-qbf-orange text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">
              Strategy
            </span>
            <h1 className="text-4xl md:text-7xl font-display font-black text-qbf-black mb-12 leading-tight">
              Loyalty Strategist
            </h1>
            <div className="flex flex-wrap gap-8 items-center border-y border-qbf-divider py-10 text-sm font-bold uppercase tracking-widest text-qbf-gray">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-qbf-orange" />
                <span>London / Remote</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-qbf-orange" />
                <span>Full-time</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-qbf-orange" />
                <span>Posted May 20, 2024</span>
              </div>
            </div>
          </header>

          <div className="prose prose-xl text-qbf-gray space-y-12 leading-relaxed mb-20">
            <div>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-6">The Role</h2>
              <p>
                As a Loyalty Strategist at QBF Consulting, you will be
                responsible for designing and optimizing customer engagement
                programs for global brands. You will combine data-driven
                insights with behavioral science to build loyalty programs that
                deliver real value.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-6">Responsibilities</h2>
              <ul className="space-y-4">
                <li>Design end-to-end loyalty program roadmaps.</li>
                <li>Conduct behavioral mapping and customer segment analysis.</li>
                <li>Collaborate with tech teams for system implementation.</li>
                <li>Present strategic recommendations to C-level stakeholders.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black text-qbf-black mb-6">Requirements</h2>
              <ul className="space-y-4">
                <li>5+ years of experience in loyalty marketing or strategy.</li>
                <li>Deep understanding of loyalty mechanics and CRM systems.</li>
                <li>Excellent communication and presentation skills.</li>
                <li>Analytical mindset with a focus on business ROI.</li>
              </ul>
            </div>
          </div>

          <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] text-center">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-8">Ready to Apply?</h2>
            <p className="text-xl text-qbf-gray mb-12 max-w-2xl mx-auto leading-relaxed">
              Send your CV and a brief cover letter to our recruitment team.
            </p>
            <Link
              href="mailto:careers@qbfconsulting.com"
              className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-opacity inline-block shadow-xl shadow-qbf-orange/20"
            >
              Apply via Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
