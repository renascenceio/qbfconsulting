import { NextResponse } from "next/server";
import { readData, writeData, slugify } from "@/lib/db";

export async function GET() {
  const posts = readData("posts");
  posts.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const post = await request.json();
  const posts = readData("posts");

  const slug = post.slug?.trim() || slugify(post.title || "untitled");

  const newPost = {
    ...post,
    id: post.id || Date.now().toString(),
    slug,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  writeData("posts", posts);

  return NextResponse.json(newPost);
}
