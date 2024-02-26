"use client";

import * as z from 'zod'

import { useForm } from "react-hook-form";
import { AddressSchema } from "@/schema/address";

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Edit2 } from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { updateUserAddress, getAddress } from "@/actions/user";

export const UpdateAddressForm = ({ id }: { id: number }) => {

  const address = useQuery({
    queryKey: ["user", "adresses", id],
    queryFn: ({ queryKey }) => getAddress(queryKey[2] as number)
  })

  const form = useForm<z.infer<typeof AddressSchema>>({
    values: {
      address: address?.data?.address,
      city: address?.data?.city,
      phone: address?.data?.phone,
      homePhone: address?.data?.homePhone,
      floor: address?.data?.floor,
      main: address?.data?.main
    },
    resolver: zodResolver(AddressSchema)
  })

  const router = useRouter()

  const addressMutation = useMutation({
    mutationFn: (values: z.infer<typeof AddressSchema>) => updateUserAddress(id, values),
    onSuccess: (data) => {
      toast.message("Address updated!")
      router.push('/addresses')
    },
    onError: (error) => {
      toast.message(error.message)
    }
  })

  const updateAddressHandler = () => {
    console.log(form.getValues())
    addressMutation.mutate(form.getValues())
  }


  if (address.isLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Create address</h1>
      <Separator className='my-2' />
      <Form {...form}>
        <form className='flex flex-col' onSubmit={form.handleSubmit(updateAddressHandler)}>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address <span className='text-red-600'>*</span></FormLabel>
                <FormControl>
                  <Input defaultValue={address.data.address} placeholder='Address' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City <span className='text-red-600'>*</span></FormLabel>
                <FormControl>
                  <Input defaultValue={address.data.city} placeholder='City' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Phone <span className='text-red-600'>*</span></FormLabel>
                <FormControl>
                  <Input defaultValue={address.data.phone} placeholder='Primary Phone' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="homePhone"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Home Phone</FormLabel>
                <FormControl>
                  <Input defaultValue={address.data.homePhone} placeholder='Home Phone' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <Input defaultValue={address.data.floor} placeholder='Floor' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="main"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormControl>
                    <Checkbox defaultChecked={address.data.main} checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className='ml-1'>Main address?</FormLabel>
                </div>

                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-fit self-end' type='submit' size='sm' variant='success'><Edit2 className='mr-2 w-4 h-4' /> Update</Button>
        </form>
      </Form>
    </div>
  )
}