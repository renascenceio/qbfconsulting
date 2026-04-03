import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const products = readData("products");
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();
  const products = readData("products");

  const newProduct = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  writeData("products", products);

  return NextResponse.json(newProduct);
}
