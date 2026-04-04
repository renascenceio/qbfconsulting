import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const translations = readData("translations");
  return NextResponse.json(translations);
}

export async function POST(request: Request) {
  const newTranslations = await request.json();
  writeData("translations", newTranslations);
  return NextResponse.json({ success: true });
}
