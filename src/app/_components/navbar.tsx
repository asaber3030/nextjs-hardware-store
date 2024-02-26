import Link from "next/link"

import { ShoppingCart } from "./shopping-cart"
import { UserDropdown } from "./user-dropdown"
import { FavouritesLink } from "./favourites-link"

export const Navbar = () => {
  return (
    <nav className='flex gap-x-4 items-center justify-between m-auto px-14 py-3 bg-black/90 text-white'>

      <h1 className='text-2xl font-bold'>
        <Link className='hover:text-gray-300 transition-all' href='/'>Hardware</Link>
      </h1>

      <div>
        
        <FavouritesLink />

        <ShoppingCart />

        <UserDropdown />

      </div>

    </nav>
  )
}