"use client";

import Link from "next/link";
import Image from "next/image";

import * as z from 'zod'

import { LoginSchema } from "@/schema/login";
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { LogIn } from "lucide-react";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { login } from "@/actions/user";
import { toast } from "sonner";

export const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema)
  })
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: (values: z.infer<typeof LoginSchema>) => login(values),
    onSuccess: (data) => {
      toast.success(data.message)
      form.reset()
      router.push('/profile')
    },
    onError(error) {
      toast.error("Couldn't login!")
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail Address</FormLabel>
                <FormControl>
                  <Input placeholder='Email address' {...field} />
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

          <Link className='text-blue-900 text-sm mb-1 font-semibold self-end' href='/register'>Doesn't have an account?</Link>
          <Button className='w-fit self-end' type='submit' variant='success'><LogIn className='mr-2' /> Login</Button>
        </form>
      </Form>

    </div>
  );
}
 