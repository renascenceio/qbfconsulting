import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "settings.json");

function readSettings(): Record<string, unknown> {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeSettings(data: Record<string, unknown>) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readSettings());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const current = readSettings();
  const next = { ...current, ...body, updatedAt: new Date().toISOString() };
  writeSettings(next);
  return NextResponse.json(next);
}
