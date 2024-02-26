"use client";

import Link from "next/link";

import { getCategories } from "@/actions/categories";
import { getBrands, getProducts } from "@/actions/products";
import { generateArray } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { ProductSkeleton } from "@/app/_components/skeleton/product-skeleton";
import { ProductCard } from "@/app/_components/product";

import { Product } from "@/types/product";
import { CategoryType } from "@/types/category";
import { Separator } from "@/components/ui/separator";

import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton";
import { useURL } from "@/hooks/useURL";

const SearchResultsPage = () => {

  const searchParams = useSearchParams()
  const queryParam = searchParams.get('filter')
  const brandParam = searchParams.get('brand')
  const categoryParam = searchParams.get('category')

  const searchProducts = useQuery({
    queryKey: ['products', { filter: queryParam, category: categoryParam, brand: brandParam }],
    queryFn: ({ queryKey }: { queryKey: any }) => getProducts(queryKey[1].filter ?? '', queryKey[1].category, queryKey[1].brand),
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const brandsQuery = useQuery({
    queryKey: ['products', 'brands'],
    queryFn: () => getBrands()
  })

  return (
    <main className='flex gap-x-4'>
      
      {/* Filter on the left */}
      <div className='w-[400px]'>
        <h1 className='text-lg font-semibold'>Select Category</h1>
        {!categoriesQuery.isLoading ? (
          <div className='flex flex-col gap-y-2 mt-3'>
            {categoriesQuery.data.map((category: CategoryType, idx: number) => (
              <Link 
                href={useURL('search', [
                  { key: 'query', value: queryParam && queryParam },
                  { key: 'category', value: category.id as any },
                  { key: 'brand', value: brandParam ? brandParam : '' },
                ])} 
                className={`hover:bg-gray-300 transition-all text-sm ring-1 ring-gray-200 px-2 py-1 text-gray-500 
                  ${category.id == parseInt(categoryParam as string) && 'text-black ring-gray-300 bg-gray-300 rounded-md p-1 px-2'}
                `}
                >
                {category.name}
              </Link>
            ))}
          </div>
        ) : (
          <SearchResultsPage.LoadingCategory />
        )}

        <Separator className='my-5' />

        <h1 className='text-lg font-semibold'>Select Brand</h1>
        {!brandsQuery.isLoading ? (
          <div className='grid grid-cols-3 gap-y-2 mt-3'>
            {brandsQuery.data.map((brand: string, idx: number) => (
              <Link 
                href={useURL('search', [
                  { key: 'query', value: queryParam ? queryParam : '' },
                  { key: 'category', value: categoryParam ? categoryParam : '' },
                  { key: 'brand', value: brand },
                ])} 
                className={`text-sm text-gray-600 ${brand == brandParam && 'text-black font-bold'}`}
              >
                {brand}
              </Link>
            ))}
          </div>
        ) : (
          <SearchResultsPage.LoadingBrand />
        )}
      </div>

      {/* Displaying search result */}
      {searchProducts.isLoading ? (
        <SearchResultsPage.LoadingState />
      ): (
        <>
          {searchProducts.data.products.length > 0 ? (
            <SearchResultsPage.Display data={searchProducts.data.products} />
          ): (
            <SearchResultsPage.NoResults />
          )}
        </>
      )}
    </main>
  );
}

SearchResultsPage.LoadingCategory = () => {
  return (
    <div className='flex flex-col gap-y-2 mt-3'>
    {generateArray(13).map((_, idx) => (
      <div className="flex items-center space-x-2">
        <Skeleton 
          className='w-full h-8 px-2 bg-gray-300'
        />
      </div>
    ))}
  </div>
  )
}

SearchResultsPage.LoadingBrand = () => {
  return (
    <div className='flex flex-col gap-y-2 mt-3'>
    {generateArray(5).map((_, idx) => (
      <div className="flex items-center space-x-2">
        <Skeleton 
          className='w-full h-3 px-2 bg-gray-300'
        />
      </div>
    ))}
  </div>
  )
}

SearchResultsPage.Display = ({ data }: { data: Product[] }) => {
  return (
    <div className='grid grid-cols-4 gap-3 flex-2 py-4 w-full'>
      {data.map((product: Product) => (
        <ProductCard product={product} />
      ))}
    </div>
  )
}

SearchResultsPage.LoadingState = () => {
  return (
    <div className='grid grid-cols-4 gap-3 flex-2 py-4 w-full'>
      {generateArray(4).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  )
}

SearchResultsPage.NoResults = () => {
  return (
    <div className='flex w-full'>
      <Alert className='h-fit'>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Search result!</AlertTitle>
        <AlertDescription>
          We couldn't find any products with specified search!
        </AlertDescription>
      </Alert>
    </div>
  )
}
 
export default SearchResultsPage;
