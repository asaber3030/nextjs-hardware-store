import { ProfileHeader } from "@/app/_components/profile-header";
import { DetailsComponent } from "@/app/_components/user/details";
import { Info } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Update user details',
  description: 'Updating user information such as email, name, and phone number.'
}

const DetailsPage = () => {
  return (
    <div>
      <ProfileHeader label="Update Details" icon={<Info />} />
      <DetailsComponent />
    </div>
  );
}
 
export default DetailsPage;