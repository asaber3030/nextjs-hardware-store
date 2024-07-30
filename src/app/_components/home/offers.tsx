"use client";

import { useQuery } from "@tanstack/react-query";
import { HomeSectionDisplay } from "./section";
import { getNumberOfProducts } from "@/actions/products";

import { Product } from "@/types";

export const OffersProducts = ({ products }: { products: Product[] }) => {
  return (
    <HomeSectionDisplay title='Offers' products={products} isLoading={false} />
  );
}
 