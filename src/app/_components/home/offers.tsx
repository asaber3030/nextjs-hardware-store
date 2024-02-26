"use client";

import { useQuery } from "@tanstack/react-query";
import { HomeSectionDisplay } from "./section";
import { getNumberOfProducts } from "@/actions/products";

export const OffersProducts = () => {

  const productsQuery = useQuery({
    queryKey: ['products', { limit: 15 }],
    queryFn: ({ queryKey }: any) => getNumberOfProducts(queryKey[1].limit)
  })

  return (
    <HomeSectionDisplay title='Offers' products={productsQuery.data?.products} isLoading={productsQuery.isLoading} />
  );
}
 