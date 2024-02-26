import * as z from 'zod'

export const AddressSchema = z.object({
  address: z.string().min(4, { message: 'Address cannot be less than 4 characters' }),
  city: z.string().min(1, { message: "City field is required!" }),
  phone: z.string().min(11, { message: "Phone number cannot be less than 11 number" }),
  homePhone: z.optional(z.string()),
  floor: z.optional(z.string()),
  main: z.boolean()
})