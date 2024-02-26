import { LoginForm } from "@/app/_components/user/login-form";
import { APP_NAME } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login - ${APP_NAME}`,
  description: `Login into your account to able to buy inside ${APP_NAME} store for hardware components!`
}

const LoginPage = () => {
  return (
    <div className='m-auto w-[30%] mt-[100px] p-4 bg-gray-100 ring-1 ring-gray-200 shadow-md rounded-md'>
      <LoginForm />
    </div>
  );
}
 
export default LoginPage;