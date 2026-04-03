import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, MapPin, Share2, Linkedin, Twitter, Link as LinkIcon, User } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | QBF Consulting Events`,
    description: `Join us for the ${params.slug.replace(/-/g, ' ')} workshop and level up your loyalty expertise.`,
  };
}

export default function EventItemPage({ params }: { params: { slug: string } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "The CLMP Certification Workshop",
    "startDate": "2024-06-24T09:00",
    "endDate": "2024-06-24T17:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "London Center",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "UK"
      }
    },
    "image": ["https://qbfconsulting.com/event-banner.jpg"],
    "description": "The premier certification for loyalty practitioners worldwide.",
    "organizer": {
      "@type": "Organization",
      "name": "QBF Consulting",
      "url": "https://qbfconsulting.com"
    }
  };

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <SchemaMarkup data={jsonLd} />
      <div className="max-content">
        <Link
          href="/events"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <span className="bg-qbf-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">
              Workshop
            </span>
            <h1 className="text-4xl md:text-7xl font-display font-black text-qbf-black mb-12 leading-tight">
              The CLMP Certification <br /> Workshop
            </h1>
            <div className="flex flex-wrap gap-8 items-center border-y border-qbf-divider py-10 text-sm font-bold uppercase tracking-widest text-qbf-gray">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-qbf-orange" />
                <span>Jun 24, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-qbf-orange" />
                <span>09:00 AM - 05:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-qbf-orange" />
                <span>London, UK</span>
              </div>
            </div>
          </header>

          <div className="aspect-video bg-qbf-divider rounded-[3rem] mb-16 overflow-hidden border border-qbf-divider relative">
            <div className="absolute inset-0 bg-qbf-orange/5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-display font-black text-qbf-black mb-6">About the Event</h2>
                <div className="prose prose-xl text-qbf-gray leading-relaxed space-y-6">
                  <p>
                    The Certified Loyalty Marketing Professional™ (CLMP)
                    workshop is the premier certification for loyalty
                    practitioners worldwide. This intensive program covers the
                    entire loyalty marketing lifecycle.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-display font-black text-qbf-black mb-8">Schedule</h2>
                <div className="space-y-4">
                  {[
                    { time: "09:00 AM", title: "Introduction to Loyalty Strategy", speaker: "Founder Name" },
                    { time: "11:00 AM", title: "The Psychology of Points", speaker: "Guest Speaker" },
                    { time: "01:00 PM", title: "Lunch & Networking", speaker: "-" },
                    { time: "02:00 PM", title: "Implementation Best Practices", speaker: "Founder Name" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 p-6 bg-white border border-qbf-divider rounded-2xl">
                      <div className="text-sm font-black text-qbf-orange w-24 shrink-0">{item.time}</div>
                      <div>
                        <h4 className="text-lg font-bold text-qbf-black mb-1">{item.title}</h4>
                        <p className="text-sm text-qbf-gray font-medium">{item.speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-qbf-black text-white p-10 rounded-[2rem] sticky top-32">
                <h3 className="text-2xl font-display font-bold mb-8">Register Now</h3>
                <p className="text-qbf-gray text-sm mb-8">Limited seats available. Early bird pricing ends soon.</p>
                <div className="space-y-4">
                  <Link
                    href="https://registration-link.com"
                    className="bg-qbf-orange text-white block w-full text-center py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20"
                  >
                    Get Tickets
                  </Link>
                  <p className="text-center text-[10px] uppercase tracking-widest text-qbf-gray font-bold">Secure Checkout</p>
                </div>
              </div>

              <div className="p-8 bg-white border border-qbf-divider rounded-[2rem]">
                <h3 className="text-xl font-display font-bold text-qbf-black mb-6">Speakers</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-qbf-divider rounded-full border border-qbf-divider"></div>
                  <div>
                    <h4 className="text-sm font-bold text-qbf-black">Founder Name</h4>
                    <p className="text-xs text-qbf-gray">CEO, QBF Consulting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
