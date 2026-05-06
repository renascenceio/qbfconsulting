import { NextResponse } from "next/server";
import { findBy, upsertBy, deleteBy } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = findBy("registrations", "id", id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const existing = findBy<any>("registrations", "id", id);
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = upsertBy("registrations", "id", id, {
    ...existing,
    ...body,
    id,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = deleteBy("registrations", "id", id);
  return NextResponse.json({ ok });
}
