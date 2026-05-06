import { notFound } from "next/navigation";
import EventEditor from "@/components/admin/EventEditor";
import { findBy } from "@/lib/db";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await findBy<any>("events", "slug", slug);
  if (!event) return notFound();
  return <EventEditor mode="edit" initial={event} />;
}
