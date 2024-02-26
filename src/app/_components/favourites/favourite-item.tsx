"use client";

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { HeartCrack } from "lucide-react"

import { formatNumber } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { removeToFavourites } from "@/store/slices/favourites";

interface Props {
  product: Product
}

export const FavouriteItem = ({ product }: Props) => {

  const favs = useAppSelector((state) => state.favourites)

  const dispatch = useAppDispatch()

  return (
    <div className='flex bg-gray-100 ring-1 ring-gray-300 shadow-sm rounded-sm py-3 relative'>
      <div className='relative flex items-center justify-center pr-3 border-r-2 border-r-gray-300 mr-5 w-[150px] h-[150px]'>
        <Image src={product.image} alt="Product image" width={100} height={100} className='object-fit max-w-[100%] max-h-[100%]' />
      </div>
      <div className='w-full p-4'>
        <Link href={`/products/${product.id}`} className='line-clamp-1 font-bold text-lg capitalize pr-4'>{product.name}</Link>
        <Link className='text-gray-400 text-sm' href={`/categories/${product.categoryId}`}>{product.category?.name}</Link>
        <p className="text-green-700 font-bold text-[18px] mt-2">{formatNumber(product.price)}</p>
        <div className='flex items-end justify-end'>
          <Button onClick={ () => dispatch(removeToFavourites({ id: product.id })) } size='icon' variant='destructive'><HeartCrack /></Button>
        </div>
      </div>
    </div>
  )
}