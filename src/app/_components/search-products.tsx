"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const SearchProducts = () => {

  const router = useRouter()
  const sp = useSearchParams()
  const query = sp.get('filter')

  const [input, setInput] = useState(query ? query : '')
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search?filter=${input}`)
  }

  return (
    <div className='w-[500px] relative'>
      <Search className='w-4 h-4 absolute top-1/2 transform text-gray-600 -translate-y-1/2 left-3' />
      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          name="query"
          placeholder='Type some keywords...'
          className='border-gray-300 focus-visible:ring-0 pl-8'
        />
      </form>
    </div>
  )
}