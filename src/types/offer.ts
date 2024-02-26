import { Product } from "."

export type OfferType = {
  id: number          
  productId: number   
  product: Product    
  endsIn: string      
  offerPrice: number       
  title: string       
  description: string 
  createdAt: string   
  updatedAt: string   
}