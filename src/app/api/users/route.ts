import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const ALLOWED_ROLES = ["Super Admin", "Admin", "Editor", "Author"] as const;
const ALLOWED_STATUSES = ["Active", "Suspended"] as const;

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, status, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    (data || []).map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      createdAt: u.created_at,
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();
  const name = (body.name || "").trim() || "Untitled User";
  const role = ALLOWED_ROLES.includes(body.role) ? body.role : "Author";
  const status = ALLOWED_STATUSES.includes(body.status) ? body.status : "Active";
  const password = (body.password || "").trim();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }
  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role, status },
  });

  if (error || !data?.user) {
    return NextResponse.json(
      { error: error?.message || "Failed to create user" },
      { status: 400 }
    );
  }

  // The on_auth_user_created trigger will have created the profile; ensure it
  // reflects the latest values in case the trigger ran with partial metadata.
  await supabase
    .from("profiles")
    .upsert({
      id: data.user.id,
      name,
      email,
      role,
      status,
      updated_at: new Date().toISOString(),
    });

  return NextResponse.json({
    id: data.user.id,
    name,
    email,
    role,
    status,
  });
}
