"use client";

import { getCategories } from "@/actions/categories"
import { getBrands } from "@/actions/products";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryType } from "@/types/category"
import { useQuery } from "@tanstack/react-query"

import Link from "next/link"
import { useParams } from "next/navigation";

export const SideFilter = () => {

  const { id }: { id: string } = useParams()

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })
  return (
    <aside className='mt-4 bg-gray-100 h-fit shadow-md rounded-md py-4 px-2 pb-1 w-[400px]'>
      <div className='my-1'>
        <h2 className='text-lg font-bold mx-4 text-center border-b border-b-gray-300 pb-2'>Product Categories</h2>
        <ul className='mt-1'>
          {categoriesQuery.isLoading && !categoriesQuery.data ? (
            <SideFilter.CategoriesSkeleton />
          ): (
            <>
              {categoriesQuery.data.map((category: CategoryType) => (
                <li>
                  <Link className={`py-1.5 block px-4 text-gray-600 text-sm hover:bg-gray-200 rounded-md mb-0.5 hover:text-black ${parseInt(id) == category.id && 'text-main font-bold hover:text-main bg-gray-200'}`} href={`/categories/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </aside>
  )
}

SideFilter.CategoriesSkeleton = function SideCategoriesSkeleton() {
  return (
    <div className='h-300px py-4'>
      {Array.from({ length: 13 }).map((_, idx: number) => (
        <Skeleton
          key={idx}
          className='bg-gray-300 mb-2.5 w-[300px] h-[20px] rounded-sm'
        />
      ))}
    </div>
  )
}



