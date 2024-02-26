"use client";

import { deleteAccount } from "@/actions/user";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export const DeleteAccountComponent = () => {

  const passwordInput = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: (value) => deleteAccount({ password: value }),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.deleted === true) {
        router.push('/login')
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleConfirm = () => {
    deleteMutation.mutate(passwordInput.current?.value as any)
  }
  
  return (
    <div>
      <Alert>
        <Trash2 className="h-4 w-4" />
        <AlertTitle>Are you sure that you want to delete your account with every single data?</AlertTitle>
        <AlertDescription>
          <p className='text-sm text-gray-400 mb-2'>Once you click confirm you have to provide your password to confirm the delete action</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Confirm</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.</p>
                  <div className='mt-4'>
                    <label>Current Password</label>
                    <Input type='password' ref={passwordInput} />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </AlertDescription>
      </Alert>
    </div>
  )
}