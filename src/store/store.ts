import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { cartReducer } from './slices/cart'
import { favouritesReducer } from './slices/favourites';

export const store = configureStore({
  reducer: { cart: cartReducer, favourites: favouritesReducer }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;