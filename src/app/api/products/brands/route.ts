import prisma from "@/db";
import { Product } from "@/types/product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const query = req.nextUrl.searchParams.get('filter')

  let products;

  if (query) {
    products = await prisma.product.findMany({
      orderBy: { brand: 'asc' },
      where: {
        brand: {
          contains: query
        }
      }
    })
  } else {
    products = await prisma.product.findMany({
      orderBy: { brand: 'asc' }
    })
  }

  

  const distinctBrands: string[] = [];

  products.map((product) => {
    if (!distinctBrands.find(ele => ele == product.brand)) {
      distinctBrands.push(product.brand as string)
    }
  })

  return Response.json(distinctBrands)
}