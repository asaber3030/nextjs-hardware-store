"use client";

import { Button } from "@/components/ui/button"

import { Heart } from "lucide-react"

import Link from "next/link";

export const FavouritesLink = () => {

  return (
    <Button variant='navbar'><Link href='/favourites'><Heart /></Link></Button>
  )
}