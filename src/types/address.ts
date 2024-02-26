import { UserType } from "./user"

export type AddressType = {
  id: number,
  address: string,
  city: string,
  phone: string,
  homePhone?: string,
  userId: number,
  floor?: string,
  user?: UserType,
  main?: boolean
}