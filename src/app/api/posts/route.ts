import { NextResponse } from "next/server";
import { readData, upsertBy, slugify } from "@/lib/db";
import { revalidateCollection } from "@/lib/revalidate";

export async function GET() {
  const posts = await readData<any>("posts");
  posts.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const post = await request.json();

  const slug = post.slug?.trim() || slugify(post.title || "untitled");

  const newPost = {
    ...post,
    id: post.id || Date.now().toString(),
    slug,
    createdAt: new Date().toISOString(),
  };

  await upsertBy("posts", "slug", slug, newPost);
  revalidateCollection("posts", slug);

  return NextResponse.json(newPost);
}
