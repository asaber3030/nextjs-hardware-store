import prisma from "@/db";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const products = await prisma.product.findMany({
    take: 20,
    orderBy: {
      items: {
        _count: 'desc'
      }
    },
    include: {
      category: true
    }
  })

  return Response.json(products, { status: 200 })

}