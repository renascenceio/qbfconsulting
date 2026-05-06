/**
 * One-time seed: copy data/*.json into Supabase using the service role key.
 * Run with:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/seed-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const ROOT = process.cwd();
const readJson = (name) =>
  JSON.parse(readFileSync(join(ROOT, "data", name), "utf8"));

const tables = [
  { table: "posts", file: "posts.json", key: "slug" },
  { table: "case_studies", file: "case-studies.json", key: "slug" },
  { table: "solutions", file: "solutions.json", key: "slug" },
  { table: "events", file: "events.json", key: "slug" },
  { table: "pages", file: "pages.json", key: "slug" },
  { table: "careers", file: "careers.json", key: "slug" },
  { table: "products", file: "products.json", key: "slug" },
  { table: "users", file: "users.json", key: "id" },
  { table: "registrations", file: "registrations.json", key: "id" },
];

for (const { table, file, key: pk } of tables) {
  const items = readJson(file);
  if (!Array.isArray(items) || items.length === 0) {
    console.log(`[skip] ${table} (empty or missing)`);
    continue;
  }
  const rows = items.map((item) => ({ [pk]: String(item[pk]), data: item }));
  const { error, count } = await supabase
    .from(table)
    .upsert(rows, { onConflict: pk, count: "exact" });
  if (error) {
    console.error(`[fail] ${table}:`, error.message);
    process.exit(1);
  }
  console.log(`[ok]   ${table}: ${count ?? rows.length} rows`);
}

// settings.json is a single object, not an array.
{
  const obj = readJson("settings.json");
  const { error } = await supabase
    .from("settings")
    .upsert([{ key: "site", data: obj }], { onConflict: "key" });
  if (error) {
    console.error("[fail] settings:", error.message);
    process.exit(1);
  }
  console.log("[ok]   settings: 1 row");
}

// translations.json is { en: {...}, ar: {...}, hi: {...} }
{
  const all = readJson("translations.json");
  const rows = Object.entries(all).map(([locale, data]) => ({
    locale,
    data,
  }));
  const { error } = await supabase
    .from("translations")
    .upsert(rows, { onConflict: "locale" });
  if (error) {
    console.error("[fail] translations:", error.message);
    process.exit(1);
  }
  console.log(`[ok]   translations: ${rows.length} rows`);
}

console.log("Done.");
