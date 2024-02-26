import prisma from "@/db"

import * as z from 'zod'

import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { UserUpdateSchema } from "@/schema/register"

import bcrypt from 'bcryptjs'

type BodyProps = {
  name: string,
  email: string,
  phone: string,
}

export async function GET(req: NextRequest) {

  if (req.cookies.get('login')?.value) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.cookies.get('login')?.value as any) },
      select: {
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        id: true
      }
    })
  
    if (!user) {
      return Response.json({
        user: null
      })
    }
  
    return Response.json(user)
  } else {
    return Response.json(null)
  }
}

export async function POST(req: NextRequest) {

  const userId: number = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  const body: z.infer<typeof UserUpdateSchema> = await req.json()

  if (user) {

    const { phone, email } = body

    const findEmail = await prisma.user.findFirst({ 
      where: { 
        email, 
        id: { not: userId } 
      }
    })
    const findPhone = await prisma.user.findFirst({ 
      where: { 
        phone, 
        id: { not: userId } 
      }
    })

    if (findEmail) return Response.json({ message: "Email already exists!", status: 302 }, { status: 200 })
    if (findPhone) return Response.json({ message: "Phone already exists!", status: 302 }, { status: 200 })

    await prisma.user.update({
      where: { id: parseInt(user.id as any) },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone
      }
    })
    return Response.json({ message: "User Updated", status: 200 }, { status: 200 })
  } else {
    return Response.json({ message: "Unauthorized!", status: 403 }, { status: 200 })
  }
}

