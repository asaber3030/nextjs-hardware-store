import prisma from "@/db";

import { CartType, CouponType, Product, CategoryType } from "@/types";

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: number } }) {
  const userId: number = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (user) {
    const order = await prisma.order.findUnique({
      where: { userId: userId, id: parseInt(id as any) },
      include: { 
        items: {
          include: { product: true }
        }, 
        coupon: true 
      }
    })
    return Response.json(order, { status: 200 })
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(req: NextRequest, { params: { id } }: { params: { id: number } }) {

  const userId: number = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (user) {
    await prisma.orderItems.deleteMany({ where: { orderId: parseInt(id as any) } })
    await prisma.order.delete({ where: { id: parseInt(id as any) } })
    return Response.json({ message: "Order cancelled!" }, { status: 200 })

  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

}