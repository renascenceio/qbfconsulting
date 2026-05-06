import { notFound } from "next/navigation";
import { findBy } from "@/lib/db";
import { PostEditor } from "@/components/admin/PostEditor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await findBy<any>("posts", "slug", slug);
  if (!post) notFound();

  return (
    <PostEditor
      mode="edit"
      initial={{
        id: post.id,
        slug: post.slug,
        title: post.title || "",
        category: post.category || "Loyalty Strategy",
        author: post.author || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        status: post.status || "Draft",
        readTime: post.readTime || "",
        date: post.date || "",
        tags: post.tags || [],
      }}
    />
  );
}
