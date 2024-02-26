import { NextRequest } from "next/server";

import prisma from "@/db";

interface Props {
  params: { id: string }
}

export async function GET(req: NextRequest, { params }: Props) {

  const product = await prisma.product.findFirst({
    where: { id: parseInt(params.id) },
    include: { productImages: true, category: true, productDetails: true }
  })

  if (!product) {
    return Response.json({ message: 'Product not found!' }, { status: 404 })
  }

  return Response.json(product, { status: 200 })

}