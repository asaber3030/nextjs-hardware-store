import { CouponType, Product } from "."

export type OrderType = {
  id: number,
  userId: number,
  couponId: number,
  status: string,
  discountValue: number,
  overall: number,
  createdAt?: string,
  updatedAt?: string,
  arriveIn?: string,
  statusNumber: number,
  items?: OrderItemType[],
  coupon: CouponType
}

export type OrderItemType = {
  id: number,
  productId: number,
  product: Product,
  orderId: number,
  unitPrice: number,
  totalPrice: number,
  quantity: number,
  order: OrderType,
  color: string
}

export enum OrderStatus {
  Ordered = "Just Ordered",
  OnWay = "Shipped",
  Almost = "Almost",
  Done = "Delivered"
}