"use server";

import prisma from "@/db";

import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: {
    id: string
  },
}

export async function GET(_: NextRequest, { params }: ParamsProps) {

  const { id } = params
  try {
    const category = await prisma.category.findFirst({
      where: { 
        id: parseInt(id)
      },
      include: { 
        Products: {
          include: { category: true }
        } 
      },
    })
  
    return Response.json(category)
  } catch (error) {
    return Response.json({
      error
    })
  }
}