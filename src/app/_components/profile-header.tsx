import { Separator } from "@/components/ui/separator"

interface Props {
  icon?: any,
  label: string,
  children?: React.ReactNode
}

export const ProfileHeader = ({ icon, label, children }: Props) => {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-bold flex items-center gap-x-2">
        {icon && icon}
        {label}
      </h1>
      <Separator />
      {children}
    </div>
  )
}