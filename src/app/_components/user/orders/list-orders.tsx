"use client";

import Link from "next/link";

import { OrderStatus, OrderType } from "@/types/order";

import { cancelUserOrder, getUserOrders } from "@/actions/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { cn, formatNumber, orderStatusText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShowOrderStatusBars } from "./show-bars-status";
import { toast } from "sonner";
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
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "../../empty-state";
import { Eye, Printer, X } from "lucide-react";
export const ListOrdersComponent = () => {

  const router = useRouter()

  const orders = useQuery({
    queryKey: ['orders', 'user'],
    queryFn: () => getUserOrders()
  })

  const cancelOrderMutation = useMutation({
    mutationFn: (id: number) => cancelUserOrder(id),
    onError: (err) => {
      console.log(err.message)
    },
    onSuccess: () => {
      toast.message("Order has been cancelled!")
      router.push('/orders')
    }
  })

  const handleCancel = (id: number) => {
    cancelOrderMutation.mutate(id)
    orders.refetch()
  }

  if (orders.data?.length === 0) return <ListOrdersComponent.Empty />
  if (orders.isLoading) return <ListOrdersComponent.Loading />

  return (
    <div className='mt-2 grid grid-cols-4 gap-2'>
      {orders.data.map((order: OrderType) => {
        let orderItemsLength = 0;
        order.items?.map((item) => {
          orderItemsLength += item.quantity
        })
        return (
          <div key={order.id} className='p-4 min-w-[22%] rounded-md bg-gray-100 ring-1 ring-gray-200 pb-2'>
            <div>
              <h2 className='text-[20px] mb-5 hover:underline text-gray-700 text-center font-semibold'><Link href={`/orders/${order.id}`}>Order ID: <b>#{order.id}</b></Link></h2>
              <ShowOrderStatusBars status={order.statusNumber} />
              <ul>
                <li className='flex items-center justify-between py-3 pb-0'><span>Order items</span> <span className="font-bold">{orderItemsLength} piece(s)</span></li>
                <li className='flex items-center justify-between py-3 pb-0'><span>Used Coupon</span> <span className="font-bold">{order.couponId === 1 ? "No Coupon Used" : `${order.coupon?.coupon} / ${order.coupon?.discount}%`}</span></li>
                <li className='flex items-center justify-between py-3 pb-0'><span>Discount Value</span> <span className="font-bold">{formatNumber(order.discountValue)}</span></li>
                <li className='flex items-center justify-between py-3 pb-0'><span>Delivery</span> <span className="font-bold">{formatNumber(100)}</span></li>
                <li className='flex items-center justify-between py-3 pb-0'><span>Total Price</span> <span className="font-bold">{formatNumber(order.overall)}</span></li>
              </ul>
              <div className='border-t border-gray-100 text-2xl text-center text-green-700 my-4'>
                {formatNumber(order.overall - order.discountValue)}
              </div>
              <div className='grid grid-flow-col col-span-3 items-center gap-x-1 pt-2 border-t mt-2 mb-0 pb-0'>
                {order.statusNumber === 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size='sm' className='basis-1/3 h-8 text-xs' variant='default'><X className='mr-2 size-5' /> Cancel</Button>
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
                        <AlertDialogAction onClick={ () => handleCancel(order.id) }>Submit</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button onClick={ () => router.push(`/orders/${order.id}`) } size='sm' className='basis-1/3 h-8 text-xs' variant='default'><Eye className='mr-2 size-5' /> View</Button>
                <Button onClick={ () => router.push(`/orders/${order.id}`) } size='sm' className='basis-1/3 h-8 text-xs' variant='default'><Printer className='mr-2 size-5' /> Print</Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

ListOrdersComponent.Loading = () => {
  return (
    <div className='mt-2 grid grid-flow-col col-span-4 gap-2'>
      <Skeleton className='p-4 max-w-[400px] h-[400px] rounded-md bg-gray-200 ring-1 ring-gray-300 my-2' />

      <Skeleton className='p-4 max-w-[400px] h-[400px] rounded-md bg-gray-200 ring-1 ring-gray-300 my-2' />

      <Skeleton className='p-4 max-w-[400px] h-[400px] rounded-md bg-gray-200 ring-1 ring-gray-300 my-2' />

      <Skeleton className='p-4 max-w-[400px] h-[400px] rounded-md bg-gray-200 ring-1 ring-gray-300 my-2' />
   </div>
  )
}

ListOrdersComponent.Empty = () => {
  return (
    <EmptyState label="No Orders available!" />
  )
}