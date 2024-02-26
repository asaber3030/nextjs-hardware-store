import Image from "next/image"

interface Props {
  label: string,
  children?: React.ReactNode
}

export const EmptyState = ({ label, children }: Props) => {
  return (
    <div className='items-center flex justify-center flex-col p-4 ring-1 rounded-md mt-5 ring-gray-100'>
      <Image src='/empty.png' alt="Empty state" width={100} height={100} />
      <h2 className="text-2xl font-bold uppercase mt-4">{label}</h2>
      {children}
    </div>
  )
}