"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, Edit2, Plus, Trash2 } from "lucide-react";

import { deleteUserAddress, getUserAddresses, mainUserAddress } from "@/actions/user";

import { AddressType } from "@/types/address";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { cn, generateArray } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const ListAddresses = () => {

  const router = useRouter()

  const addresses = useQuery({
    queryKey: ['user', 'addresses'],
    queryFn: () => getUserAddresses()
  })
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUserAddress(id),
    onSuccess: () => {
      toast.message("Address deleted!")
      addresses.refetch()
    }
  })
  const makeMainMutation = useMutation({
    mutationFn: (id: number) => mainUserAddress(id),
    onSuccess: () => {
      toast.message("Address has been set to main orders address!")
      addresses.refetch()
    }
  })


  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }
  const handleMakeMain = (id: number) => {
    makeMainMutation.mutate(id)
  }

  if (addresses.isLoading) { 
    return (
      <div className='flex flex-col gap-y-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>My Addresses</h1>
        <Button variant='outline' size='sm' onClick={ () => router.push('/addresses/create') }><Plus className='w-4 h-4 mr-2' /> Create Address</Button>
      </div>
      <Separator className='bg-gray-100 my-1' />
      <ListAddresses.Skeleton />
    </div>
    )
   }

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>My Addresses</h1>
        <Button variant='outline' size='sm' onClick={ () => router.push('/addresses/create') }><Plus className='w-4 h-4 mr-2' /> Create Address</Button>
      </div>
      <Separator className='bg-gray-100 my-1' />
      {addresses.data.length == 0 && (
        <Alert>
          <AlertTitle>No Addresses Found!</AlertTitle>
        </Alert>
      )}
      {addresses.data.map((address: AddressType) => (
        <div className={cn('ring-1 ring-gray-100 px-4 py-1 rounded-md flex items-center justify-between', address.main && "ring-green-100")}>
          <div>
            <h2 className='font-bold text-lg'>
            {address.main && <span className='text-green-700'>(Main) </span>}
            {address.address} - <span className='text-sm font-medium text-green-700'>{address.city}</span>
            </h2>
            <p>{address.floor} Floor</p>
            <p><b className='font-semibold'>{address.phone}</b> as Primary Phone</p>
            <p><b className='font-semibold'>{address.homePhone}</b> as Home Phone</p>
          </div>
          <div className="flex gap-x-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size='icon' variant='outline' className='w-9 h-9'><Trash2 className='w-4 h-4' /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure that you want to delete this address?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={ () => handleDelete(address.id) }>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {!address.main && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size='icon' variant='outline' className='w-9 h-9'><Check className='w-4 h-4' /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to make the selected address your main address of orders?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action can be reversed!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={ () => handleMakeMain(address.id) }>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button onClick={ () => router.push(`/addresses/${address.id}`) } size='icon' variant='outline' className='w-9 h-9'><Edit2 className='w-4 h-4' /></Button>
          </div>
        </div>
      ))}
      <span className='text-xs text-gray-400'>{5 - addresses.data.length} left addresses</span>
    </div>
  )
}

ListAddresses.Skeleton = () => {
  return (
    <div className='flex flex-col gap-y-1'>
      {generateArray(5).map((_, idx) => (
        <Skeleton className='h-[100px] w-full' />
      ))}
    </div>
  )
}