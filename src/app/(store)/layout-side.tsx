import { SideFilter } from "../_components/side-filter"

interface LayoutProps {
  children: React.ReactNode
}

const SideLayout = ({ children }: LayoutProps) => {
  return (
    <div className='flex gap-x-4 px-14'>
      <SideFilter />
      {children}
    </div>
  )
}

export default SideLayout