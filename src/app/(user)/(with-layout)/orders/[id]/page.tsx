import { ViewOrderComponent } from "@/app/_components/user/orders/view-order";
import { Metadata } from "next";

interface Params {
  params: {
    id: number
  } 
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `Order Details: #${params.id}`,
    description: `Viewing details of user order of specific id!`
  }
}

const ViewOrderPage = ({ params }: Params) => {
  return (
    <div>
      <ViewOrderComponent params={params} />
    </div>
  );
}
 
export default ViewOrderPage;