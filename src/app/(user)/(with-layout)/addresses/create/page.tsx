import { CreateAddressForm } from "@/app/_components/user/addresses/create";
import { APP_NAME } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Create New Address`,
  description: `Create New User address in ${APP_NAME} store for user delivery data.`
}

const CreateAddress = () => {
  return (
    <div>
      <CreateAddressForm />
    </div>
  );
}
 
export default CreateAddress;