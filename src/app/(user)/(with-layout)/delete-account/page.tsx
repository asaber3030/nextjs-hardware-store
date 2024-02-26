import { ProfileHeader } from "@/app/_components/profile-header";
import { DeleteAccountComponent } from "@/app/_components/user/delete-account";
import { Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Delete user account',
  description: 'Delete user info & previous orders with everything related to it!'
}

const DeleteAccountPage = () => {
  return (
    <div>
      <ProfileHeader label="Delete Account" icon={<Trash2 />} />
      <DeleteAccountComponent />
    </div>
  );
}
 
export default DeleteAccountPage;