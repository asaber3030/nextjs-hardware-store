import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartType, Product } from "@/types";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

type UpdateData = {
  product: Product,
  quantity?: number,
  color?: string
}

let initialState: CartType[];
if (typeof window !== "undefined") {
  initialState = JSON.parse(window.localStorage.getItem('cartitems') ?? "[]")
} else {
  initialState = JSON.parse("[]")
}

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    add: (state, action: PayloadAction<CartType>) => {
      if (state.findIndex(item => item.productId === action.payload.productId) === -1) {
        state.push(action.payload)
        toast.success("Product added to cart!")
        if (typeof window !== "undefined") {
          window.localStorage.setItem('cartitems', JSON.stringify(state))
        }
      }
    },

    remove: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter(item => item.productId != action.payload.id)
      if (typeof window !== "undefined") {
        window.localStorage.setItem('cartitems', JSON.stringify(state))
      }
      toast.warning("Product removed from cart!")
      return state
    },

    plus: (state, action: PayloadAction<UpdateData>) => {
      let i = state.findIndex(item => item.productId === action.payload.product.id)
      if (i != -1) {
        if (state[i].qty < action.payload.product.qty) {
          state[i].qty = state[i].qty + (action.payload.quantity ?? 1)
        }
      } else {
        toast.message("Add to cart first!")
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem('cartitems', JSON.stringify(state))
      }
      return state
    },
    
    minus: (state, action: PayloadAction<UpdateData>) => {
      let i = state.findIndex(item => item.productId === action.payload.product.id)
      if (i != -1) {
        if (state[i].qty != 1) {
          state[i].qty = state[i].qty - (action.payload.quantity ?? 1)
        }
      } else {
        toast.message("Add to cart first!")
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem('cartitems', JSON.stringify(state))
      }
      return state
    },

    changeColor: (state, action: PayloadAction<UpdateData>) => {
      let i = state.findIndex(item => item.productId === action.payload.product.id)
      if (i != -1) {
        state[i].color = action.payload.color ?? "Red"
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem('cartitems', JSON.stringify(state))
      }
      return state
    },
  },
})

export const { add, remove, plus, minus, changeColor } = cartSlice.actions

export const cartReducer = cartSlice.reducer
