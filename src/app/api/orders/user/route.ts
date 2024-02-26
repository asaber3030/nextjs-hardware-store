import prisma from "@/db";

import { CartType, CouponType, Product, CategoryType } from "@/types";

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const userId: number = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (user) {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: { items: true, coupon: true },
      orderBy: { id: 'desc' }
    })
    return Response.json(orders, { status: 200 })
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }
}

type DataType = {
  cart: CartType[],
  sum: number,
  delivery: number,
  coupon: CouponType | number
}

export async function POST(req: NextRequest) {

  const data: DataType                = await req.json()
  const productIds: number[]          = data.cart.map(i => i.productId)
  const userId: number                = parseInt(cookies().get('login')?.value as any)
  const user                          = await prisma.user.findUnique({ where: { id: userId } })
  const products                      = await prisma.product.findMany({ where: { id: { in: productIds } } })

  if (user) {
    if (data.cart.length > 0) {

      const findFirstOrder = await prisma.order.findFirst({
        where: { 
          userId: user.id, 
          statusNumber: { in: [0, 1, 2] }
        }
      })

      if (findFirstOrder) {
        return Response.json({ message: "Order in preparing status, Please wait until the product arrive or cancel it and reorder if you can!", status: 302 })
      }

      if (typeof data.coupon === "number") {
        const newOrder = await prisma.order.create({
          data: {
            userId: user.id,
            couponId: 1,
            arriveIn: new Date(),
            overall: data.sum + 100,
            discountValue: 0,
            status: "Just Ordered"
          }
        })
  
        products.forEach(async (product: any) => {
          const cartItem: (CartType | undefined) = data.cart.find(item => item.productId == product.id)
          await prisma.orderItems.create({
            data: {
              productId: product.id,
              orderId: newOrder.id,
              unitPrice: product.price,
              totalPrice: product.price * (cartItem?.qty ?? 1),
              quantity: cartItem?.qty ?? 1,
              color: cartItem?.color ?? "BLACK",
            }
          })
        })
  
        cookies().set('cart', "[]")
  
        const order = await prisma.order.findUnique({
          where: { id: newOrder.id },
          include: { items: true }
        })
  
        return Response.json({
          message: "Order has been placed!",
          status: 201,
          order
        }, { status: 200 })
      }

      const newOrder = await prisma.order.create({
        data: {
          userId: user.id,
          couponId: data?.coupon ? data?.coupon?.id : 1,
          arriveIn: new Date(),
          overall: data.sum + 100,
          discountValue: (data.coupon.discount / 100) * (data.sum + 100),
          status: "Just Ordered"
        }
      })

      products.forEach(async (product: any) => {
        const cartItem: (CartType | undefined) = data.cart.find(item => item.productId == product.id)
        await prisma.orderItems.create({
          data: {
            productId: product.id,
            orderId: newOrder.id,
            unitPrice: product.price,
            totalPrice: product.price * (cartItem?.qty ?? 1),
            quantity: cartItem?.qty ?? 1,
            color: cartItem?.color ?? "ProductUndefined",
          }
        })
      })

      cookies().set('cart', "[]")

      const order = await prisma.order.findUnique({
        where: { id: newOrder.id },
        include: { items: true }
      })

      return Response.json({
        message: "Order has been placed!",
        status: 201,
        order
      }, { status: 200 })
      
    } else {
      return Response.json({
        message: "Empty cart cannot order",
        status: 405,
      }, { status: 200 })  
    }
  } else {
    return Response.json({
      message: "Unauthorized",
      status: 403,
    }, { status: 200 })
  }


}