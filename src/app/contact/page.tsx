import type { Metadata } from "next";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { findBy } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "contact");
  return {
    title: page?.seoTitle || "Contact | QBF Consulting",
    description: page?.seoDescription || "Get in touch with QBF Consulting.",
  };
}

export default async function ContactPage() {
  const page: any = (await findBy("pages", "slug", "contact")) || {};
  const heroTitle = page.heroTitle || "Talk to Us.";
  const heroSubtitle =
    page.heroSubtitle ||
    "Ready to build a loyalty program that works? We'd love to hear from you.";

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight text-balance">
            {heroTitle}
          </h1>
          <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl text-pretty">
            {heroSubtitle}
          </p>
          {page.intro ? (
            <p className="mt-6 text-base md:text-lg text-qbf-gray/90 leading-relaxed max-w-2xl">
              {page.intro}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-qbf-gray">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white border border-qbf-divider px-6 py-4 rounded-xl text-lg focus:outline-none focus:border-qbf-orange focus:ring-1 focus:ring-qbf-orange transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-qbf-gray">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-white border border-qbf-divider px-6 py-4 rounded-xl text-lg focus:outline-none focus:border-qbf-orange focus:ring-1 focus:ring-qbf-orange transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-bold uppercase tracking-widest text-qbf-gray">Company</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company"
                    className="w-full bg-white border border-qbf-divider px-6 py-4 rounded-xl text-lg focus:outline-none focus:border-qbf-orange focus:ring-1 focus:ring-qbf-orange transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-bold uppercase tracking-widest text-qbf-gray">Enquiry Type</label>
                  <select
                    id="type"
                    className="w-full bg-white border border-qbf-divider px-6 py-4 rounded-xl text-lg focus:outline-none focus:border-qbf-orange focus:ring-1 focus:ring-qbf-orange transition-all appearance-none"
                  >
                    <option value="">Select type</option>
                    <option value="strategy">Strategy</option>
                    <option value="implementation">Implementation</option>
                    <option value="management">Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-qbf-gray">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Your message"
                  className="w-full bg-white border border-qbf-divider px-6 py-4 rounded-xl text-lg focus:outline-none focus:border-qbf-orange focus:ring-1 focus:ring-qbf-orange transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-opacity w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-qbf-black text-white p-12 md:p-16 rounded-[3rem] sticky top-32">
            <h2 className="text-3xl font-display font-black mb-12">Contact Info</h2>
            <div className="space-y-8 mb-16">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="text-qbf-orange" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-qbf-gray mb-1">Email</p>
                  <p className="text-xl font-bold">hello@qbfconsulting.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="text-qbf-orange" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-qbf-gray mb-1">Phone</p>
                  <p className="text-xl font-bold">+44 (0) 20 1234 5678</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="text-qbf-orange" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-qbf-gray mb-1">Office</p>
                  <p className="text-xl font-bold">London, United Kingdom</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:border-qbf-orange transition-colors cursor-pointer">
                <Linkedin size={20} />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:border-qbf-orange transition-colors cursor-pointer">
                <Twitter size={20} />
              </div>
            </div>

            <p className="mt-12 text-sm text-qbf-gray font-medium">
              Response time: We usually reply within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
