import Link from "next/link";
import { readData } from "@/lib/db";

interface Post {
  slug: string;
  title: string;
  category?: string;
  date?: string;
  excerpt?: string;
  status?: "draft" | "published";
  publishedAt?: string;
}

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const LatestJournal = async () => {
  const all = readData<Post>("posts");
  const posts = all
    .filter((p) => (p.status || "").toLowerCase() !== "draft")
    .sort((a, b) => {
      const da = new Date(a.publishedAt || a.date || 0).getTime();
      const db = new Date(b.publishedAt || b.date || 0).getTime();
      return db - da;
    })
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-qbf-white border-t border-qbf-divider">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6 text-balance">
              Latest from <br /> the Journal.
            </h2>
            <p className="text-xl text-qbf-gray">
              Insights, analysis, and strategic advice from our experts.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-qbf-orange font-bold text-sm hover:underline"
          >
            Read All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group cursor-pointer block"
            >
              <div className="aspect-video bg-qbf-divider rounded-2xl mb-6 overflow-hidden relative border border-qbf-divider transition-transform duration-300 group-hover:scale-[1.01]">
                <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors"></div>
                {post.category ? (
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-white/90 backdrop-blur text-qbf-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-qbf-divider">
                      {post.category}
                    </span>
                  </div>
                ) : null}
              </div>
              <p className="text-xs text-qbf-gray mb-3 font-medium uppercase tracking-wider">
                {formatDate(post.publishedAt || post.date)}
              </p>
              <h3 className="text-2xl font-display font-bold text-qbf-black mb-4 leading-tight group-hover:text-qbf-orange transition-colors text-balance">
                {post.title}
              </h3>
              <p className="text-qbf-gray mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <span className="text-qbf-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Article <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
