import { NextResponse } from "next/server";
import { readData, upsertBy, slugify } from "@/lib/db";

export async function GET() {
  const careers = await readData("careers");
  return NextResponse.json(careers);
}

export async function POST(request: Request) {
  const job = await request.json();

  const slug = job.slug?.trim() || slugify(job.title || "untitled-role");

  const newJob = {
    ...job,
    id: job.id || `c_${Date.now()}`,
    slug,
    createdAt: new Date().toISOString(),
  };

  await upsertBy("careers", "slug", slug, newJob);

  return NextResponse.json(newJob);
}
