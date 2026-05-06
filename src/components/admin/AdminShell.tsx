"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileEdit,
  Users,
  Settings,
  LogOut,
  Briefcase,
  Layout,
  Globe,
  FileStack,
  Lightbulb,
  Trophy,
  Calendar,
  Info,
  Check,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Pages", icon: FileStack, href: "/admin/content/pages" },
  { label: "About", icon: Info, href: "/admin/content/about" },
  { label: "Solutions", icon: Lightbulb, href: "/admin/content/solutions" },
  { label: "Case Studies", icon: Trophy, href: "/admin/content/case-studies" },
  { label: "Events", icon: Calendar, href: "/admin/content/events" },
  { label: "Blog Posts", icon: FileEdit, href: "/admin/content/blog" },
  { label: "Careers", icon: Briefcase, href: "/admin/content/careers" },
  { label: "Products", icon: Layout, href: "/admin/content/products" },
  { label: "Translations", icon: Globe, href: "/admin/content/translations" },
  { label: "Review Queue", icon: Check, href: "/admin/registrations" },
  { label: "User Management", icon: Users, href: "/admin/users" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/admin/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex min-h-screen bg-qbf-white text-qbf-black font-body">
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-qbf-black text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
        <Link href="/admin/dashboard" className="font-display text-2xl font-black">
          QBF<span className="text-qbf-orange">.</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-qbf-black text-white flex flex-col border-r border-white/5",
          // Desktop
          "lg:w-64 lg:sticky lg:top-0 lg:h-screen lg:flex",
          // Mobile drawer
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 lg:transform-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="font-display text-3xl font-black">
            QBF<span className="text-qbf-orange">.</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-grow overflow-y-auto px-3 py-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  active
                    ? "bg-qbf-orange text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={16} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/70 hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-hidden
        />
      )}

      {/* Main */}
      <main className="flex-grow min-w-0 pt-16 lg:pt-0">
        <div className="px-5 sm:px-8 lg:px-10 py-8 lg:py-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
