import prisma from "@/db";
import { cookies } from "next/headers";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = parseInt(cookies().get('login')?.value as any)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (user) {
    const findFirstAddress = await prisma.userAddress.findFirst({
      where: { userId: user?.id, main: true }
    })
    if (findFirstAddress) {
      return Response.json({ found: true, status: 200 }, { status: 200 })
    } else {
      return Response.json({ found: false, status: 302 }, { status: 200 })
    }
  }
  return Response.json({ found: false, status: 302 }, { status: 403 })
}