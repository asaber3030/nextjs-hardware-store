// UI Components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, DollarSign, Heart, HeartCrack, Minus, Plus, ShoppingCart, X } from "lucide-react"

import { toast } from "sonner"
import { minus, plus, add, remove } from "@/store/slices/cart"
import { addToFavourites, removeToFavourites } from "@/store/slices/favourites"

// Types
import { Product } from "@/types/product"
import { ProductDetailsType } from "@/types/product-details"
import { CartType } from "@/types/cart"

// Hooks
import { useState } from "react"
import { useCookies } from 'next-client-cookies';
import { useAppDispatch, useAppSelector } from "@/store/store";

// Next.JS
import Link from "next/link"
import { formatNumber } from "@/lib/utils"


// Properties
interface Props {
  product: Product
}

// Main Component
export const ProductInformationDisplay = ({ product }: Props) => {
  
  const cookies = useCookies()

  const currentCart: CartType[] = JSON.parse(cookies.get('cart') ?? '[]')
  const productCart = currentCart.find(item => item.productId == product.id)
  const [productQuantity, setProductQuantity] = useState(productCart?.qty ?? 1)

  const cart = useAppSelector(state => state.cart)
  const favourite = useAppSelector(state => state.favourites)
  const dispatch = useAppDispatch()

  const cartItem = cart.find(item => item.productId === product.id)
  const favItem = favourite.find(item => item == product.id)

  return (
    <div className='w-full flex flex-col gap-y-1'>

      <h1 className='text-2xl font-bold'>{product.name}</h1>
      <h2 className='text-lg text-gray-400'>{product.brand}</h2>
      <Link href={`/categories/${product.categoryId}`} className='text-blue-900 font-semibold'>Category / <b>{product.category?.name}</b></Link>
      <p className='leading-6 text-xs text-gray-600'>{product.description}</p>
      <div className='flex items-center gap-x-2 font-semibold'>
        <span>Only</span>
        <span className='p-2 ring-1 ring-green-700 rounded-sm text-xs'>{product.qty} piece(s)</span>
        <span>left</span>
      </div>
    
      <div className='flex items-center gap-x-1 mt-3'>
        {product.color?.split(',').map((d, idx) => (<span className='text-xs ring-1 p-1 px-2 ring-black rounded-sm' key={idx}>{d.toUpperCase()}</span>))}
      </div>
      <Separator className='my-3' />
      <div className='flex items-center gap-x-3'>
        <h4 className='text-xl font-bold text-green-600'>{formatNumber(product.price)} LE</h4>
        {product.offerPrice && <span className='line-through text-sm text-gray-400'>{formatNumber(product.offerPrice ?? 10000)} LE</span>}
      </div>
      {product.productDetails?.length > 0 && (
        <>
          <Separator className='my-3' />
          <ul className='list-disc px-4'>
            {product.productDetails?.map((detail: ProductDetailsType) => (
              <li className='text-sm text-gray-700 leading-7' key={detail.id}>{detail.text}</li>
            ))}
          </ul>
        </>
      )}
      <Separator className='my-3' />
      <div className='flex gap-1'>
        <div className='flex items-center ring-2 ring-gray-200 rounded-md mr-3'>
          <Button variant='ghost' onClick={() => dispatch(minus({ product, quantity: 1, color: product.color?.split(",")[0] ?? "Black" })) }><Minus /></Button>
          <div className=' px-3 py-2'>{cartItem?.qty ?? 1}</div>
          <Button variant='ghost' onClick={() => dispatch(plus({ product, quantity: 1, color: product.color?.split(",")[0] ?? "Black" })) }><Plus /></Button>
        </div>
        {!!productCart && (
          <Button variant='outline' onClick={ () => dispatch(remove({ id: product.id })) }>
            <X className='mr-2' />
            Remove from cart
          </Button>
        )}
        {!!productCart == false && (
          <Button variant='outline' onClick={ () => dispatch(add({ productId: product.id, qty: cartItem?.qty ?? 1, productData: product, color: product.color?.split(",")[0] ?? "BLACK" })) }>
            {productCart ? <Check className='mr-2' /> : <ShoppingCart className='mr-2' />}
            Add to cart
          </Button>
        )}
        

        {favItem ? (
          <Button size='icon' variant='destructive' onClick={ () => dispatch(removeToFavourites({ id: product.id })) }>
            <HeartCrack />
          </Button>
        ): (
          <Button size='icon' variant='destructive' onClick={ () => dispatch(addToFavourites({ id: product.id })) }>
            <Heart />
          </Button>
        )}

        <Button variant='success'>
          <DollarSign className='mr-2' />
          Buy Now
        </Button>
        
      </div>

    </div>
  )
}