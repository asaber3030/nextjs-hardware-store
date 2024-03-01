import { ListAllProdudcts } from "@/app/_components/product/test-list";
import { APP_NAME } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Products`,
  description: `Here you can find all hardware components with best price inside our ${APP_NAME} store, One of the best hardware markets in Middle-east`
}

const ProductsPage = () => {
  return (
    <div className='px-14'>
      <ListAllProdudcts />
    </div>
  );
}
 
export default ProductsPage;