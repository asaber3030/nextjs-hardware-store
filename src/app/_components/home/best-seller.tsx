"use client";

import { useQuery } from "@tanstack/react-query";
import { HomeSectionDisplay } from "./section";
import { getNumberOfProducts } from "@/actions/products";
import { Product } from "@/types";

export const BestSellerProducts = ({ products }: { products: Product[] }) => {
  return (
    <HomeSectionDisplay title='Best Seller' products={products} isLoading={false} />
  );
}
 