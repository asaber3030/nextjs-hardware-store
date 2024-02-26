import prisma from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { id: s } }: { params: { id: number } }) {
  const id = parseInt(s as any)
  const coupon = await prisma.coupon.findUnique({ where: { id } })
  return Response.json(coupon)
}

type BodyProps = {
  discount?: number,
  coupon?: string,
  usages?: number,
  allowed?: boolean
}

export async function POST(req: NextRequest, { params: { id: s } }: { params: { id: number } }) {
  let admin = true;
  if (admin) {
    const id = parseInt(s as any)
    const body: BodyProps = await req.json()
    const coupon = await prisma.coupon.update({
      where: { id },
      data: { ...body }
    })
    return Response.json(coupon)
  }

  return Response.json({
    message: "Not Allowed"
  }, { status: 403 })
}