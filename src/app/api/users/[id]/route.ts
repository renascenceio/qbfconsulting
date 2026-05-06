import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const ALLOWED_ROLES = ["Super Admin", "Admin", "Editor", "Author"];
const ALLOWED_STATUSES = ["Active", "Suspended"];

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, status, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    createdAt: data.created_at,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const update: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (typeof body.name === "string") update.name = body.name;
  if (typeof body.email === "string") update.email = body.email.trim().toLowerCase();
  if (ALLOWED_ROLES.includes(body.role)) update.role = body.role;
  if (ALLOWED_STATUSES.includes(body.status)) update.status = body.status;

  const supabase = createServiceClient();

  // If email or password changed, sync to auth.users via the admin API
  const authUpdate: Record<string, unknown> = {};
  if (typeof update.email === "string") authUpdate.email = update.email;
  if (typeof body.password === "string" && body.password.length >= 8) {
    authUpdate.password = body.password;
  }
  if (Object.keys(authUpdate).length > 0) {
    const { error: authErr } = await supabase.auth.admin.updateUserById(
      id,
      authUpdate
    );
    if (authErr) {
      return NextResponse.json({ error: authErr.message }, { status: 400 });
    }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", id)
    .select("id, name, email, role, status, created_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    createdAt: data.created_at,
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServiceClient();

  // Check the target isn't the last Super Admin, just to avoid lockout
  const { data: target } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id)
    .maybeSingle();

  if (target?.role === "Super Admin") {
    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "Super Admin");
    if ((count || 0) <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last Super Admin" },
        { status: 400 }
      );
    }
  }

  // Delete from auth — cascade removes the profile row
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
