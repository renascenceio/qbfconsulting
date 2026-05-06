import { PostEditor } from "@/components/admin/PostEditor";

export default function NewPostPage() {
  return (
    <PostEditor
      mode="create"
      initial={{
        title: "",
        slug: "",
        category: "Loyalty Strategy",
        author: "Aslan Patov",
        excerpt: "",
        content: "",
        status: "Draft",
        readTime: "5 min read",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        tags: [],
      }}
    />
  );
}
