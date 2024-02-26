import { CompleteBuyComponent } from "@/app/_components/buy/buy-component";
import { APP_NAME } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Complete Buy',
  description: `Complete buying what's added in cart - ${APP_NAME} Hardware Store`
}

const CompleteBuy = () => {
  return (
    <div className='px-14 py-6'>
      <CompleteBuyComponent />
    </div>
  );
}
 
export default CompleteBuy;