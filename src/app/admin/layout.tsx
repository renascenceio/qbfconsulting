import Link from "next/link";
import { LayoutDashboard, FileEdit, Users, Settings, LogOut, Search, Bell, Check } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-qbf-white text-qbf-black font-body">
      {/* Sidebar */}
      <aside className="w-80 bg-qbf-black text-white p-12 border-r border-white/5 flex flex-col h-screen sticky top-0">
        <Link href="/" className="inline-block mb-16">
          <span className="font-display text-4xl font-black">
            QBF<span className="text-qbf-orange">.</span>
          </span>
        </Link>

        <nav className="flex-grow space-y-2">
          {[
            { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin/dashboard" },
            { label: "Content Management", icon: <FileEdit size={20} />, href: "/admin/content/blog" },
            { label: "Review Queue", icon: <Check size={20} />, href: "/admin/registrations" },
            { label: "User Management", icon: <Users size={20} />, href: "/admin/users" },
            { label: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group font-bold text-lg"
            >
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-qbf-orange group-hover:text-qbf-orange transition-all">
                {item.icon}
              </div>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group font-bold text-lg mt-auto"
        >
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-red-500 group-hover:text-red-500 transition-all">
            <LogOut size={20} />
          </div>
          Logout
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-12 md:p-16">
        <header className="flex justify-between items-center mb-20">
          <div>
            <h1 className="text-3xl font-display font-black mb-2">Welcome Back, Admin</h1>
            <p className="text-qbf-gray font-medium">Here's what's happening today.</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-sm focus:outline-none focus:border-qbf-orange transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={18} />
            </div>
            <button className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all relative">
              <Bell size={20} className="text-qbf-gray" />
              <div className="absolute top-2 right-2 w-3 h-3 bg-qbf-orange rounded-full border-2 border-white"></div>
            </button>
            <div className="w-12 h-12 bg-qbf-black rounded-full border border-qbf-divider"></div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
