import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent } from "react"
 
interface CheckboxCardProps {
  onChange?: any,
  label: string,
  htmlFor: string
}

export function CheckboxCard({ onChange, label, htmlFor }: CheckboxCardProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox onCheckedChange={() => onChange} value={label} id={htmlFor} />
      <label
        htmlFor={htmlFor}
        className="text-sm text-gray-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
      >
        {label}
      </label>
    </div>
  )
}