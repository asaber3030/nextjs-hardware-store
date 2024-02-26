import { CategoryType } from "./category"
import { ProductDetailsType } from "./product-details"

export type Product = {
  id: number,
  name: string,
  description?: string,
  price: number,
  offerPrice?: number,
  image: string,
  brand?: string,
  color?: string,
  keywords?: string,
  categoryId?: number,
  qty: number,
  category?: CategoryType,
  productDetails: ProductDetailsType[],
  editor: string
}