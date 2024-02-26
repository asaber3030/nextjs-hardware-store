import { AddressType } from "./address"

export type UserType = {
  id: number
  name: string
  email: string
  phone: string
  createdAt?: string
  updatedAt?: string
  addresses?: AddressType[]
}