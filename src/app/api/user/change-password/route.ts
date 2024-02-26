import { NextRequest } from "next/server";
import { PasswordSchema } from "@/schema/register";

import prisma from "@/db";

import * as z from 'zod'
import { cookies } from "next/headers";

import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const body: z.infer<typeof PasswordSchema> = await req.json()
  const userId: number = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (user) {
    const { currentPassword,newPassword } = body
    const passwordMatches = await bcrypt.compare(currentPassword, user.password)
    if (passwordMatches) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: newHashedPassword }
      })
      return Response.json({ message: "Password updated!" }, { status: 200 })
    } else {
      return Response.json({ message: "Password doesnot match with your current try again!" }, { status: 200 })
    }
  }
  
  return Response.json({ message: "Unauthorized" }, { status: 200 })
}