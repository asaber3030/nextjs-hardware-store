"use client";

import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schema/register";

import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, UserPlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import Image from "next/image";
import Link from "next/link";

import { registerNewUser } from "@/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {

  const form = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      name: '',
      password: '',
      phone: '',
      email: ''
    },
    resolver: zodResolver(RegisterSchema)
  })
  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: (values: z.infer<typeof RegisterSchema>) => registerNewUser(values),
    onSuccess: (data) => {
      toast.success(data.message)
      form.reset()
      router.push('/login')
    },
    onError: () => {
      toast.error("User found!")
    }
  })

  const registerUser = () => {
    registerMutation.mutate(form.getValues())
  }

  return (
    <div>
      
      <Image width={150} height={150} alt="Login Image" src='/register.png' className='mx-auto' />

      <h1 className='text-center text-3xl font-bold flex justify-center items-center mb-10'><UserPlus className='mr-4 w-8 h-8' /> Create new account</h1>

      <Form {...form}>

        <form className='flex flex-col gap-y-2' onSubmit={form.handleSubmit(registerUser)}>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full-Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
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
                  <Input placeholder='example@website.domain' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='*********' type='password' {...field} />
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
                <FormLabel />
                <FormControl>
                  <Input placeholder='011 xxxx xxxx' type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />  

          <Link className='text-blue-900 text-sm mb-1 font-semibold self-end' href='/login'>Already have an account?</Link>
          <Button className='w-fit self-end' type='submit'><UserPlus className='mr-2' /> Register</Button>
        </form>
      </Form>

    </div>
  );
}
 