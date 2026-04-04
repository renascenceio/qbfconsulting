"use client";

import Link from "next/link";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="bg-qbf-black text-qbf-white border-t border-white/10 pt-16 pb-8">
      <div className="max-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold">
                QBF<span className="text-qbf-orange">.</span>
              </span>
            </Link>
            <p className="text-qbf-gray max-w-sm mb-8 leading-relaxed">
              {t("footer_tagline")}
            </p>
            <div className="flex gap-4">
              <Link href="https://linkedin.com" target="_blank" className="hover:text-qbf-orange transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-qbf-orange transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:hello@qbfconsulting.com" className="hover:text-qbf-orange transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-qbf-gray hover:text-qbf-orange transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-qbf-gray hover:text-qbf-orange transition-colors">Services</Link></li>
              <li><Link href="/solutions" className="text-qbf-gray hover:text-qbf-orange transition-colors">Solutions</Link></li>
              <li><Link href="/case-studies" className="text-qbf-gray hover:text-qbf-orange transition-colors">Case Studies</Link></li>
              <li><Link href="/hub" className="text-qbf-gray hover:text-qbf-orange transition-colors">Loyalty Hub</Link></li>
              <li><Link href="/careers" className="text-qbf-gray hover:text-qbf-orange transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Subscribe</h4>
            <p className="text-qbf-gray text-sm mb-4">Stay updated with loyalty trends.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-l-lg text-sm w-full focus:outline-none focus:border-qbf-orange"
              />
              <button className="bg-qbf-orange text-white px-4 py-2.5 rounded-r-lg text-sm font-bold hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-qbf-gray gap-4">
          <p>© {currentYear} QBF Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-qbf-white transition-colors">Admin Login</Link>
            <Link href="/legal" className="hover:text-qbf-white transition-colors">Privacy Policy</Link>
            <Link href="/legal" className="hover:text-qbf-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
