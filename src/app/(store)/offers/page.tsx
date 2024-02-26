import { OffersListComponent } from "@/app/_components/offers/offers-list";

import { APP_NAME } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Offers',
  description: `Best offers with best sales in hardware events - The prices you will see may below your mind only in ${APP_NAME} store!`
}

const OffersPage = () => {
  return (
    <div>
      <OffersListComponent />
    </div>
  );
}
 
export default OffersPage;