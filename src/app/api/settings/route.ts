import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { revalidateAll } from "@/lib/revalidate";

const SETTINGS_KEY = "site";

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("settings")
    .select("data")
    .eq("key", SETTINGS_KEY)
    .maybeSingle();
  if (error) {
    console.error("[settings] read error:", error.message);
    return NextResponse.json({}, { status: 500 });
  }
  return NextResponse.json((data as any)?.data ?? {});
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const supabase = createServiceClient();
  const { data: existing } = await supabase
    .from("settings")
    .select("data")
    .eq("key", SETTINGS_KEY)
    .maybeSingle();
  const merged = {
    ...(((existing as any)?.data) || {}),
    ...body,
    updatedAt: new Date().toISOString(),
  };
  const { error } = await supabase
    .from("settings")
    .upsert(
      [{ key: SETTINGS_KEY, data: merged, updated_at: new Date().toISOString() }],
      { onConflict: "key" }
    );
  if (error) {
    console.error("[settings] write error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  revalidateAll();
  return NextResponse.json(merged);
}
