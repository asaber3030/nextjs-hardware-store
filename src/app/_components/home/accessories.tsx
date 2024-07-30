"use client";

import { useQuery } from "@tanstack/react-query";
import { HomeSectionDisplay } from "./section";
import { getNumberOfProducts } from "@/actions/products";
import { Product } from "@/types";

export const AccessoriesProducts = ({ products }: { products: Product[] }) => {
  return (
    <HomeSectionDisplay bg title='Accessories' products={products} isLoading={false} />
  );
}
 