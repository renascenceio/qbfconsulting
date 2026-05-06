import { NextResponse } from "next/server";
import { readData, writeData, slugify } from "@/lib/db";

export async function GET() {
  const items = readData("case-studies");
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const items = readData("case-studies");

  const slug = body.slug?.trim() || slugify(body.title || "case-study");

  const next = {
    id: body.id || `cs-${Date.now()}`,
    slug,
    title: body.title || "Untitled",
    client: body.client || "",
    industry: body.industry || "",
    region: body.region || "",
    category: body.category || "Strategy",
    year: body.year || new Date().getFullYear().toString(),
    duration: body.duration || "",
    teamSize: body.teamSize || "",
    excerpt: body.excerpt || "",
    challenge: body.challenge || "",
    approach: body.approach || "",
    metrics: body.metrics || [],
    headlineMetric: body.headlineMetric || "",
    headlineMetricLabel: body.headlineMetricLabel || "",
    testimonial: body.testimonial || "",
    testimonialAuthor: body.testimonialAuthor || "",
    tags: body.tags || [],
    status: body.status || "Published",
    createdAt: new Date().toISOString(),
  };

  items.push(next);
  writeData("case-studies", items);

  return NextResponse.json(next);
}
