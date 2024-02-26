import { useApi } from "@/hooks";

import axios from "axios";

export async function getCouponByName(name: string) {
  return axios.get(useApi(`coupons/name/${name}`)).then(res => res.data)
}