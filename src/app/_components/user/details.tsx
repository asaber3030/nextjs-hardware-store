"use client";

import * as z from 'zod'


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Edit } from 'lucide-react';

import { UserUpdateSchema } from '@/schema/register';
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useUser } from '@/hooks';
import { useMutation } from '@tanstack/react-query';

import { updateUser } from '@/actions/user';
import { toast } from 'sonner';

export const DetailsComponent = () => {

  const { user, pending } = useUser()

  const form = useForm<z.infer<typeof UserUpdateSchema>>({

    values: {
      email: user?.email ?? user?.email,
      phone: user?.phone ?? user?.phone,
      name: user?.name ?? user?.name,
    },
    resolver: zodResolver(UserUpdateSchema)
  })
  
  const updateMutation = useMutation({
    mutationFn: (values: z.infer<typeof UserUpdateSchema>) => updateUser(values),
    onSuccess: (data: { message: string, status: number }) => {
      toast.message(data?.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const updateUserHandler = () => {
    updateMutation.mutate(form.getValues())
    console.log(form.getValues())
  }

  if (pending) { return "Loading" }

  return (
    <div className='w-[50%]'>
       <Form {...form}>

        <form className='flex flex-col' onSubmit={form.handleSubmit(updateUserHandler)}>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.name} placeholder='Name' {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.phone} placeholder='Phone' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
                    
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail Address</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.email} placeholder='Email address' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-fit' type='submit' size='sm' variant='outline'><Edit className='mr-2 size-5' /> Update</Button>
        </form>
      </Form>
    </div>
  )
}