import { NextRequest } from "next/server";
import { RegisterSchema } from "@/schema/register";

import prisma from '@/db'

import * as z from 'zod'

import bcrypt from 'bcryptjs'

type BodyProps = {
  name: string,
  email: string,
  password: string,
  phone: string,
}

export async function POST(req: NextRequest) {
  const body: BodyProps = await req.json()
  const { name, email, password, phone } = body

  const validator = RegisterSchema.safeParse(body)

  if (validator.success) {

    const hashed = await bcrypt.hash(password, 10)
    const find = await prisma.user.findFirst({ where: { email } })

    if (find) {
      return Response.json({
        message: "Email is already in use!",
        user: null
      }, { status: 302 })
    }

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashed
      }
    })
    return Response.json({
      message: "User created!",
      user
    }, { status: 201 })
  }

  return Response.json({
    message: "Failed to create",
    user: null
  })

}