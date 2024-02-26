import { Product } from "./product"

export type ProductImageType = {
  id: number
  location: string
  productId: number
  product?: Product
  createdAt?: string
  updatedAt?: string
}