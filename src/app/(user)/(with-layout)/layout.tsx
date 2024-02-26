import { UserLinks } from "@/app/_components/user/user-links";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex px-14 py-5 gap-x-5'>
      <UserLinks />
      <div className='w-full'>{children}</div>
    </div>
  );
}
 
export default ProfileLayout;