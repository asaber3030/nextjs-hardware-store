import * as z from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(8),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: "Invalid egyptian number provided" }),
})

export const UserUpdateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: "Invalid egyptian number provided" }),
})

export const PasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required!' }),
  newPassword: z.string().min(8, { message: 'New Password must be at least 8 letters' }),
})