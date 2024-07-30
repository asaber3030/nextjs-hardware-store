import prisma from "@/db";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const query = req.nextUrl.searchParams.get('filter')
  const category = parseInt(req.nextUrl.searchParams.get('category') as string)
  const brand = req.nextUrl.searchParams.get('brand')

  if (!!category === true) { // Category exists
    if (!!query == true && !!brand == true) { // Brand & Query exists
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: !!query ? query : ' ' } },
          ],
          AND: [
            { categoryId: category },
            { brand: { contains: brand } },
          ]
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    } else if (!!query == true && !!brand == false) { // Query => Exists === Brand not found
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: !!query ? query : ' ' } },
          ],
          AND: [
            { categoryId: category },
          ]
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    } else if (!!query == false && !!brand == true) { // Query => Not Exist === Brand found
      const products = await prisma.product.findMany({
        where: {
          AND: [
            { categoryId: category },
            { brand: { contains: brand } }
          ]
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    } else if (!!query == false && !!brand == false) { // Query => Not Exist === Brand found
      const products = await prisma.product.findMany({
        where: {
          AND: [
            { categoryId: category },
          ]
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    }
  } else { // No Category exists
    if (!!query == true && !!brand == true) { // Brand & Query exists
      const products = await prisma.product.findMany({
        where: {
          AND: [
            { name: { contains: !!query ? query : ' ' } },
            { brand: { contains: brand } },
          ]
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category Not exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    } else if (!!query == true && !!brand == false) { // Query => Exists === Brand not found
      const products = await prisma.product.findMany({
        where: {
          name: { contains: !!query ? query : ' ' } ,
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category Not exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    } else if (!!query == false && !!brand == true) { // Query => Not Exist === Brand found
      const products = await prisma.product.findMany({
        where: {
          AND: [
            { brand: { contains: brand } }
          ]
        },
        include: { category: true }
      })
      return Response.json({
        message: 'Category Not exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    } else if (!!query == false && !!brand == false) { // Query => Not Exist === Brand not found
      const products = await prisma.product.findMany({
        include: { category: true }
      })
      return Response.json({
        message: 'Category Not exists!',
        category: !!category,
        query: !!query,
        brand: !!brand,
        products
      })
    }
  }
}
