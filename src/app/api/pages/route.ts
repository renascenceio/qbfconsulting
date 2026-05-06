import { NextResponse } from "next/server";
import { readData } from "@/lib/db";

export async function GET() {
  const items = readData("pages");
  return NextResponse.json(items);
}
