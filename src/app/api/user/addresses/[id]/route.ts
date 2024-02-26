import prisma from "@/db";

import { NextRequest } from "next/server";
import { cookies } from "next/headers"

type ParamsProps = {
  params: { id: number }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const id = parseInt(params.id as any)
  const address = await prisma.userAddress.findUnique({ where: { id } })
  const userId = parseInt(cookies().get('login')?.value as any)

  if (address?.userId == userId) {
    return Response.json(address, { status: 200 })
  }

  return Response.json({ message: "Not found" }, { status: 404 })
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  
  const id = parseInt(params.id as any)
  const userId = parseInt(cookies().get('login')?.value as any)

  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 403 })
  }

  const findAddress = await prisma.userAddress.findUnique({
    where: { 
      id,
      AND: [
        { userId }
      ]
    }
  })

  if (findAddress) {
    await prisma.userAddress.update({ where: { id }, data: { main: true } })
    await prisma.userAddress.updateMany({
      where: { 
        userId,
        AND: [
          { id: { notIn: [id] } }
        ]
      },
      data: {
        main: false
      }
    })
    return Response.json({ message: "Choosed address has been set to main" }, { status: 200 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 403 })
}

export async function DELETE(req: NextRequest, { params }: ParamsProps) {
  const id = parseInt(params.id as any)
  const userId = parseInt(cookies().get('login')?.value as any)

  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 403 })
  }

  const findAddress = await prisma.userAddress.findUnique({
    where: { 
      id,
      AND: [
        { userId }
      ]
    }
  })

  if (findAddress) {
    await prisma.userAddress.delete({ where: { id } })
    return Response.json({ message: "Address has been deleted!" }, { status: 200 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 403 })
}

type BodyProps = {
  address: string,
  main: boolean,
  city: string,
  phone: string,
  homePhone: string,
  floor: string,
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const body: BodyProps = await req.json();
  const userId = parseInt(cookies().get('login')?.value as any)

  const addressId = parseInt(params.id as any)

  if (userId) {

    const belongsToUser = await prisma.userAddress.findUnique({ 
      where: { 
        id: addressId,
        userId: userId
      },
    })

    if (belongsToUser) {
      const address = await prisma.userAddress.update({
        data: {
          address: body.address,
          city: body.city,
          phone: body.phone,
          homePhone: body.homePhone,
          floor: body.floor,
          main: !!body.main,
          userId
        },
        where: { id: parseInt(params.id as any) }
        
      })

      return Response.json({ message: "Address updated!" }, { status: 201 })

    }

    return Response.json({ message: "Unauthorized" }, { status: 203 })
  }

  return Response.json({ message: "Unauthorized" }, { status: 203 })
}