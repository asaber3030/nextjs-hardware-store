"use client";

import { Percent } from "lucide-react"
import { OfferItem } from "./offer-item"

import { useQuery } from "@tanstack/react-query"

import { getOffers } from "@/actions/products"
import { OfferType } from "@/types/offer";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "../empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export const OffersListComponent = () => {

  const offers = useQuery({
    queryKey: ['offers'],
    queryFn: () => getOffers()
  })

  return (
    <div className='px-14 py-4'>
      <h1 className="text-3xl font-bold flex gap-2 items-center"><Percent className='size-7' /> Offers</h1>
      <Separator className='mb-4 mt-1' />
      {offers.isLoading && (
        <OffersListComponent.Loading />
      )}
      {!offers.isLoading && offers.data?.length === 0 && (
        <OffersListComponent.Empty />
      )}
      {!offers.isLoading && offers.data.length > 0 && (
        <div className='grid grid-flow-row-dense gap-2 grid-cols-4'>
          {offers.data.map((offer: OfferType) => (
            <OfferItem offer={offer} />
          ))}
        </div>
      )}
    </div>
  )
}

OffersListComponent.Loading = () => {
  return (
    <div className='grid grid-flow-row-dense gap-2 grid-cols-4'>
      <Skeleton className='h-[500px]' />
      <Skeleton className='h-[500px]' />
      <Skeleton className='h-[500px]' />
      <Skeleton className='h-[500px]' />
    </div>
  )
}

OffersListComponent.Empty = () => {
  return (
    <EmptyState label="No Offers available now!" />
  )
}