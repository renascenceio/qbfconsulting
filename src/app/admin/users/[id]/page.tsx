import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { UserEditor } from "@/components/admin/UserEditor";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: user } = await supabase
    .from("profiles")
    .select("id, name, email, role, status")
    .eq("id", id)
    .maybeSingle();

  if (!user) notFound();

  return (
    <UserEditor
      mode="edit"
      initial={{
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Author",
        status: user.status || "Active",
      }}
    />
  );
}
