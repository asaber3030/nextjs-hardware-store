"use client";

import * as z from 'zod'


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Edit } from 'lucide-react';

import { PasswordSchema } from '@/schema/register';
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUser } from '@/hooks';
import { useMutation } from '@tanstack/react-query';

import { changeUserPassword, updateUser } from '@/actions/user';
import { toast } from 'sonner';

export const SettingsComponent = () => {

  const { user, pending } = useUser()

  const form = useForm<z.infer<typeof PasswordSchema>>({
    defaultValues: {
      newPassword: "",
      currentPassword: ""
    },
    resolver: zodResolver(PasswordSchema)
  })
  
  const updateMutation = useMutation({
    mutationFn: (values: z.infer<typeof PasswordSchema>) => changeUserPassword(values),
    onSuccess: (data: { message: string, status: number, response: any }) => {
      toast.message(data?.message ? data?.message : data?.response?.data?.message)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const updateUserHandler = () => {
    updateMutation.mutate(form.getValues())
  }

  if (pending) { return "Loading" }
  return (
    <div className='w-[50%]'>
      <Form {...form}>

        <form className='flex flex-col gap-y-2' onSubmit={form.handleSubmit(updateUserHandler)}>
          
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Current Password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
                    
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='New Password' {...field} />
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