"use client";

import { useQuery } from "@tanstack/react-query";
import { HomeSectionDisplay } from "./section";
import { getNumberOfProducts } from "@/actions/products";

export const BestSellerProducts = () => {

  const productsQuery = useQuery({
    queryKey: ['products', { limit: 15 }],
    queryFn: ({ queryKey }: any) => getNumberOfProducts(queryKey[1].limit)
  })

  return (
    <HomeSectionDisplay title='Best Seller' products={productsQuery.data?.products} isLoading={productsQuery.isLoading} />
  );
}
 