import { NextResponse } from "next/server";
import { readData, upsertBy } from "@/lib/db";

export async function GET() {
  const registrations = await readData<any>("registrations");
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

  const newReg = {
    id: `r_${Date.now()}`,
    kind: body.kind,
    status: "Pending",
    data: body.data || {},
    createdAt: new Date().toISOString(),
  };
  await upsertBy("registrations", "id", newReg.id, newReg);
  return NextResponse.json(newReg);
}
