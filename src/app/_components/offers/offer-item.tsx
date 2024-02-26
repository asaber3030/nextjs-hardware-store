import { Button } from "@/components/ui/button"
import { ShoppingBasket, X } from "lucide-react"

import { formatNumber } from "@/lib/utils"

import { useAppDispatch, useAppSelector } from "@/store/store"
import { add, remove } from "@/store/slices/cart"

import { OfferType } from "@/types/offer"
import { CartType } from "@/types"

import Image from "next/image"
import Link from "next/link"

export const OfferItem = ({ offer }: { offer: OfferType }) => {

  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const cartItem: (CartType | undefined) = cart.find(item => item.productId === offer.product.id)

  return (
    <div className='p-2 rounded-md shadow-sm bg-gray-100 ring-1 ring-gray-200'>
      <Image src='/offer.png' alt="Offer image" width={64} height={64} className='mx-auto my-2' />
      <h2 className="text-xl text-gray-700 text-center">Offer Code: <b>X477SCD</b></h2>
      <h2 className="text-2xl text-gray-700 font-bold text-center">{offer.title}</h2>
      <p className='text-sm text-center text-gray-400'>{offer.description}</p>
      <div className="my-4 mb-0 flex flex-col justify-center items-center gap-4">
        <div className="flex items-center justify-center h-[100px]">
          <Image src={offer.product.image as any} width={80} height={80} alt="Product image" className="object-contain w-full h-full" />
        </div>
        <div className="text-center p-4">
          <Link className='hover:underline font-bold text-sm line-clamp-1' href={`/products/${offer.product.id}`}>{offer.product.name}</Link>
          <p className='flex items-center gap-4 justify-center'>
          <span className='text-xl text-green-600 font-bold'>{formatNumber(offer.offerPrice)}</span>
            <span className='line-through text-sm text-gray-400'>{formatNumber(offer.product.price)}</span>
          </p>
        </div>
      </div>
      <div className="pt-2 w-full border-t">
        {cartItem ? (
          <Button onClick={ () => dispatch(remove({ id: offer.product.id })) } className='w-full' size='sm'><X className='mr-2' /> Remove</Button>
        ): (
          <Button onClick={ () => dispatch(add({ productId: offer.product.id, qty: 1, color: offer.product.color?.split(",")[0] ?? "Default", productData: offer.product })) } className='w-full' size='sm'><ShoppingBasket className='mr-2' /> Add to cart</Button>
        )}
      </div>
    </div>
  )
}