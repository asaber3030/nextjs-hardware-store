import { UpdateAddressForm } from "@/app/_components/user/addresses/update";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Update user address`,
  description: `Updating data about specifc user address!`
}

const UpdateAddress = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <UpdateAddressForm id={params.id} />
    </div>
  );
}
 
export default UpdateAddress;