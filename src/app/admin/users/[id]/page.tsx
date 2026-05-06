import { notFound } from "next/navigation";
import { findBy } from "@/lib/db";
import { UserEditor } from "@/components/admin/UserEditor";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = findBy<any>("users", "id", id);
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
