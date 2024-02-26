import { OrderStatus } from "@/types/order"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateArray(length: number = 10) {
  return Array.from({ length })
}

export function formatNumber(number: number, options?: any) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP'
  }).format(number)
}

export function orderStatusText(orderStatus: number): string {
  const statusText = orderStatus === 0 ? OrderStatus.Ordered : orderStatus === 1 ? OrderStatus.OnWay : orderStatus == 2 ? OrderStatus.Almost : orderStatus === 3 ? OrderStatus.Done : "Undefined"
  return statusText
}