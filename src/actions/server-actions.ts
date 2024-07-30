"use server"

import prisma from "@/db"

export async function getProductsByServer(filter?: string, category?: string, brand?: string, colors?: string[], range?: number[], pageNumber = 1, take = 4) {

  const categoryId = parseInt(category as string)

  let AND: any[] = []
  let OR: any[] = []
  let include = {
    category: true,
    productDetails: true,
    productImages: true,
  }
  let skip = (pageNumber === 1 || pageNumber === 0) ? 0 : (pageNumber - 1) * take

  if (!!categoryId) {
    AND.push({
      categoryId
    })
  }
  if (!!filter) {
    OR.push({ name: { contains: filter } })
  }

  if (!!brand) {
    AND.push({ brand: { contains: brand } })
  }

  if (!!range && range[0] != 0) {
    AND.push({
      price: { gte: range[0] }
    })
  }

  if (!!range && range[1] != 0) {
    AND.push({
      price: { lte: range[1] }
    })
  }

  let products
  let type = 'NO'

  if (AND.length > 0 && OR.length > 0) {
    type = 'and_or'
    products = await prisma.product.findMany({
      where: {
        AND,
        OR,
      },
      include,
      take,
      skip
    })
  } else if (AND.length === 0 && OR.length > 0) {
    type = 'or_only'
    products = await prisma.product.findMany({
      where: {
        OR,
      },
      include,
      take,
      skip
    })
  } else if (AND.length > 0 && OR.length === 0) {
    type = 'and_only'
    products = await prisma.product.findMany({
      where: {
        AND,
      },
      include,
      take,
      skip
    })
  } else {
    products = await prisma.product.findMany({
      include,
      take,
      skip
    })
  }

  return products

  /* return {
    products,
    AND,
    OR,
    type,

    filterStatus: !!filter,
    filterValue: filter,

    brandStatus: !!brand,
    brandValue: brand,

    categoryStatus: !!category,
    categoryValue: category,

    colorsStatus: !!colors,
    colorsValue: colors,

    rangeStatus: !!range,
    rangeValue: range,

    take: take,
    page: pageNumber 
  }*/

}