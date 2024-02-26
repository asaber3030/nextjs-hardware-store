import prisma from "@/db";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { name } }: { params: { name: string } }) {
  const coupon = await prisma.coupon.findFirst({
    where: {
      coupon: { equals: name }
    }
  })

  return Response.json(coupon, { status: 201 })
}