import { useCookies } from "next-client-cookies";
import { useState } from "react";

export function useFavourites(productId?: number) {

  const cookies = useCookies()
  let favourites: number[] = JSON.parse(cookies.get('favourites') ?? "[]")

  let currentExists = favourites.findIndex(product => product == productId)

  function add(productId: number) {
    const findId = favourites.findIndex(item => item == productId)
    if (findId == -1) {
      favourites.push(productId)
      cookies.set('favourites', JSON.stringify(favourites))
    }

  }

  function remove(productId: number) {
    const findId = favourites.findIndex(item => item == productId)
    if (findId != -1) {
      favourites = favourites.filter(item => item != productId)
      cookies.set('favourites', JSON.stringify(favourites))
    }
  }

  return { favourites, remove, add, currentExists }

}