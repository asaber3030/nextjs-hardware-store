import prisma from "@/db";

import { Product } from "@/types/product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  let colors = await prisma.product.findMany({
    select: { color: true }
  })

  let distinctColors: string[] = [];

  colors.forEach((color) => {
    let splittedColors = color.color?.split(',')
    splittedColors?.forEach(item => {
      if (!distinctColors.includes(item)) {
        distinctColors.push(item)
      }
    })
  })

  return Response.json(distinctColors)
}