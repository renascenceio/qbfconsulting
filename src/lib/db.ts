/**
 * Async data access layer backed by Supabase.
 * Each entity table is shaped as (key text PK, data jsonb, updated_at timestamptz).
 * The `data` column stores the original JSON shape so callers continue to read
 * fields like `slug`, `title`, `heroTitle`, etc. unchanged.
 */
import { createServiceClient } from "@/lib/supabase/server";

// Logical entity name (passed by callers) -> { table, primary key column }.
const ENTITIES: Record<string, { table: string; key: string }> = {
  posts: { table: "posts", key: "slug" },
  "case-studies": { table: "case_studies", key: "slug" },
  case_studies: { table: "case_studies", key: "slug" },
  solutions: { table: "solutions", key: "slug" },
  events: { table: "events", key: "slug" },
  pages: { table: "pages", key: "slug" },
  careers: { table: "careers", key: "slug" },
  products: { table: "products", key: "slug" },
  registrations: { table: "registrations", key: "id" },
  settings: { table: "settings", key: "key" },
  translations: { table: "translations", key: "locale" },
};

function resolve(entity: string) {
  const e = ENTITIES[entity];
  if (!e) throw new Error(`Unknown entity: ${entity}`);
  return e;
}

export function slugify(str: string): string {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function readData<T = any>(entity: string): Promise<T[]> {
  const { table } = resolve(entity);
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(table)
    .select("data")
    .order("updated_at", { ascending: false });
  if (error) {
    console.error(`[db] readData(${entity}) error:`, error.message);
    return [];
  }
  return (data || []).map((r: any) => r.data as T);
}

export async function writeData<T = any>(
  entity: string,
  items: T[]
): Promise<void> {
  const { table, key } = resolve(entity);
  const supabase = createServiceClient();
  const rows = (items as any[]).map((item) => ({
    [key]: String(item[key]),
    data: item,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: key });
  if (error) {
    console.error(`[db] writeData(${entity}) error:`, error.message);
    throw new Error(error.message);
  }
}

export async function findBy<T extends Record<string, any> = any>(
  entity: string,
  field: string | keyof T,
  value: any
): Promise<T | null> {
  const { table, key } = resolve(entity);
  const supabase = createServiceClient();
  const fieldStr = String(field);
  if (fieldStr === key) {
    const { data, error } = await supabase
      .from(table)
      .select("data")
      .eq(key, String(value))
      .maybeSingle();
    if (error || !data) return null;
    return (data as any).data as T;
  }
  const { data, error } = await supabase
    .from(table)
    .select("data")
    .eq(`data->>${fieldStr}`, String(value))
    .maybeSingle();
  if (error || !data) return null;
  return (data as any).data as T;
}

export async function upsertBy<T extends Record<string, any> = any>(
  entity: string,
  field: string | keyof T,
  value: any,
  next: T
): Promise<T> {
  const { table, key } = resolve(entity);
  const supabase = createServiceClient();
  const fieldStr = String(field);
  // Always normalise the row's primary key to the value supplied (or fall back to next[key])
  const id =
    fieldStr === key ? String(value ?? (next as any)[key]) : String((next as any)[key]);
  const merged: any = { ...(next as any), [key]: id };
  const { error } = await supabase
    .from(table)
    .upsert(
      [{ [key]: id, data: merged, updated_at: new Date().toISOString() }],
      { onConflict: key }
    );
  if (error) {
    console.error(`[db] upsertBy(${entity}) error:`, error.message);
    throw new Error(error.message);
  }
  return merged as T;
}

export async function deleteBy(
  entity: string,
  field: string,
  value: any
): Promise<boolean> {
  const { table, key } = resolve(entity);
  const supabase = createServiceClient();
  const target = field === key ? key : `data->>${field}`;
  const { error } = await supabase
    .from(table)
    .delete()
    .eq(target, String(value));
  if (error) {
    console.error(`[db] deleteBy(${entity}) error:`, error.message);
    return false;
  }
  return true;
}
