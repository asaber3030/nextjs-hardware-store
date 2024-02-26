"use client";

import Image from "next/image"
import Link from "next/link"

import { Product } from "@/types/product"

import { Button } from "@/components/ui/button"
import { Check, Eye, Heart, HeartCrack, Rows4, ShoppingCart } from "lucide-react"

import { useFavourites, useCart } from "@/hooks"
import { useRouter } from "next/navigation";

import { add, remove } from "@/store/slices/cart";
import { addToFavourites, removeToFavourites } from "@/store/slices/favourites";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { formatNumber } from "@/lib/utils";

interface ProductCardProps {
  product: Product,
  disableActions?: boolean
}

export const ProductCard = ({ product, disableActions = false }: ProductCardProps) => {

  const router = useRouter()
  
  const favs = useAppSelector((state) => state.favourites)
  const cart = useAppSelector((state) => state.cart)

  const dispatch = useAppDispatch()

  return (
    <div className='relative h-fit'>
      <div className='p-4 bg-gray-100 rounded-md shadow-sm ring-black/20'>
        <Image src={product.image} alt='Product' width={200} height={100} className='object-contain max-w-[100%] w-[200px] h-[200px] m-auto my-10' />
      </div>
      <div className='py-2 flex flex-col gap-y-2'>
        <Link href={`/products/${product.id}`} className='text-lg font-bold capitalize line-clamp-1 hover:underline'>{product.name}</Link>
        <Link href={`/categories/${product.categoryId}`} className='text-xs text-gray-400 flex gap-1 items-center'><Rows4 className='size-4' /> {product?.category?.name}</Link>
        <h3 className='text-sm font-medium line-clamp-3'>{product.description}</h3>
        <p className='text-gray-600 font-semibold'><Link href='/'>{product.brand}</Link></p>
        <p className='flex gap-x-2 items-center'>
          <span className='font-bold text-green-700 text-[20px]'>{formatNumber(product.price)}</span>
          <span className='text-gray-600 line-through text-xs'>{formatNumber(product?.offerPrice ?? 400)}</span>
        </p>
        {disableActions == false && (
          <div className='flex gap-x-2'>
            {favs.findIndex(item => item === product.id) != -1  ? (
              <Button className='basis-1/3' variant='outline' size='icon' onClick={ () => dispatch(removeToFavourites({ id: product.id })) }><HeartCrack className='size-5' /></Button>
            ): (
              <Button className='basis-1/3' variant='outline' size='icon' onClick={ () => dispatch(addToFavourites({ id: product.id })) }><Heart className='size-5' /></Button>
            )}
            {cart.findIndex(item => item.productId === product.id) != -1 ? (
              <Button className='basis-1/3' variant='outline' size='icon' onClick={ () => dispatch(remove({ id: product.id })) }><Check className='size-5' /></Button>
            ): (
              <Button className='basis-1/3' variant='outline' size='icon' onClick={ () => dispatch(add({ qty: 1, color: "Red", productId: product.id, productData: product })) }><ShoppingCart className='size-5' /></Button>
            )}
            <Button onClick={() => router.push(`/products/${product.id}`)} className='basis-1/3' variant='outline' size='icon'><Eye className='size-5' /></Button>
          </div>          
        )}
      </div>
    </div>
  )
}