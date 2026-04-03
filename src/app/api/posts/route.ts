import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const posts = readData("posts");
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const post = await request.json();
  const posts = readData("posts");

  const newPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  writeData("posts", posts);

  return NextResponse.json(newPost);
}
