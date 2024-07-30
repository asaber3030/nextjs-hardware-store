import { ListCategoriesImages } from "../_components/list-categories-images";
import { BestSellerProducts } from "../_components/home/best-seller";
import { NewArrivalsProducts } from "../_components/home/new-arrivals";
import { OffersProducts } from "../_components/home/offers";
import { AccessoriesProducts } from "../_components/home/accessories";
import { Product } from "@/types";

import prisma from "@/db";

const HomePage = async () => {

  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    include: {
      category: true,
    },
    take: 10
  })

  const accessoriesProducts = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    where: { categoryId: 2 },
    include: {
      category: true,
    },
    take: 10
  })

  return (
    <main>
      <ListCategoriesImages />

      <BestSellerProducts products={products as unknown as Product[]} />

      <NewArrivalsProducts products={products as unknown as Product[]} />

      <OffersProducts products={products as unknown as Product[]} />

      <AccessoriesProducts products={accessoriesProducts as unknown as Product[]} />
    </main>
  );
}
 
export default HomePage;
