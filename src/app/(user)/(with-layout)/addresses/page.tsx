import { ListAddresses } from "@/app/_components/user/addresses/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `User addresses`,
  description: `User addresses to specifiy where the order will arrive.`
}

const Addresses = () => {
  return (
    <div className='flex-1'>
      <ListAddresses />
    </div>
  );
}
 
export default Addresses;