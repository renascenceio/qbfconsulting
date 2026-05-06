import { UserEditor } from "@/components/admin/UserEditor";

export default function NewUserPage() {
  return (
    <UserEditor
      mode="create"
      initial={{
        name: "",
        email: "",
        role: "Author",
        status: "Active",
      }}
    />
  );
}
