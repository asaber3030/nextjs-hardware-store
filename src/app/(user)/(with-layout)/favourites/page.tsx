import { cookies } from "next/headers";
import { Metadata } from "next/types";

import { ListFavourites } from "@/app/_components/favourites/list";
import { ProfileHeader } from "@/app/_components/profile-header";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: 'Favourites ',
  description: 'User Saved Products to Favourites!',
}

const FavouritesPage = () => {
  return (
    <div>
      <ProfileHeader label="My favourites" icon={<Heart />} />
      <ListFavourites cookie={cookies().get('cookies')?.value} />
    </div>
  );
}
 
export default FavouritesPage;