import { ProfileHeader } from "@/app/_components/profile-header";
import { SettingsComponent } from "@/app/_components/user/settings";

import { Lock } from "lucide-react";

import { APP_NAME } from "@/lib/constant";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Change Password',
  description: `User security, Changing Password of ${APP_NAME} account`
}

const SettingsPage = () => {
  return (
    <div>
      <ProfileHeader label='Change Password' icon={<Lock />} />
      <SettingsComponent />
    </div>
  );
}
 
export default SettingsPage;