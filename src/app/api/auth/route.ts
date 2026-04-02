import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // In a real app, these would be in environment variables
  const ADMIN_EMAIL = "aslan@renascence.io";
  const ADMIN_PASS = "Admin123!";

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const response = NextResponse.json({ success: true });

    // Set a simple cookie for the session
    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
