import { NextResponse } from "next/server";
import { readData, writeData, slugify } from "@/lib/db";

export async function GET() {
  const items = readData("solutions");
  items.sort((a: any, b: any) => (a.order || 99) - (b.order || 99));
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const items = readData("solutions");

  const slug = body.slug?.trim() || slugify(body.title || "solution");

  const next = {
    id: body.id || `sol-${Date.now()}`,
    slug,
    title: body.title || "Untitled",
    category: body.category || "Strategy",
    icon: body.icon || "sparkles",
    tagline: body.tagline || "",
    valueProp: body.valueProp || "",
    covers: body.covers || [],
    deliverables: body.deliverables || [],
    duration: body.duration || "",
    format: body.format || "",
    pricing: body.pricing || "Enquire for pricing",
    ctaTitle: body.ctaTitle || "Ready to get started?",
    status: body.status || "Published",
    order: body.order ?? items.length + 1,
    createdAt: new Date().toISOString(),
  };

  items.push(next);
  writeData("solutions", items);

  return NextResponse.json(next);
}
