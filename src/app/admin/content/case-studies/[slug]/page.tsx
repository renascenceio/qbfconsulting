import CaseStudyEditor from "@/components/admin/CaseStudyEditor";
import { findBy } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = findBy("case-studies", "slug", slug);
  if (!study) notFound();
  return <CaseStudyEditor mode="edit" initial={study} />;
}
