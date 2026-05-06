import { notFound } from "next/navigation";
import { findBy } from "@/lib/db";
import { CareerEditor } from "@/components/admin/CareerEditor";

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = findBy<any>("careers", "slug", slug);
  if (!job) notFound();

  return (
    <CareerEditor
      mode="edit"
      initial={{
        id: job.id,
        slug: job.slug,
        title: job.title || "",
        department: job.department || "Strategy",
        location: job.location || "",
        type: job.type || "Full-time",
        description: job.description || "",
        status: job.status || "Active",
        date: job.date || "",
      }}
    />
  );
}
