import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const careers = readData("careers");
  return NextResponse.json(careers);
}

export async function POST(request: Request) {
  const job = await request.json();
  const careers = readData("careers");

  const newJob = {
    ...job,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  careers.push(newJob);
  writeData("careers", careers);

  return NextResponse.json(newJob);
}
