import { Skeleton } from "@/components/ui/skeleton"

export const ProductSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-3 relative w-[350px]'>
      <Skeleton 
        className='w-[350px] h-[200px] rounded-md shadow-md bg-gray-300'
      />
      <Skeleton className='w-[100px] h-2 rounded-md shadow-md bg-gray-300' />

      <Skeleton className='w-full h-2 rounded-md shadow-md bg-gray-300' />
      <Skeleton className='w-full h-2 rounded-md shadow-md bg-gray-300' />
      <Skeleton className='w-full h-2 rounded-md shadow-md bg-gray-300' />
      <Skeleton className='w-[30px] h-2 rounded-md shadow-md bg-gray-300' />
      <div className='flex gap-x-2'>
        <Skeleton className='w-[60px] h-2 rounded-md shadow-md bg-gray-300' />
        <Skeleton className='w-[60px] h-2 rounded-md shadow-md bg-gray-300' />
      </div>
      <div className='grid grid-flow-cols grid-cols-3 gap-x-2'>
        <Skeleton className='min-w-[100px] h-[40px] rounded-md shadow-md bg-gray-300' />
        <Skeleton className='min-w-[100px] h-[40px] rounded-md shadow-md bg-gray-300' />
        <Skeleton className='min-w-[100px] h-[40px] rounded-md shadow-md bg-gray-300' />
      </div>
    </div>
  )
}