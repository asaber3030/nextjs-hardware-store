import { ProfileComponent } from "@/app/_components/user/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'User profile and helper links'
}

const Profile = () => {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
}
 
export default Profile;