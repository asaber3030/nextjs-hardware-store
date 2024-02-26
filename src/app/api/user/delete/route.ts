import prisma from "@/db"

import * as z from 'zod'

import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { UserUpdateSchema } from "@/schema/register"

import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const userId: number = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  const body = await req.json()

  if (user) {
    const passwordMatches = await bcrypt.compare(body.password, user.password)
    if (passwordMatches) {
      await prisma.user.delete({ where: { id: user.id } })
      cookies().delete('login')
      Response.redirect(new URL('/login', req.nextUrl))
      return Response.json({ message: "Your account has been deleted!", status: 200, deleted: true }, { status: 200 })
    } else {
      return Response.json({ message: "Access denied cannot delete account, wrong password provided!", status: 403 }, { status: 200 })
    }
  } else {
    return Response.json({ message: "Unauthorized!", status: 403 }, { status: 200 })
  }

}