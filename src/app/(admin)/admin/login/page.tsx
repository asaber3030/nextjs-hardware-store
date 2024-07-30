"use client";

import Link from "next/link";
import Image from "next/image";

import * as z from 'zod'

import { AdminLoginSchema } from "@/schema/admins";
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from "@/actions/admins";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { LogIn } from "lucide-react";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


const AdminLogin = () => {

  const form = useForm<z.infer<typeof AdminLoginSchema>>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(AdminLoginSchema)
  })
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: (values: z.infer<typeof AdminLoginSchema>) => login(values),
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const registerUser = () => {
    loginMutation.mutate(form.getValues())
  }

  return (
    <div>

      <Image width={150} height={150} alt="Login Image" src='/login.png' className='mx-auto' />

      <h1 className='text-center text-3xl font-bold flex justify-center items-center mb-10'><LogIn className='mr-4 w-8 h-8' /> Login</h1>

      <Form {...form}>

        <form className='flex flex-col' onSubmit={form.handleSubmit(registerUser)}>
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
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
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-fit self-end' type='submit' variant='success'><LogIn className='mr-2' /> Login</Button>
        </form>
      </Form>

    </div>
  );
}
 
export default AdminLogin