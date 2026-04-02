import { Activity, Download, Users, FileText, ArrowUpRight, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Registrations", value: "1,248", icon: <Users size={24} />, change: "+12%" },
    { label: "Hub Downloads", value: "4,562", icon: <Download size={24} />, change: "+18%" },
    { label: "Page Views", value: "24.8k", icon: <Activity size={24} />, change: "+5%" },
    { label: "Blog Posts", value: "84", icon: <FileText size={24} />, change: "+2" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-qbf-divider hover:shadow-2xl hover:shadow-black/5 transition-all">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-qbf-orange-muted rounded-xl flex items-center justify-center text-qbf-orange border border-qbf-orange/20">
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-500 uppercase tracking-widest">
                {stat.change} <ArrowUpRight size={14} />
              </div>
            </div>
            <p className="text-3xl font-display font-black text-qbf-black mb-2">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-qbf-gray">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-12 rounded-[3rem] border border-qbf-divider">
          <h2 className="text-2xl font-display font-black mb-8">Recent Activity</h2>
          <div className="space-y-8">
            {[
              { user: "John Doe", action: "registered for Hub", time: "2m ago" },
              { user: "Jane Smith", action: "downloaded State of Loyalty 2024", time: "15m ago" },
              { user: "Mike Johnson", action: "contacted Support", time: "45m ago" },
              { user: "Sarah Brown", action: "registered for Workshop", time: "1h ago" },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-center p-4 rounded-2xl hover:bg-qbf-white transition-all cursor-pointer border border-transparent hover:border-qbf-divider">
                <div className="w-12 h-12 bg-qbf-divider rounded-full border border-qbf-divider"></div>
                <div className="flex-grow">
                  <p className="font-bold text-qbf-black">{item.user} <span className="font-medium text-qbf-gray">{item.action}</span></p>
                  <p className="text-xs font-medium text-qbf-gray">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3rem] border border-qbf-divider">
          <h2 className="text-2xl font-display font-black mb-8">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "New Post", icon: <FileText size={20} /> },
              { label: "New Event", icon: <Activity size={20} /> },
              { label: "New Case Study", icon: <LayoutDashboard size={20} /> },
              { label: "New User", icon: <Users size={20} /> },
            ].map((item, i) => (
              <button key={i} className="flex flex-col gap-6 items-center justify-center p-10 bg-qbf-black text-white rounded-[2rem] hover:bg-qbf-orange transition-all group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 group-hover:border-white/50 transition-all">
                  {item.icon}
                </div>
                <span className="font-bold text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
