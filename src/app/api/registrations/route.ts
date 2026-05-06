import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const registrations = readData<any>("registrations");
  registrations.sort(
    (a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || "")
  );
  return NextResponse.json(registrations);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.kind || (body.kind !== "talent" && body.kind !== "company")) {
    return NextResponse.json(
      { error: "kind must be 'talent' or 'company'" },
      { status: 400 }
    );
  }

  const registrations = readData<any>("registrations");
  const newReg = {
    id: `r_${Date.now()}`,
    kind: body.kind,
    status: "Pending",
    data: body.data || {},
    createdAt: new Date().toISOString(),
  };
  registrations.push(newReg);
  writeData("registrations", registrations);
  return NextResponse.json(newReg);
}
