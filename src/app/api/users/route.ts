import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const users = readData("users");
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const users = readData<any>("users");

  if (users.some((u) => u.email?.toLowerCase() === (body.email || "").toLowerCase())) {
    return NextResponse.json(
      { error: "A user with that email already exists." },
      { status: 409 }
    );
  }

  const newUser = {
    id: body.id || `u_${Date.now()}`,
    name: body.name || "Untitled User",
    email: body.email || "",
    role: body.role || "Author",
    status: body.status || "Active",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeData("users", users);

  return NextResponse.json(newUser);
}
