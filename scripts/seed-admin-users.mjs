import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ADMINS = [
  {
    email: "aslan@renascence.io",
    password: "Admin123!",
    name: "Aslan Patov",
    role: "Super Admin",
  },
  {
    email: "cs@qbfconsulting.com",
    password: "Admin123!",
    name: "Chayya Sakhuja",
    role: "Super Admin",
  },
];

async function ensureAdmin({ email, password, name, role }) {
  // List existing users to detect dupes (admin.listUsers paginates; one page is enough for our scale)
  const { data: list, error: listErr } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (listErr) throw listErr;

  const existing = list.users.find(
    (u) => (u.email || "").toLowerCase() === email.toLowerCase()
  );

  if (existing) {
    // Update password + metadata so the credentials always match what's documented
    const { error } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: { name, role, status: "Active" },
    });
    if (error) throw error;
    // Make sure the profile row reflects current metadata
    await admin
      .from("profiles")
      .upsert({
        id: existing.id,
        name,
        email,
        role,
        status: "Active",
      })
      .throwOnError();
    console.log(`Updated existing admin: ${email}`);
    return;
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role, status: "Active" },
  });
  if (error) throw error;
  console.log(`Created admin: ${email} (id=${data.user.id})`);
}

async function main() {
  for (const a of ADMINS) {
    await ensureAdmin(a);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
