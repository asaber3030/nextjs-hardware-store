"use client";

import { getCategory } from "@/actions/categories";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import SideLayout from "../../layout-side";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/app/_components/product";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { Product } from "@/types/product";
import { ProductSkeleton } from "@/app/_components/skeleton/product-skeleton";

const PreviewCategory = () => {

  const { id } = useParams()

  const category = useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategory(parseInt(id as string))
  })

  console.log(category)

  if (category.isLoading && !category.data) {
    return (
      <SideLayout>
        <div className='flex-2 py-4 w-full h-fit'>
          <div className='flex justify-between gap-x-4 items-center'>
            <div>
              <h3 className='text-lg flex gap-x-2 items-center'><Link href='/'>Home</Link> / <PreviewCategory.CategroyNameSkeleton /></h3>
            </div>
            <div className='w-[500px] flex gap-x-1 items-center justify-end'>
              <PreviewCategory.CategorySelectSkeleton />
              <PreviewCategory.CategorySelectSkeleton />
            </div>
          </div>
          <Separator className="my-5" />
          <div className='flex gap-x-2 col-span-2 flex-wrap'>
            <PreviewCategory.LoadProductSkeleton />
          </div>
        </div>
      </SideLayout>
    )
  }

  return (
    <SideLayout>
      <div className='flex-2 py-4 w-full'>
        <div className='flex justify-between gap-x-4 items-center'>
          <div>
            <h3 className='text-lg'><Link href='/'>Home</Link> / <span className='font-bold text-main'>{category.data.name}</span></h3>
          </div>
          <div className='w-[500px] flex gap-x-1 items-center'>
            <Select onOpenChange={() => console.log('changed')}>
              <SelectTrigger className="focus-visible:ring-0">
                <SelectValue placeholder='Sorting' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select sorting method</SelectLabel>
                  <SelectItem value="apple">[A-Z]</SelectItem>
                  <SelectItem value="banana">[Z-A]</SelectItem>
                  <SelectItem value="blueberry">Last Added</SelectItem>
                  <SelectItem value="grapes">Oldest</SelectItem>
                  <SelectItem value="pineapple">Highest Orders</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="focus-visible:ring-0">
                <SelectValue placeholder='Default' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select number of products</SelectLabel>
                  <SelectItem value="apple">10</SelectItem>
                  <SelectItem value="banana">50</SelectItem>
                  <SelectItem value="blueberry">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="my-5" />
          {category.data.Products?.length > 0 ? (
            <div className='grid gap-5 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4 grid-flow-row'>
              {category.data.Products?.map((product: Product) => (
                <ProductCard product={product} />
              ))}
            </div>
          ) : (
            <PreviewCategory.EmptyProducts />
          )}
      </div>
    </SideLayout>
  );
}

PreviewCategory.EmptyProducts = function ProductsEmpty() {
  return (
    <div className='flex justify-center items-center'>
      <Alert className='w-full'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>No Products Found!</AlertTitle>
        <AlertDescription>
          This category doesn't have any products for now <Link href='/categories'>Browse All Categories</Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}


PreviewCategory.CategroyNameSkeleton = function CategroyNameSkeletonPreviewCategory() {
  return (
    <Skeleton 
      className='w-[100px] h-2 bg-gray-300'
    />
  )
}

PreviewCategory.CategorySelectSkeleton = function CategorySelectSkeletonPreviewCategory() {
  return (
    <Skeleton 
      className='w-[248px] h-[40px] bg-gray-300'
    />
  )
}

PreviewCategory.LoadProductSkeleton = function PreviewCategoryProductSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4 grid-flow-row'>
      {Array.from({ length: 4 }).map((num, idx) => (
        <ProductSkeleton />
      ))}
    </div>
  )
}
 
export default PreviewCategory;

