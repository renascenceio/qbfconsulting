import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { revalidateAll } from "@/lib/revalidate";

/**
 * The /api/translations contract returns/accepts a flat object:
 *   { en: { key1: "...", key2: "..." }, ar: {...}, hi: {...} }
 *
 * Internally each locale is one row in `translations` (locale text PK + data jsonb).
 */
export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("translations")
    .select("locale, data");
  if (error) {
    console.error("[translations] read error:", error.message);
    return NextResponse.json({}, { status: 500 });
  }
  const out: Record<string, unknown> = {};
  for (const row of (data as any[]) || []) {
    out[row.locale] = row.data;
  }
  return NextResponse.json(out);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const supabase = createServiceClient();
  const rows = Object.entries(body as Record<string, unknown>).map(
    ([locale, dict]) => ({
      locale,
      data: dict,
      updated_at: new Date().toISOString(),
    })
  );
  if (rows.length === 0) return NextResponse.json({ success: true });
  const { error } = await supabase
    .from("translations")
    .upsert(rows, { onConflict: "locale" });
  if (error) {
    console.error("[translations] write error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  revalidateAll();
  return NextResponse.json({ success: true });
}
