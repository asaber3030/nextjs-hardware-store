import { Product } from "."

export type CartType = {
  productId: number,
  qty: number,
  color: string,
  productData: Product
}