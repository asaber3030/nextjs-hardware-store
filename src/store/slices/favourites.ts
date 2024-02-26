import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from 'cookies-next';
import { toast } from "sonner";

const initialState: number[] = JSON.parse(getCookie('favourites') ?? "[]")

export const favouritesSlice = createSlice({
  initialState,
  name: "favourites",
  reducers: {
    addToFavourites: (state, action: PayloadAction<{ id: number }>) => {
      state.push(action.payload.id)
      setCookie('favourites', JSON.stringify(state))
      toast.success("Added to favourites")
    },
    removeToFavourites: (state, action: PayloadAction<{ id: number }>) => {
      if (state.findIndex(item => item == action.payload.id) != -1) {
        state = state.filter(item => item != action.payload.id)
      }
      setCookie('favourites', JSON.stringify(state))
      toast.warning("Removed from favourites")
      return state
    },
  },
})

export const { addToFavourites, removeToFavourites } = favouritesSlice.actions

export const favouritesReducer = favouritesSlice.reducer
