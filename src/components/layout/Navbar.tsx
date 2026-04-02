"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Hub", href: "/hub" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-qbf-white/80 backdrop-blur-md border-qbf-divider py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-content flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center">
            <span className="font-display text-2xl font-bold text-qbf-black">
              QBF<span className="text-qbf-orange">.</span>
            </span>
          </Link>

          <Link
            href="/search"
            className="hidden lg:flex items-center gap-3 text-qbf-gray hover:text-qbf-orange transition-colors group"
          >
            <div className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-full flex items-center justify-center group-hover:border-qbf-orange transition-all">
              <Search size={18} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Search</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-qbf-orange",
                pathname.startsWith(link.href)
                  ? "text-qbf-orange"
                  : "text-qbf-gray"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 text-qbf-gray font-bold text-xs uppercase tracking-widest cursor-pointer hover:text-qbf-orange transition-colors">
            <Globe size={16} /> EN
          </div>
          <Link
            href="/contact"
            className="bg-qbf-orange text-white px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Talk to Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-qbf-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-qbf-white border-b border-qbf-divider overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium",
                    pathname.startsWith(link.href)
                      ? "text-qbf-orange"
                      : "text-qbf-black"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-qbf-orange text-white text-center px-5 py-3 rounded-xl font-bold"
              >
                Talk to Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
