"use server";

import prisma from "@/db";
import { AdminLoginSchema } from "@/schema/admins";
import bcrypt from 'bcryptjs'

import * as z from 'zod'

export async function login(values: z.infer<typeof AdminLoginSchema>) {
  const admin = await prisma.admin.findUnique({
    where: {
      username: values.username
    }
  })

  if (admin) {
    const comparePassword = await bcrypt.compare(values.password, admin.password);
    if (comparePassword) {
      return {
        message: "Admin Was Found Successfully! redirecting...",
        status: 200,
        admin
      }
    } else {
      return {
        message: "Incorrect password",
        status: 403
      }
    }
  }
  return {
    message: "Error: Admin Not Found!",
    status: 404
  }
}