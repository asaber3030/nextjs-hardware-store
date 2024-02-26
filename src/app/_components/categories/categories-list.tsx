"use client";

import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/actions/categories";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "../loader";
import { Separator } from "@/components/ui/separator";

import { CategoryType } from "@/types/category";

export const CategoriesListComponent = () => {

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  if (!categoriesQuery.data && categoriesQuery.isLoading) {
    return (
      <div className='px-14 py-8'>
        <h1 className="text-2xl font-bold">Available Categories!</h1>
        <Separator className='my-4' />
        <div className='py-8 flex items-center justify-center'>
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className='px-14 py-8'>
      <h1 className="text-2xl font-bold">Available Categories!</h1>
      <Separator className='my-4' />
      <div className='grid gap-1 grid-flow-row-dense grid-cols-7'>
        {categoriesQuery.data.map((category: CategoryType) => (
          <CategoriesListComponent.Item 
            href={`/categories/${category.id}`}
            label={category.name}
            image={category.previewImage}
            countProducts={category.Products.length}
          />
        ))} 
      </div>
    </div>
  );
}

interface ItemProps {
  href: string,
  label: string,
  image: string,
  countProducts: number
}

CategoriesListComponent.Item = ({ href, label, image, countProducts }: ItemProps) => {

  return (
    <Link href={href} className='block p-4 rounded-md transition-all hover:bg-gray-200'>
      <Image className='mb-1 w-[120px] h-[120px] object-contain' width={200} height={200} src={image} alt='Category image' />
      <div className='px-4 mt-2'>
        <h2 className='font-bold text-[15px]'>{label}</h2>
        <p className='text-xs font-normal text-gray-400'>{countProducts} product(s)</p>
      </div>
    </Link>
  )

}

CategoriesListComponent.Skeleton = function ListCategoriesImagesSkeleton () {
  return (
    <div className='flex gap-2 p-5 flex-wrap'>
      {Array.from({ length: 10 }).map((num, idx) => (
        <Skeleton 
          className="w-[80px] h-[70px] text-gray-700 rounded-full bg-gray-500 flex items-center justify-center"
        />
      ))}
    </div>
  )
}