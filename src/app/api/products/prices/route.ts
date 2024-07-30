import prisma from "@/db";

export async function GET() {
  const max = await prisma.product.aggregate({
    _max: {
      price: true
    }
  })
  const min = await prisma.product.aggregate({
    _min: {
      price: true
    }
  })

  return Response.json([min._min.price, max._max.price])
}