"use client"

import Link from "next/link"
import Image from 'next/image'

import { cancelUserOrder, getUserSpecificOrder } from "@/actions/user"

import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { diffForHuman, formatNumber } from "@/lib/utils"
import { toast } from "sonner"

import { OrderItemType } from "@/types/order"

import { ShowOrderStatusBars } from "./show-bars-status"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"

interface Params {
  params: {
    id: number
  } 
}

export const ViewOrderComponent = ({ params }: Params) => {

  const router = useRouter()

  const { data: order, isLoading } = useQuery({
    queryKey: ['orders', 'user', params.id],
    queryFn: () => getUserSpecificOrder(params.id)
  })

  const cancelOrderMutation = useMutation({
    mutationFn: () => cancelUserOrder(params.id),
    onError: (err) => {
      console.log(err.message)
    },
    onSuccess: () => {
      toast.message("Order has been cancelled!")
      router.push('/orders')
    }
  })

  const handleCancel = () => {
    cancelOrderMutation.mutate()
  }

  if (isLoading) return <ViewOrderComponent.Loading />

  return (
    <div>
      <h1 className="text-2xl font-semibold">Order <b>#{order.id}</b> <span className='text-xs text-gray-400 font-medium'>{order.items.length} item</span></h1>
      <Separator className="mb-3" />

      <div className='grid grid-flow-col gap-4 grid-cols-8'>
        
        {/* Products */}
        <div className='grid grid-flow-row-dense grid-cols-3 gap-2 h-4 col-span-6'>
          {order.items.map((item: OrderItemType) => (
            <div key={item.id} className='bg-gray-100 px-4 py-2 rounded-md shadow-sm ring-1 ring-gray-200'>
              <Image src={item.product.image} alt="Product" width={100} height={100} className='object-fit mx-auto my-4 w-[150px] h-[150px] object-contain' />
              <h4 className="text-lg font-semibold hover:underline capitalize line-clamp-1"><Link href={`/products/${item.product.id}`}>{item.product.name}</Link></h4>
              <ul className='mt-3'>
                <li className='py-1 flex items-center justify-between text-sm'><span>Unit Price</span> <span className='font-bold text-green-700'>{formatNumber(item.unitPrice)}</span></li>
                <li className='py-1 flex items-center justify-between text-sm'><span>Quantity</span> <span className='font-bold'>{item.quantity}</span></li>
                <li className='py-1 flex items-center justify-between text-sm'><span>Color</span> <span className='font-bold'>{item.color}</span></li>
                <li className='py-1 flex items-center justify-between text-sm'><span>Overall Product</span> <span className='font-bold text-green-700'>{formatNumber(item.quantity * item.unitPrice)}</span></li>
              </ul>
            </div>
          ))}
          
        </div>

        {/* Order Details */}
        <div className='col-span-2'>

          <div className="bg-gray-100 rounded-md shadow-md ring-1 ring-gray-200 p-4">
            
            <div className='border-t border-gray-100 text-2xl text-center text-green-700 my-4'>
              {formatNumber(order.overall - order.discountValue)}
            </div>
            
            <ShowOrderStatusBars status={order.statusNumber} />

            <ul>
              <li className='flex items-center justify-between py-3 pb-0'><span>Order items</span> <span className="font-bold">{7} piece(s)</span></li>
              <li className='flex items-center justify-between py-3 pb-0'><span>Used Coupon</span> <span className="font-bold">{order.couponId === 1 ? "No Coupon Used" : `${order.coupon?.coupon} / ${order.coupon?.discount}%`}</span></li>
              <li className='flex items-center justify-between py-3 pb-0'><span>Discount Value</span> <span className="font-bold">{formatNumber(order.discountValue)}</span></li>
              <li className='flex items-center justify-between py-3 pb-0'><span>Total Price</span> <span className="font-bold">{formatNumber(order.overall)}</span></li>
              <li className='flex items-center justify-between py-3 pb-0'><span>Ordered In</span> <span className="font-bold">{diffForHuman(order.createdAt)}</span></li>
            </ul>

          </div>

          {order.statusNumber == 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
              <Button className='w-full mt-2' variant="default">Cancel Order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Do you want to cancel this order?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Once you click submit this action cannot be reversed so you will be forced to order from the beginning
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

      </div>
      
    </div>
    
  )
}

ViewOrderComponent.Loading = () => {

  const productSkeletonStyle = 'h-[300px] px-4 py-2 rounded-md shadow-sm ring-1 ring-gray-200'

  return (
    <div>
      <h1 className="text-2xl font-semibold flex gap-x-2 items-center">Order #<Skeleton className='h-2 w-[50px]' /></h1>
      <Separator className="mb-3" />
      <div className="grid grid-flow-col gap-4 grid-cols-8">
        <div className="grid grid-flow-row-dense grid-cols-4 gap-2 h-4 col-span-6">
          <Skeleton className={productSkeletonStyle} />
          <Skeleton className={productSkeletonStyle} />
          <Skeleton className={productSkeletonStyle} />
          <Skeleton className={productSkeletonStyle} />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-[320px]" />
          <Skeleton className="h-[40px] mt-2" />
        </div>
      </div>
    </div>
  )
}
