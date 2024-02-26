import * as z from 'zod'
import axios from 'axios'

import { useApi } from '@/hooks'

import { RegisterSchema, UserUpdateSchema, PasswordSchema } from '@/schema/register'
import { LoginSchema } from '@/schema/login'
import { AddressSchema } from '@/schema/address'
import { ApiError } from 'next/dist/server/api-utils'

export async function registerNewUser(values: z.infer<typeof RegisterSchema>) {
  return await axios.post(useApi('user/register'), values).then(data => data.data)
}
export async function login(values: z.infer<typeof LoginSchema>) {
  return await axios.post(useApi('user/login'), values).then(data => data.data)
}
export async function user() {
  return await axios.get('api/user').then((res) => res.data)
}
export async function getUserAddresses() {
  return await axios.get(useApi('user/addresses')).then(res => res.data)
}
export async function getAddress(id: number) {
  return await axios.get(useApi(`user/addresses/${id}`)).then(res => res.data)
}
export async function createNewUserAddress(values: z.infer<typeof AddressSchema>) {
  return await axios.post(useApi('user/addresses'), values).then(res => res.data)
}
export async function updateUserAddress(id: number, values: z.infer<typeof AddressSchema>) {
  return await axios.put(useApi(`user/addresses/${id}`), values).then(res => res.data)
}
export async function deleteUserAddress(id: number) {
  return await axios.delete(useApi(`user/addresses/${id}`)).then(res => res.data)
}
export async function mainUserAddress(id: number) {
  return await axios.post(useApi(`user/addresses/${id}`)).then(res => res.data)
}
export async function saveOrder(data: any) {
  return await axios.post(useApi(`orders/user`), data).then(res => res.data)
}
export async function getUserOrders() {
  return await axios.get(useApi(`orders/user`)).then(res => res.data)
}
export async function getUserSpecificOrder(id: number) {
  return await axios.get(useApi(`orders/user/${id}`)).then(res => res.data)
}
export async function cancelUserOrder(id: number) {
  return await axios.post(useApi(`orders/user/${id}`)).then(res => res.data).catch(err => console.log(err.message))
}
export async function updateUser(values: z.infer<typeof UserUpdateSchema>) {
  return await axios.post(useApi(`user`), values).then(res => res.data).catch(err => console.log(err.message))
}
export async function changeUserPassword(values: z.infer<typeof PasswordSchema>) {
  return await axios.post(useApi(`user/change-password`), values).then(res => res.data).catch(err => err)
}
export async function userHaveMainAddress() {
  return await axios.get(useApi(`user/addresses/have-main`)).then(res => res.data).catch(err => err.response)
}
export async function deleteAccount(password: any) {
  return await axios.post(useApi(`user/delete`), password).then(res => res.data).catch(err => err)
}