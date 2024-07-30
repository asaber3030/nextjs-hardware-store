import prisma from "@/db"

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      productDetails: true,
    }
  })
  return Response.json(products)
}