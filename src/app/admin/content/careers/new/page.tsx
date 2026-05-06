import { CareerEditor } from "@/components/admin/CareerEditor";

export default function NewJobPage() {
  return (
    <CareerEditor
      mode="create"
      initial={{
        title: "",
        slug: "",
        department: "Strategy",
        location: "Remote",
        type: "Full-time",
        description: "",
        status: "Active",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }}
    />
  );
}
