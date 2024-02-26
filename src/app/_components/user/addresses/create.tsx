"use client";

import { useForm } from "react-hook-form";
import { AddressSchema } from "@/schema/address";

import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { createNewUserAddress } from "@/actions/user";

export const CreateAddressForm = () => {

  const form = useForm<z.infer<typeof AddressSchema>>({
    defaultValues: {
      address: "",
      city: "",
      phone: "",
      homePhone: "",
      floor: "",
      main: false
    },
    resolver: zodResolver(AddressSchema)
  })

  const router = useRouter()

  const addressMutation = useMutation({
    mutationFn: (values: z.infer<typeof AddressSchema>) => createNewUserAddress(values),
    onSuccess: (data) => {
      toast.message("Address added!")
      router.push('/addresses')
    },
    onError: (error) => {
      toast.message(error.message)
    }
  })

  const createAddressHandler = () => {
    console.log(form.getValues())
    addressMutation.mutate(form.getValues())
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Create address</h1>
      <Separator className='my-2' />
      <Form {...form}>
        <form className='flex flex-col' onSubmit={form.handleSubmit(createAddressHandler)}>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address <span className='text-red-600'>*</span></FormLabel>
                <FormControl>
                  <Input placeholder='Address' {...field} />
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
                  <Input placeholder='City' {...field} />
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
                  <Input placeholder='Primary Phone' {...field} />
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
                  <Input placeholder='Home Phone' {...field} />
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
                  <Input placeholder='Floor' {...field} />
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
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className='ml-1'>Main address?</FormLabel>
                </div>

                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-fit self-end' type='submit' variant='success'><Plus className='mr-2' /> Submit</Button>
        </form>
      </Form>
    </div>
  )
}