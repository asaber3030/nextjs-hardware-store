import { Cog, DollarSign, Heart, Info, List, Locate, ShoppingBag, User } from "lucide-react"
import { ProfileHeader } from "../profile-header"

import Link from "next/link"

export const ProfileComponent = () => {

  const linkStyle = "text-center bg-gray-600 text-white flex flex-col items-center justify-center p-4 rounded-md shadow-md";

  return (
    <div>
      <ProfileHeader icon={<User className='size-6' />} label="Profile" />
      <div className='grid grid-cols-4 col-span-4 gap-2'>
        <Link href='/orders' className={linkStyle}>
          <DollarSign />
          <h2>Orders</h2>
        </Link>
        <Link href='/addresses' className={linkStyle}>
          <Locate />
          <h2>Addresses</h2>
        </Link>
        <Link href='/favourites' className={linkStyle}>
          <Heart />
          <h2>Favourites</h2>
        </Link>
        <Link href='/' className={linkStyle}>
          <ShoppingBag />
          <h2>Products</h2>
        </Link>
        <Link href='/settings' className={linkStyle}>
          <Cog />
          <h2>Settings</h2>
        </Link>
        <Link href='/categories' className={linkStyle}>
          <List />
          <h2>Categories</h2>
        </Link>
        <Link href='/details' className={linkStyle}>
          <Info />
          <h2>Details</h2>
        </Link>
      </div>
    </div>
  )
}