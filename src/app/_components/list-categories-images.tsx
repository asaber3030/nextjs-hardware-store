"use client";

import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/actions/categories";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "./loader";
import { CategoryType } from "@/types/category";

export const ListCategoriesImages = () => {

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  if (!categoriesQuery.data && categoriesQuery.isLoading) {
    return (
      <div className='py-8 flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='px-14 py-8 bg-gray-50 flex items-center justify-center'>
      {categoriesQuery.data.map((category: CategoryType) => (
        <Link href={`/categories/${category.id}`} className='basis-1/12 text-center'>
          <Image className='mb-5 w-[100px] h-[100px] m-auto object-contain' width={200} height={200} src={category.previewImage} alt='Category image' />
          <h2 className='font-bold text-[15px]'>{category.name}</h2>
        </Link>
      ))} 
    </div>
  );
}

ListCategoriesImages.Skeleton = function ListCategoriesImagesSkeleton () {
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