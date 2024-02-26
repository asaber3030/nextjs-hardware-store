import { CartType } from "@/types/cart";
import { Product } from "@/types/product";

import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useCart() {

  const cookies = useCookies()
  let [cart, setCart] = useState<CartType[]>(JSON.parse(cookies.get('cart') ?? "[]"))

  const add = (product: Product, quantity: number = 1, defColor?: string) => {
    const specificColor = color(product, defColor)
    
    const currentExists = find(product.id)

    if (!currentExists) {
      setCart((old) => [...old, {
        productId: product.id,
        qty: quantity,
        color: specificColor,
        productData: product
      }])
      toast.success("Added to cart!")
    }

    save()

  }
  
  const remove = (product: Product) => {
    const currentExists = find(product.id)

    if (currentExists) {
      setCart((old) => {
        return old.filter(item => item.productId != product.id)
      })
      toast.warning("Removed from cart!")
    }
    save()

  }

  const plus = (product: Product, quantity: number) => {
    const nextCart = cart.map((item: CartType, idx: number) => {
      if (item.productId === product.id) {
        if (item.qty < product.qty) {
          return { ...item, qty: item.qty + quantity }
        } else {
          toast.warning("Maximum Quantity reached of selected product!")
          return { ...item }
        }
      } else {
        return { ...item }
      }
    })
    setCart(nextCart)
    save()

  }

  const minus = (product: Product, quantity: number) => {
    const nextCart = cart.map((item: CartType, idx: number) => {
      if (item.productId === product.id) {
        if (item.qty != 1) {
          return { ...item, qty: item.qty - quantity }
        } else {
          toast.warning("Cannot decrease product quantity to 0 :)")
          return { ...item }
        }
      } else {
        return { ...item }
      }
    })

    setCart(nextCart)
    save()

  }

  const changeColor = (product: Product, color: string) => {
    const nextCart = cart.map((item: CartType, idx: number) => {
      if (item.productId === product.id) {
        return { ...item, color }
      } else {
        return { ...item }
      }
    })
    setCart(nextCart)
    save()

  }

  const find = (id: number) => {
    return cart.find((x: CartType) => x.productId == id)
  }

  const findIndex = (id: number) => {
    return cart.findIndex((x: CartType) => x.productId == id)
  }

  const color = (product: Product, color?: string) => {
    return color ? color : product.color?.split(",")[0]
  }

  const save = () => {
    cookies.set('cart', JSON.stringify(cart), {
      expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 365 * 365)
    })
  }

  const empty = () => {
    cookies.set('cart', JSON.stringify("[]"), {
      expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 365 * 365)
    })
  }

  useEffect(() => {
    save()
  }, [cart])

  return { 
    cart,
    setCart,
    save, 
    plus, 
    minus, 
    add, 
    remove, 
    findIndex, 
    find,
    empty,
    changeColor
  }
}