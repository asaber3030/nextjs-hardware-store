import { NextRequest } from "next/server";
import { LoginSchema } from "@/schema/login";

import prisma from '@/db'
import bcrypt from 'bcryptjs'

import { cookies } from 'next/headers'

type BodyProps = {
  email: string,
  password: string,
}

export async function POST(req: NextRequest) {
  const body: BodyProps = await req.json()
  const validator = LoginSchema.safeParse(body)

  const { email, password } = body

  if (validator.success) {
    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
      return Response.json({ message: 'Invalid credentials!' }, { status: 404 })
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return Response.json({ message: 'Invalid credentials!' }, { status: 404 })
    }

    cookies().set('login', `${user.id}`, {
      expires: new Date("2026-03-25")
    })

    return Response.json({ message: 'User found... redirecting' }, { status: 200 })
  }

  return Response.json({ message: 'Couldnot login!' }, { status: 500 })

}