import { findBy } from "@/lib/db";
import { notFound } from "next/navigation";
import { PageEditor, type PageContent } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await findBy<PageContent>("pages", "slug", slug);
  if (!page) return notFound();
  return <PageEditor initial={page} />;
}
