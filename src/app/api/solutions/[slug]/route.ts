import { NextResponse } from "next/server";
import { findBy, upsertBy, deleteBy } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBy("solutions", "slug", slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  const updated = upsertBy("solutions", "slug", slug, { ...body, slug });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ok = deleteBy("solutions", "slug", slug);
  return NextResponse.json({ ok });
}
