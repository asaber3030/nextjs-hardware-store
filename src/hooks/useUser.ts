import { useQuery } from "@tanstack/react-query";
import { user as fetchUser } from "@/actions/user";

export function useUser() {

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser()
  })

  const { data: user, isLoading: pending, isError: error } = userQuery

  return { user, pending, error }

}