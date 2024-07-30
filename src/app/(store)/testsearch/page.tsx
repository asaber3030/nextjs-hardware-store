"use client"

import { getCategories } from "@/actions/categories"
import { getBrands, getProducts } from "@/actions/products"

import { CategoryType, Product } from "@/types"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useURL } from "@/hooks"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ProductSkeleton } from "@/app/_components/skeleton/product-skeleton"
import { ProductCard } from "@/app/_components/product"
import { EmptyState } from "@/app/_components/empty-state"
import { Button } from "@/components/ui/button"

const ListAllProdudcts = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const queryParam = searchParams.get('filter')
  const brandParam = searchParams.get('brand')
  const categoryParam = searchParams.get('category')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParam)
  
  const search = useRef<HTMLInputElement>(null)

  const searchProducts = useQuery({
    queryKey: ['products', { filter: search.current?.value, category: selectedCategory, brand: selectedBrand } ],
    queryFn: ({ queryKey }: any) => getProducts(queryKey[1].filter ?? '', queryKey[1].category, queryKey[1].brand)
  })

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const brands = useQuery({
    queryKey: ['products', 'brands'],
    queryFn: () => getBrands()
  })

  const onCategoryChange = (e: string) => {
    setSelectedCategory(parseInt(e) as any)
    router.push(useURL('products', [
      { key: 'filter', value: !!queryParam ? queryParam : search.current?.value },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'category', value: e },
    ]))
  }

  const onBrandChange = (e: string) => {
    setSelectedBrand(e)
    router.push(useURL('products', [
      { key: 'filter', value: !!queryParam ? queryParam : search.current?.value },
      { key: 'brand', value: e },
      { key: 'category', value: !!categoryParam ? categoryParam : '' },
    ]))
  }

  const onSubmitSearch = (e: any) => {
    e.preventDefault()
    router.push(useURL('products', [
      { key: 'filter', value: search.current?.value },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'category', value: !!categoryParam ? categoryParam : '' },
    ]))
  }

  const clearBrandHandler = () => {
    router.push(useURL('products', [
      { key: 'filter', value: !!queryParam ? queryParam: '' },
      { key: 'brand', value: '' },
      { key: 'category', value: !!categoryParam ? categoryParam : '' },
    ]))
  }

  const clearCategoryHandler = () => {
    router.push(useURL('products', [
      { key: 'filter', value: !!queryParam ? queryParam: '' },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'category', value: '' },
    ]))
  }

  const clearFiltersHandler = () => {
    setSelectedBrand('')
    setSelectedCategory('')
    searchProducts.refetch()
  }

  useEffect(() => {
    
  }, [pathname, searchProducts.data])

  return (
    <div className="py-4 px-14">

      <div className="filters flex items-center justify-between">
        <div>
          <div className='w-[500px] relative'>
            <Search className='w-4 h-4 absolute top-1/2 transform text-gray-600 -translate-y-1/2 left-3' />
            <form onSubmit={onSubmitSearch}>
              <Input
                ref={search}
                name="query"
                placeholder='Type some keywords...'
                className='border-gray-300 focus-visible:ring-0 pl-8'
              />
            </form>
          </div>
        </div>

        <div className='flex gap-2'>
          <div>
            <Select defaultValue={`${selectedBrand ? selectedBrand : "Select a brand"}`} onValueChange={onBrandChange}>
              <SelectTrigger className="w-[300px]">
                <SelectValue defaultChecked placeholder="Select a brand" defaultValue={"Select a brand"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"Select a brand"} disabled>
                    Select a brand
                  </SelectItem>
                  {brands.data && !brands.isLoading && brands.data.map((brand: string) => (
                    <SelectItem value={`${brand}`} key={Math.random()}>
                      <span>{brand}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {brandParam && <Button onClick={clearBrandHandler} variant='link' className="p-0 ml-1 text-xs">Remove filter</Button>}
          </div>

          <div>
            <Select defaultValue={`${selectedCategory ? selectedCategory : "Select a category"}`} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-[300px]">
                <SelectValue defaultChecked placeholder="Select a category" defaultValue={"Select a category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"Select a category"} disabled>
                    Select a category
                  </SelectItem>
                  {categories.data && !categories.isLoading && categories.data.map((category: CategoryType) => (
                    <SelectItem value={`${category.id}`} key={category.id}>
                      <span>{category.name} </span>
                      <span className='self-end text-sm text-gray-400 float-right ml-1'> ({category.Products?.length} product)</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {categoryParam && <Button onClick={clearCategoryHandler} variant='link' className="p-0 ml-1 text-xs">Remove filter</Button>}
          </div>
          
          <div>
            <Button onClick={clearFiltersHandler}>Remove filters</Button>
          </div>
        </div>
        
      </div>

      <div className='grid grid-flow-row-dense gap-x-2 grid-cols-5 mt-5'>
        {searchProducts.isLoading ? (
          <ListAllProdudcts.LoadingProducts />
        ): (
          <>
            {searchProducts.data?.products?.length > 0 ? (
              <>
                {searchProducts.data?.products?.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </>
            ): <EmptyState label={"No search"} />}
          </>
        )}
          
      </div>
    </div>
  )
}

ListAllProdudcts.LoadingProducts = () => {
  return (
    <>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </>
  )
}

export default ListAllProdudcts