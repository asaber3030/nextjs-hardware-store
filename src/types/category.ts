import { Product } from "./product"

export type CategoryType = {
  id: number,
  name: string,
  icon: string,
  previewImage: string,
  keywords?: string,
  createdAt?: string,
  updatedAt?: string,
  Products: Product[]
}