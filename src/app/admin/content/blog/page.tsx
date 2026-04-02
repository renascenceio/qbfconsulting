import { Search, Filter, MoreVertical, Edit2, Trash2, Eye, Plus } from "lucide-react";

export default function BlogManagementPage() {
  const posts = [
    { title: "The Death of the Tiered Program?", status: "Published", author: "Founder Name", date: "May 12, 2024", views: "1.2k" },
    { title: "Loyalty Tech Selection Guide", status: "Draft", author: "Founder Name", date: "April 28, 2024", views: "0" },
    { title: "The Psychology of Points", status: "Published", author: "Founder Name", date: "April 15, 2024", views: "850" },
    { title: "Personalization in Loyalty", status: "Scheduled", author: "Founder Name", date: "June 20, 2024", views: "0" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-display font-black">Blog Posts</h2>
        <button className="bg-qbf-orange text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-qbf-orange/20">
          <Plus size={24} /> New Post
        </button>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-4">
          {["All", "Published", "Draft", "Scheduled"].map((f) => (
            <button key={f} className="px-6 py-2 rounded-full border border-qbf-divider font-bold text-sm hover:border-qbf-orange hover:text-qbf-orange transition-all">
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Filter by title..."
              className="w-full bg-white border border-qbf-divider px-10 py-3 rounded-full text-sm focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={16} />
          </div>
          <button className="w-12 h-12 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange transition-all">
            <Filter size={18} className="text-qbf-gray" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-qbf-divider rounded-[3rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-qbf-white border-b border-qbf-divider">
            <tr className="text-xs font-bold uppercase tracking-widest text-qbf-gray">
              <th className="p-10">Title</th>
              <th className="p-10">Status</th>
              <th className="p-10">Author</th>
              <th className="p-10">Date</th>
              <th className="p-10">Views</th>
              <th className="p-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-qbf-divider">
            {posts.map((post, i) => (
              <tr key={i} className="hover:bg-qbf-white/50 transition-all group">
                <td className="p-10 font-bold text-qbf-black text-lg max-w-sm leading-snug">{post.title}</td>
                <td className="p-10">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full ${
                    post.status === "Published" ? "bg-green-100 text-green-600" :
                    post.status === "Draft" ? "bg-gray-100 text-gray-500" :
                    "bg-orange-100 text-qbf-orange"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-10 text-qbf-gray font-bold text-sm uppercase tracking-widest">{post.author}</td>
                <td className="p-10 text-qbf-gray font-bold text-sm uppercase tracking-widest">{post.date}</td>
                <td className="p-10 font-black text-qbf-black text-xl">{post.views}</td>
                <td className="p-10 text-right">
                  <div className="flex gap-4 justify-end">
                    <button className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-orange hover:text-white hover:border-qbf-orange transition-all">
                      <Eye size={18} />
                    </button>
                    <button className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-qbf-black hover:text-white hover:border-qbf-black transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button className="w-10 h-10 bg-qbf-white border border-qbf-divider rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
