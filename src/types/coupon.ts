export type CouponType = {
  id: number,
  coupon: string,
  discount: number,
  allowed: boolean,
  usages: number,
  createdAt?: string,
  updatedAt?: string
}