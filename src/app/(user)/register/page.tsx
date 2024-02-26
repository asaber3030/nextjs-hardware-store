import { APP_NAME } from "@/lib/constant";

import { Metadata } from "next";
import { RegisterForm } from "@/app/_components/user/register-form";

// Title
export const metadata: Metadata = {
  title: `Register - ${APP_NAME}`,
  description: `Create new account and join ${APP_NAME} store to buy hardware components with best offers!`,
}

const RegisterPage = () => {
  return (
    <div className='m-auto w-[30%] mt-[100px] p-4 bg-gray-100 ring-1 ring-gray-200 shadow-md rounded-md'>
      <RegisterForm />
    </div>
  );
}
 
export default RegisterPage;