import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!cookies().get('login')?.value) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
}

export const config = {
  matcher: ['/profile', '/buy', '/orders', '/settings', '/delete-account']
}