"use client";

import { getProductsIn } from "@/actions/products"

import { FavouriteItem } from "./favourite-item"
import { Product } from "@/types/product"

import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "../empty-state";

import { useAppSelector } from "@/store/store";
import { useQuery } from "@tanstack/react-query"

export const ListFavourites = ({ cookie }: { cookie: string | undefined }) => {

  //@ts-ignore
  const favs = useAppSelector((state) => state.favourites)

  const favsQuery = useQuery({
    queryKey: ['products', 'in'],
    queryFn: () => getProductsIn(favs),
    refetchInterval: 1000,
  })

  if (favsQuery.isLoading) { return <ListFavourites.Loading /> }

  return (
    <div className='flex justify-center flex-col gap-y-2 mt-4'>
      {favsQuery.data?.length > 0 ? (
        <>
          {favsQuery.data.map((product: Product) => (
            <FavouriteItem product={product} />
          ))}
        </>
      ): (
        <ListFavourites.Empty />
      )}
    </div>
  )
}

ListFavourites.Empty = () => {
  return (
    <div className='flex flex-col gap-y-2 mt-4'>
      <EmptyState label="No items in favourites!" />
    </div>
  )
}

ListFavourites.Loading = () => {
  return (
    <div className='flex flex-col gap-y-2 mt-4'>
      <Skeleton className='w-full h-[150px]' />
      <Skeleton className='w-full h-[150px]' />
      <Skeleton className='w-full h-[150px]' />
    </div>
  )
}