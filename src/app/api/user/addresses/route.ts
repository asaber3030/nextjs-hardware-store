import { NextRequest } from "next/server"
import { cookies } from "next/headers"

import prisma from "@/db"

export async function GET(req: NextRequest) {

  const userId = parseInt(cookies().get('login')?.value as any)

  if (userId) {
    const addresses = await prisma.userAddress.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    })
  
    return Response.json(addresses, { status: 200 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 203 })

}

type BodyProps = {
  address: string,
  main: boolean,
  city: string,
  phone: string,
  homePhone: string,
  floor: string,
}

export async function POST(req: NextRequest) {
  const body: BodyProps = await req.json();
  const userId = parseInt(cookies().get('login')?.value as any)

  const countAddress = await prisma.userAddress.count({ where: { userId } })

  if (countAddress == 5) {
    return Response.json({ message: "Max Address reached" }, { status: 403 })
  }

  if (userId) {
    const address = await prisma.userAddress.create({
      data: {
        address: body.address,
        city: body.city,
        phone: body.phone,
        homePhone: body.homePhone,
        floor: body.floor,
        main: !!body.main,
        userId
      }
    })

    const isNewMain = address.main

    if (isNewMain) {
      const updateAdreesses = await prisma.userAddress.updateMany({
        where: {
          userId,
          AND: [
            { id: { notIn: [address.id] } }
          ],
        },
        data: { main: false }
      })
    }

    return Response.json({ message: "Address created!" }, { status: 201 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 203 })
}