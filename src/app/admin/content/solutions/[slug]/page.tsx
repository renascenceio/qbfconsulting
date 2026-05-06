import SolutionEditor from "@/components/admin/SolutionEditor";
import { findBy } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditSolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = findBy("solutions", "slug", slug);
  if (!solution) notFound();
  return <SolutionEditor mode="edit" initial={solution} />;
}
