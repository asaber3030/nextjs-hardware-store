import { NextRequest } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {

  const body: number[] = await req.json()

  return Response.json(await prisma.product.findMany({
    where: {
      id: { in: body }
    },
    include: {
      category: true
    }
  }))
}