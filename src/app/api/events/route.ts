import { NextResponse } from "next/server";
import { readData, upsertBy, slugify } from "@/lib/db";

export async function GET() {
  const items = await readData("events");
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const items = await readData<any>("events");

  const baseSlug = body.slug ? slugify(body.slug) : slugify(body.title || "event");
  let slug = baseSlug;
  let n = 1;
  while (items.some((it) => it.slug === slug)) {
    slug = `${baseSlug}-${++n}`;
  }

  const id = body.id || `evt-${Date.now()}`;
  const event = {
    id,
    slug,
    title: body.title || "Untitled Event",
    category: body.category || "Workshop",
    type: body.type || body.category || "Workshop",
    tagline: body.tagline || "",
    description: body.description || "",
    format: body.format || "In-person",
    location: body.location || "",
    venue: body.venue || "",
    startDate: body.startDate || "",
    endDate: body.endDate || body.startDate || "",
    time: body.time || "",
    duration: body.duration || "",
    capacity: body.capacity || 0,
    seatsLeft: body.seatsLeft || 0,
    price: body.price || "",
    registrationUrl: body.registrationUrl || "/contact",
    speakers: body.speakers || [],
    agenda: body.agenda || [],
    tags: body.tags || [],
    status: body.status || "Upcoming",
    featured: !!body.featured,
    createdAt: new Date().toISOString(),
  };

  await upsertBy("events", "slug", slug, event);
  return NextResponse.json(event, { status: 201 });
}
