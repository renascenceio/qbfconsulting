import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Verify the user has an admin profile and is Active
  const service = createServiceClient();
  const { data: profile } = await service
    .from("profiles")
    .select("role, status")
    .eq("id", data.user.id)
    .maybeSingle();

  const allowedRoles = new Set(["Super Admin", "Admin", "Editor", "Author"]);
  if (
    !profile ||
    !allowedRoles.has(profile.role) ||
    profile.status !== "Active"
  ) {
    // Sign out — they authenticated but aren't authorised for the admin surface
    await supabase.auth.signOut();
    return NextResponse.json(
      {
        success: false,
        message: "Your account does not have admin access.",
      },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
      role: profile.role,
    },
  });
}
