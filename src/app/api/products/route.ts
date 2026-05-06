import { NextResponse } from "next/server";
import { readData, writeData, slugify } from "@/lib/db";

export async function GET() {
  const products = readData("products");
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();
  const products = readData<any>("products");

  const slug = product.slug?.trim() || slugify(product.name || "untitled-product");

  const newProduct = {
    ...product,
    id: product.id || `p_${Date.now()}`,
    slug,
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  writeData("products", products);

  return NextResponse.json(newProduct);
}
