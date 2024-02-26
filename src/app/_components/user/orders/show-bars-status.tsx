import { cn, orderStatusText } from "@/lib/utils"

export const ShowOrderStatusBars = ({ status }: { status: number }) => {
  const statusText = orderStatusText(status)
  return (
    <>
      <div className="flex items-center justify-center gap-x-1">
        <div className={cn("relative rounded-md bg-gray-300 shadow-sm h-2 w-[25%]", status >= 0 && "bg-green-700")}></div>
        <div className={cn("relative rounded-md bg-gray-300 shadow-sm h-2 w-[25%]", status > 0 && "bg-green-700")}></div>
        <div className={cn("relative rounded-md bg-gray-300 shadow-sm h-2 w-[25%]", status > 1 && "bg-green-700")}></div>
        <div className={cn("relative rounded-md bg-gray-300 shadow-sm h-2 w-[25%]", status > 2 && "bg-green-700")}></div>
      </div>
      <h3 className='font-semibold'>{statusText}</h3>
    </>
  )
}