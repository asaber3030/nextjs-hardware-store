"use client";

import { User2, LogIn, UserPlus2, User, Cog, LogOut, Heart, Locate, ShoppingBasket, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useUser } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Loader } from "./loader";
import { useAppSelector } from "@/store/store";

export const UserDropdown = () => {

  const { user, pending } = useUser();

  const favs = useAppSelector((state) => state.favourites)
  const router = useRouter()

  if (pending) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='navbar'><User2 className='mr-2' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className='w-[280px]'>
          <div className='my-4 flex justify-center items-center'>
            <Loader />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (user)  {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='navbar'><User2 className='mr-2' /> {user.name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className='w-[280px]'>
          <DropdownMenuItem onClick={ () => router.push('/profile') }><User className='mr-3 text-gray-600 w-5 h-5' /> Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={ () => router.push('/details') }><Info className='mr-3 text-gray-600 w-5 h-5' /> Information</DropdownMenuItem>
          <DropdownMenuItem onClick={ () => router.push('/orders') }><ShoppingBasket className='mr-3 text-gray-600 w-5 h-5' /> Orders</DropdownMenuItem>

          <DropdownMenuItem onClick={ () => router.push('/addresses') }><Locate className='mr-3 text-gray-600 w-5 h-5' /> My Addresses</DropdownMenuItem>
          <DropdownMenuItem onClick={ () => router.push('/favourites') } className='flex items-center justify-between'>
            <span className='flex items-center'><Heart className='mr-3 text-gray-600 w-5 h-5' /> My Favourites </span>
            <span className='text-red-600'><Badge variant='destructive' className='rounded-md'>{favs.length}</Badge></span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={ () => router.push('/settings') }><Cog className='mr-3 text-gray-600 w-5 h-5' /> Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={ () => router.push('/logout') }><LogOut className='mr-3 text-gray-600 w-5 h-5' /> Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='navbar'><User2 /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuItem onClick={ () => router.push('/login') }>
          <LogIn className="mr-2 h-4 w-4" />
          <span>Sign In</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => router.push('/register') }>
          <UserPlus2 className="mr-2 h-4 w-4" />
          <span>Create New Account</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}