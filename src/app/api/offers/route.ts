import prisma from "@/db";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const take = parseInt(req.nextUrl.searchParams.get('take') ?? "20")

  const products = await prisma.offers.findMany({
    take,
    include: { product: { include: { category: true } } },
    orderBy: { id: 'desc' }
  })

  return Response.json(products, { status: 200 })

}