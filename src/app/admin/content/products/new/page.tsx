import { ProductEditor } from "@/components/admin/ProductEditor";

export default function NewProductPage() {
  return (
    <ProductEditor
      mode="create"
      initial={{
        name: "",
        slug: "",
        category: "CLMP",
        price: "Enquire for pricing",
        description: "",
        status: "Published",
      }}
    />
  );
}
