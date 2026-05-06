import { NextResponse } from "next/server";
import { findBy, upsertBy, deleteBy } from "@/lib/db";
import { revalidateCollection } from "@/lib/revalidate";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await findBy("solutions", "slug", slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  const updated = await upsertBy("solutions", "slug", slug, { ...body, slug });
  revalidateCollection("solutions", slug);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = await deleteBy("solutions", "slug", slug);
  revalidateCollection("solutions", slug);
  return NextResponse.json({ ok });
}
