import { NextResponse } from "next/server";
import { readData, writeData, slugify } from "@/lib/db";

export async function GET() {
  const careers = readData("careers");
  return NextResponse.json(careers);
}

export async function POST(request: Request) {
  const job = await request.json();
  const careers = readData<any>("careers");

  const slug = job.slug?.trim() || slugify(job.title || "untitled-role");

  const newJob = {
    ...job,
    id: job.id || `c_${Date.now()}`,
    slug,
    createdAt: new Date().toISOString(),
  };

  careers.push(newJob);
  writeData("careers", careers);

  return NextResponse.json(newJob);
}
