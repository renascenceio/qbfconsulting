import { NextResponse } from "next/server";
import { readData } from "@/lib/db";

export async function GET() {
  const items = await readData("pages");
  return NextResponse.json(items);
}
