"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCartIcon, X } from "lucide-react"

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { plus, minus, remove } from "@/store/slices/cart";

import { CartType } from "@/types/cart";

import { formatNumber } from "@/lib/utils";
import { EmptyState } from "./empty-state";

export const ShoppingCart = () => {

  const router = useRouter()

  const cartState = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="navbar" size='icon'><ShoppingCartIcon /></Button>
      </DrawerTrigger>
      <DrawerContent className='w-[400px] h-full right-0'>
        <div className="overflow-y-scroll">
          <DrawerHeader>
            <DrawerTitle>My Shopping Cart</DrawerTitle>
            <DrawerDescription>Update or remove items</DrawerDescription>
          </DrawerHeader>
            
          <div className="flex gap-y-2 divide-y flex-col my-3">

            {cartState.length === 0 && (
              <ShoppingCart.Empty />
            )}

            {cartState.map((item: CartType)=> (
              <div key={item.productData.id} className='flex gap-x-4 items-center px-2 pt-3 group'>
                <div className='w-16'>
                  <Image src={item.productData.image} width={100} height={100} alt="Product image" />
                </div>
                <div className='w-full'>
                  <h3 className='text-sm line-clamp-1 font-bold flex justify-between items-center w-full capitalize'>
                    <Link className='text-blue-900 line-clamp-1 hover:text-blue-800' href={`/products/${item.productData.id}`}>{item.productData.name}</Link> 
                    <div className='self-end'>
                      <Button onClick={() => dispatch(remove({ id: item.productData.id }))} size='icon' variant='ghost' className='size-8'><X className='size-4' /></Button>
                    </div>
                  </h3>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Button size='sm' className='rounded-none border-r-0 p-1 size-8' variant='outline' onClick={() => dispatch(minus({ product: item.productData, quantity: 1 }))}><Minus className='w-4 h-4' /></Button>
                      <div className='px-3 py-2 border-t border-t-gray-200 border-b flex items-center justify-center text-xs font-bold border-b-gray-200 size-8'>{item?.qty}</div>
                      <Button size='sm' className='rounded-none border-l-0 p-1 size-8' variant='outline' onClick={() => dispatch(plus({ product: item.productData, quantity: 1 }))}><Plus className='w-4 h-4' /></Button>
                    </div>
                    <span className='text-green-700 font-bold text-sm'>{formatNumber(item.productData.price * (item?.qty))}</span>
                  </div>
                </div>
             </div>
            ))}
          </div>
         
          <DrawerFooter>
            <Button size='sm' onClick={ () => router.push('/buy') }>Complete Purchase</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>


  )
}

ShoppingCart.Empty = () => {
  return (
    <div className="mx-4">
      <EmptyState label={"No Products in Cart!"} />
    </div>
  )
}