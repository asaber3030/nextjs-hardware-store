"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Briefcase, Check, Heart, Info, Locate, Lock, LogOut, Settings, ShoppingBasket, ShoppingCart, Trash, User } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserLinks = () => {

  const iconStyle = 'w-5 h-5 text-gray-600'
  const pathname = usePathname()

  return (
    <div className='min-w-[300px] h-fit ring-1 ring-gray-200 bg-gray-100 p-2 rounded-sm shadow-sm flex flex-col gap-y-1'>
      <UserLinks.Item 
        href='/profile'
        icon={<User className={iconStyle} />}
        label='Profile'
        active={pathname === '/profile'}
      />
      <UserLinks.Item 
        href='/orders'
        icon={<ShoppingBasket className={iconStyle} />}
        label='Orders'
        active={pathname === '/orders'}
      />
      <UserLinks.Item 
        href='/addresses'
        icon={<Locate className={iconStyle} />}
        label='Addresses'
        active={pathname === '/addresses' || pathname === '/addresses/create'}
      />
      <UserLinks.Item 
        href='/details'
        icon={<Info className={iconStyle} />}
        label='Details'
        active={pathname === '/details'}
      />
      <UserLinks.Item 
        href='/favourites'
        icon={<Heart className={iconStyle} />}
        label='Favourites'
        active={pathname === '/favourites'}
      />
      <UserLinks.Item 
        href='/settings'
        icon={<Lock className={iconStyle} />}
        label='Change Password'
        active={pathname === '/settings'}
      />
      <Separator />
        <UserLinks.Item 
          href='/categories'
          icon={<Briefcase className={iconStyle} />}
          label='Categories'
          active={pathname === '/categories'}
        />
        <UserLinks.Item 
          href='/products'
          icon={<ShoppingCart className={iconStyle} />}
          label='Products'
          active={pathname === '/products'}
        />
      <Separator />

      <UserLinks.Item 
        href='/logout'
        icon={<LogOut className={iconStyle} />}
        label='Logout'
      />

      <UserLinks.Item 
        href='/delete-account'
        icon={<Trash className={iconStyle + ' text-red-600'} />}
        label='Delete Account'
        className='text-red-600 hover:bg-red-100'
        deleteActive={pathname === '/delete-account'}
      />
    </div>
  )
}

UserLinks.Item = ({ href, icon, label, className, active, deleteActive }: { href: string, icon: React.ReactElement, label: string, className?: string, active?: boolean, deleteActive?: boolean }) => {

  return (
    <Link href={href} className={cn(
      `py-2 px-4 hover:bg-gray-300 transition-all rounded-md text-gray-700 font-semibold text-sm flex items-center gap-x-4`,
      active && 'bg-gray-300',
      className && `${className}`,
      deleteActive && 'text-red-600 bg-red-100'
    )}>{icon} {label}</Link>
  )

}