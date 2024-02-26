import { ListOrdersComponent } from "@/app/_components/user/orders/list-orders";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'User orders',
  description: 'All user orders with related data!'
}

const OrdersView = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>My Orders </h1>
      <Separator />
      <ListOrdersComponent />
    </div>
  );
}
 
export default OrdersView;