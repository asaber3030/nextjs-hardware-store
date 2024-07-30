import { HomeSectionDisplay } from "./section";
import { Product } from "@/types";

export const NewArrivalsProducts = ({ products }: { products: Product[] }) => {
  return (
    <HomeSectionDisplay bg title='New Arrivals' products={products} isLoading={false} />
  );
}
 