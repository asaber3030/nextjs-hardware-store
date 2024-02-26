import prisma from "@/db";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const query = req.nextUrl.searchParams.get('filter')
  if (!query) {
    return Response.json(await prisma.category.findMany({
      include: { Products: true },
      orderBy: { name: 'asc' }
    }))
  }

  return Response.json(await prisma.category.findMany({
    where: {
      name: { contains: query }
    },
    select: { id: true, name: true, icon: true },
  }))

}