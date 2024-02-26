import { ListCategoriesImages } from "../_components/list-categories-images";
import { BestSellerProducts } from "../_components/home/best-seller";
import { NewArrivalsProducts } from "../_components/home/new-arrivals";
import { OffersProducts } from "../_components/home/offers";
import { AccessoriesProducts } from "../_components/home/accessories";

const HomePage = () => {

  return (
    <main>

      <ListCategoriesImages />

      <BestSellerProducts />

      <NewArrivalsProducts />

      <OffersProducts />

      <AccessoriesProducts />

    </main>
  );
}
 
export default HomePage;
