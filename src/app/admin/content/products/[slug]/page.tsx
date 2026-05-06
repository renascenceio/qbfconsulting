import { notFound } from "next/navigation";
import { findBy } from "@/lib/db";
import { ProductEditor } from "@/components/admin/ProductEditor";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await findBy<any>("products", "slug", slug);
  if (!product) notFound();

  return (
    <ProductEditor
      mode="edit"
      initial={{
        id: product.id,
        slug: product.slug,
        name: product.name || "",
        category: product.category || "CLMP",
        price: product.price || "",
        description: product.description || "",
        status: product.status || "Published",
      }}
    />
  );
}
