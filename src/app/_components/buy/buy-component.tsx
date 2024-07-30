"use client"

// NextJS
import Image from "next/image"
import Link from "next/link"

// Helpers & Actions
import { getCouponByName } from "@/actions/coupons"
import { saveOrder, userHaveMainAddress } from "@/actions/user"
import { formatNumber } from "@/lib/utils"
import { toast } from "sonner"
import { remove, changeColor, plus, minus } from "@/store/slices/cart"

// Types
import { CartType } from "@/types/cart"
import { Product } from "@/types/product"

// Hooks
import { useUser } from "@/hooks"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { useRouter } from "next/navigation"

// Icons + UI Components
import { AlertTriangle, Check, Minus, Plus, ShoppingBasket, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader } from "../loader"
import { Select, SelectContent,  SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


export const CompleteBuyComponent = () => {

  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [coupon, setCoupon] = useState("")
  const [couponStatus, setCouponStatus] = useState(false)

  const { user, pending } = useUser();

  const haveMainAddress = useQuery({
    queryKey: ['user', 'addresses', 'have-main'],
    queryFn: () => userHaveMainAddress()
  })
  const couponMutation = useMutation({
    mutationFn: (coupon: string) => getCouponByName(coupon),
    onSuccess: (data) => {
      if (data) {
        setCouponStatus(true)
        toast.message("Coupon Added to order!")
      } else {
        toast.message("Coupon Not Found!")
      }
    }
  })
  const saveOrderMutation = useMutation({
    mutationFn: (data: any) => saveOrder(data),
    onSuccess:(data) => {
      toast.message(data?.message ?? "Something went wrong!")
      router.push('/orders')
    }
  })

  // Values
  let sum = 0;
  let totalQuantity = 0;

  let prices = cart.map(item => {
    sum += item.productData.price * item.qty
    totalQuantity += item.qty
  })

  // Actions
  const handleColorChange = (color: string, product: Product) => {
    dispatch(changeColor({ product, color, quantity: 1 }))
  }
  const placeOrder = () => {
    saveOrderMutation.mutate({
      cart: cart,
      sum,
      coupon: couponMutation.data ?? 1,
      delivery: 100
    })
  }
  const handleFindCoupon = () => {
    couponMutation.mutate(coupon)
  }

  if (pending) return <CompleteBuyComponent.Loading />

  if (cart.length === 0) return <CompleteBuyComponent.EmptyState />

  return (
    <div className='flex gap-x-6'>
      {/* List Items */}
      <div className='w-full flex flex-col gap-y-0 divide-y'>

        <h1 className="text-xl font-bold pb-0 mb-0">Cart Items</h1>

        {cart.map((product: CartType) => {

          const colors = product?.productData?.color?.split(",")

          return (
            <div className='py-4 flex items-center gap-x-4'>
              <div>
                <Image 
                  width={100}
                  height={100}
                  alt="Product image"
                  className='object-contain'
                  src={product.productData.image}
                />
              </div>
              <div className='w-full relative'>
                <h1 className='line-clamp-1 w-fit font-semibold text-xl capitalize hover:underline'><Link href={`/products/${product.productData.id}`}>{product.productData.name}</Link></h1>
                <p className='text-sm w-fit text-gray-400 hover:underline'><Link href={`/categories/${product.productData.categoryId}`}>{product.productData.category?.name}</Link></p>
                <p className='text-lg font-bold text-green-700'>{formatNumber(product.productData.price * (product?.qty ?? 1))}</p>
                <Select defaultValue={product?.color} onValueChange={ e => handleColorChange(e, product.productData)}>
                  <SelectTrigger className="w-[180px] h-7">
                    <SelectValue defaultValue={product?.color} placeholder="Color?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {colors?.map(item => (
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className='flex items-center gap-x-2 mt-2'>
                  <Button onClick={() => dispatch(minus({ product: product?.productData, quantity: 1 }))} className='w-7 h-7' variant='outline' size='icon'><Minus className='w-4 h-4' /></Button>
                  <span className='font-bold text-xs'>{product?.qty}</span>
                  <Button onClick={() => dispatch(plus({ product: product?.productData, quantity: 1 }))} className='w-7 h-7' variant='outline' size='icon'><Plus className='w-4 h-4' /></Button>
                </div>
                <div className='absolute right-0 bottom-1'>
                  <Button onClick={ () => dispatch(remove({ id: product?.productId })) } className='h-8.5 font-bold text-sm px-3' variant='outline'><X className='size-5 mr-2' /> Remove</Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      
      {/* Show Price */}
      {user && (
        <div className='bg-gray-100 h-fit p-4 rounded-sm shadow-sm ring-1 ring-gray-200 min-w-[500px]'>
          <h1 className="text-xl font-bold">Order Summary</h1>
          <Separator />
          <ul className='pt-0 py-4 pb-0'>
            <li className='items-center border-b border-b-gray-200 flex py-2 justify-between'>
              <span>Total Items</span>
              <span>{totalQuantity} product(s)</span>
            </li>

            <li className='items-center border-b border-b-gray-200 flex py-2 justify-between'>
              <span>Sub Price</span>
              <span className="text-green-700 font-semibold">
                {formatNumber(sum)}
              </span>
            </li>

            <li className='items-center border-b border-b-gray-200 flex py-2 justify-between'>
              <span>Delivery Fee</span>
              <span className="text-green-700 font-semibold">
                {formatNumber(100)}
              </span>
            </li>

            <li className='items-center border-b border-b-gray-200 flex py-2 justify-between'>
              <span>Total</span>
              <span className="text-green-700 font-semibold">
                {formatNumber(100 + sum)}
              </span>
            </li>

            {couponStatus && (
              <>
                <li className='py-2 flex border-b border-b-gray-200 justify-between items-center gap-x-2'>
                  <span>Discount Percentage</span>
                  <span className="font-bold">{couponMutation.data.discount}%</span>
                </li>
                <li className='py-2 flex border-b border-b-gray-200 justify-between items-center gap-x-2'>
                  <span>Coupon Discount Value</span>
                  <span className='text-green-900 font-bold'>{formatNumber((couponMutation.data.discount / 100) * (sum + 100))}</span>
                </li>

                <li className='py-2 flex justify-between items-center gap-x-2'>
                  <span>Total Amount</span>
                  <span className='text-green-900 font-bold'>{formatNumber((sum + 100) - ((couponMutation.data.discount) / 100) * (sum + 100) )}</span>
                </li>
              </>
            )}
            
            {haveMainAddress.isLoading ? (
              <li className='mt-8 border-y-0 flex items-center justify-center'>
                <Loader />
              </li>
            ): (
              <>
                {haveMainAddress.data.found ? (
                  <>
                    <li className='py-2 pb-0 flex items-center gap-x-2'>
                      <Input
                        placeholder='Coupon'
                        value={coupon as any}
                        onChange={ e => setCoupon(e.target.value as any) }
                        disabled={couponMutation.data ? true : false}
                      />
                      <Button disabled={couponMutation.data ? true : false} onClick={handleFindCoupon}>Apply</Button>
                    </li>

                    <li className='py-2 pb-0 mt-2'>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size='sm' className='w-full'>Place Order</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure that you want to order this items?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You can later cancel order before it being shipped for you.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={placeOrder}>Submit</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                  </>
                ) : (
                  <li className='py-2 pb-0 flex items-center gap-x-2 font-bold'><Button variant='outline'><Link className='py-2 flex items-center gap-x-2 font-bold' href={`/addresses/create`}><AlertTriangle /> You don't have a main address, Add one.</Link></Button></li>
                )}  
              </>
            )}

          </ul>

        </div>
      )}
      

    </div>
  )
}

CompleteBuyComponent.EmptyState = () => {
  return (
    <div className="flex items-center justify-center flex-col w-[800px] rounded-sm shadow-md ring-1 ring-gray-100 m-auto bg-gray-50 p-10 py-4 text-center">
      <ShoppingBasket className="w-[100px] h-[100px] mb-5" />
      <h1 className="text-3xl font-bold">You havn't added anything to cart yet!</h1>
      <div className='flex gap-1 mt-2'>
        <Link href='/products'><Button><Check className='mr-2' /> Continue Shopping</Button></Link>
        <Link href='/orders'><Button variant='success'><ShoppingBasket className='mr-2' /> My Orders</Button></Link>
      </div>
    </div>
  )
}

CompleteBuyComponent.Loading = () => {
  return (
    <div className='flex gap-x-6'>
      <div className='w-full flex flex-col gap-y-2 divide-y'>
        <h1 className="text-xl font-bold pb-0 mb-0">Cart Items</h1>
        <Skeleton className='bg-gray-200 h-[100px] rounded-md shadow-md' />
        <Skeleton className='bg-gray-200 h-[100px] rounded-md shadow-md' />
        <Skeleton className='bg-gray-200 h-[100px] rounded-md shadow-md' />
        <Skeleton className='bg-gray-200 h-[100px] rounded-md shadow-md' />
      </div>
      <div>
        <Skeleton className='bg-gray-200 h-[250px] p-4 rounded-sm shadow-sm ring-1 ring-gray-200 min-w-[700px] max-w-[700px]' />
        <Skeleton className='bg-gray-200 mt-1 h-[50px] p-4 rounded-sm shadow-sm ring-1 ring-gray-200 min-w-[700px] max-w-[700px]' />
      </div>
    </div>
  )
}