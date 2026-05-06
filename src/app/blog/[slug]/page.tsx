import { notFound } from "next/navigation";
import { findBy, readData } from "@/lib/db";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Linkedin,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";

interface Post {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  author?: string;
  excerpt?: string;
  content?: string;
  status?: string;
  readTime?: string;
  date?: string;
  tags?: string[];
  createdAt?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findBy<Post>("posts", "slug", slug);
  if (!post) {
    return {
      title: "Article not found | QBF Consulting Journal",
    };
  }
  return {
    title: `${post.title} | QBF Consulting Journal`,
    description:
      post.excerpt ||
      `Insights and analysis from QBF Consulting on ${post.category || "loyalty"}.`,
  };
}

function paragraphs(content?: string): string[] {
  if (!content) return [];
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findBy<Post>("posts", "slug", slug);

  if (!post || (post.status || "").toLowerCase() === "draft") {
    notFound();
  }

  const all = readData<Post>("posts");
  const related = all
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.status || "").toLowerCase() !== "draft" &&
        p.category === post.category
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author || "QBF Consulting",
    },
    publisher: {
      "@type": "Organization",
      name: "QBF Consulting",
    },
    datePublished: post.createdAt || post.date,
  };

  const body = paragraphs(post.content);

  return (
    <article className="bg-qbf-white min-h-screen pt-32 pb-24">
      <SchemaMarkup data={jsonLd} />
      <div className="max-content">
        <Link
          href="/blog"
          className="text-qbf-orange font-bold text-sm flex items-center gap-2 mb-12 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            {post.category ? (
              <span className="bg-qbf-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">
                {post.category}
              </span>
            ) : null}
            <h1 className="text-4xl md:text-6xl font-display font-black text-qbf-black mb-12 leading-tight text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-8 items-center border-y border-qbf-divider py-8 text-sm font-bold uppercase tracking-widest text-qbf-gray">
              {post.author ? (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-qbf-orange" />
                  <span>{post.author}</span>
                </div>
              ) : null}
              {post.date ? (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-qbf-orange" />
                  <span>{post.date}</span>
                </div>
              ) : null}
              {post.readTime ? (
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-qbf-orange" />
                  <span>{post.readTime}</span>
                </div>
              ) : null}
            </div>
          </header>

          {post.excerpt ? (
            <p className="font-bold text-qbf-black text-2xl leading-snug mb-12">
              {post.excerpt}
            </p>
          ) : null}

          <div className="prose prose-xl prose-orange max-w-none text-qbf-gray space-y-8 leading-relaxed mb-16">
            {body.length > 0 ? (
              body.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p className="text-qbf-gray italic">No content yet.</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 ? (
            <footer className="pt-16 border-t border-qbf-divider flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold uppercase tracking-widest text-qbf-gray bg-white border border-qbf-divider px-4 py-2 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-6 items-center">
                <span className="text-sm font-bold uppercase tracking-widest text-qbf-gray">
                  Share:
                </span>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange hover:text-qbf-orange transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange hover:text-qbf-orange transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-white border border-qbf-divider rounded-full flex items-center justify-center hover:border-qbf-orange hover:text-qbf-orange transition-all"
                    aria-label="Copy link"
                  >
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>
            </footer>
          ) : null}

          {related.length > 0 ? (
            <section className="mt-24 pt-16 border-t border-qbf-divider">
              <h2 className="text-3xl font-display font-black mb-10">
                More from the Journal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block group"
                  >
                    <div className="aspect-video bg-qbf-divider rounded-2xl mb-5 border border-qbf-divider relative overflow-hidden">
                      <div className="absolute inset-0 bg-qbf-orange/5 group-hover:bg-qbf-orange/10 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur text-qbf-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-qbf-divider">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-qbf-gray mb-2 font-bold uppercase tracking-widest">
                      {p.date}
                    </p>
                    <h3 className="text-xl font-display font-bold text-qbf-black leading-tight group-hover:text-qbf-orange transition-colors">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
