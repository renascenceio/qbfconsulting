import { NextResponse } from "next/server";
import { readData, upsertBy, slugify } from "@/lib/db";

export async function GET() {
  const products = await readData("products");
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();

  const slug = product.slug?.trim() || slugify(product.name || "untitled-product");

  const newProduct = {
    ...product,
    id: product.id || `p_${Date.now()}`,
    slug,
    createdAt: new Date().toISOString(),
  };

  await upsertBy("products", "slug", slug, newProduct);

  return NextResponse.json(newProduct);
}
