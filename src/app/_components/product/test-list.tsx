"use client"

// Helpers & Actions
import { getCategories } from "@/actions/categories"
import { getBrands, getColors, getMaxAndMin } from "@/actions/products"
import { formatNumber } from "@/lib/utils"
import { getProductsByServer } from "@/actions/server-actions"

// Types
import { CategoryType, Product } from "@/types"

// Hooks
import { useEffect, useRef, useState, useDeferredValue } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useURL } from "@/hooks"

// Components UI
import { ProductSkeleton } from "../skeleton/product-skeleton"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ProductCard } from "../product"
import { EmptyState } from "../empty-state"
import { Skeleton } from "@/components/ui/skeleton"

export const ListAllProdudcts = () => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const queryParam = searchParams.get('filter')
  const brandParam = searchParams.get('brand')
  const categoryParam = searchParams.get('category')
  const takeParam = parseInt(searchParams.get('take') as any ? searchParams.get('take') as any : "8")
  const pageParam = parseInt(searchParams.get('page') as any ? searchParams.get('page') as any : "1")
  const maxValueParam = parseInt(searchParams.get('maxValue') as any ? searchParams.get('maxValue') as any : "0") ?? 0
  const minValueParam = parseInt(searchParams.get('minValue') as any ? searchParams.get('minValue') as any : "0")

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedTake, setSelectedTake] = useState(takeParam)
  const [selectedBrand, setSelectedBrand] = useState(brandParam)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [maxValue, setMaxValue] = useState(maxValueParam ?? 0)
  const [minValue, setMinValue] = useState(minValueParam ?? 0)
  
  const deferredMin = useDeferredValue(minValue)
  const deferredMax = useDeferredValue(maxValue)
  
  const search = useRef<HTMLInputElement>(null)

  const products = useQuery({
    queryKey: [
      'products', 
      'search', 
      { 
        filter: queryParam ? queryParam : '', 
        category: selectedCategory, 
        color: selectedColors, 
        brand: selectedBrand,
        range: [deferredMin, deferredMax],
        take: selectedTake,
        page: pageParam
      }
    ],
    queryFn: ({ queryKey }: any) => getProductsByServer(
      queryKey[2].filter, 
      queryKey[2].category, 
      queryKey[2].brand, 
      queryKey[2].color, 
      queryKey[2].range, 
      queryKey[2].page, 
      queryKey[2].take
    )
  })

  const nextProducts = useQuery({
    queryKey: [
      'products', 
      'search-next', 
      { 
        filter: queryParam ? queryParam : '', 
        category: selectedCategory, 
        color: selectedColors, 
        brand: selectedBrand,
        range: [deferredMin, deferredMax],
        take: selectedTake,
        page: !!pageParam ? pageParam + 1 : 2
      }
    ],
    queryFn: ({ queryKey }: any) => getProductsByServer(
      queryKey[2].filter, 
      queryKey[2].category, 
      queryKey[2].brand, 
      queryKey[2].color, 
      queryKey[2].range, 
      queryKey[2].page, 
      queryKey[2].take
    )
  })

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const brands = useQuery({
    queryKey: ['products', 'brands'],
    queryFn: () => getBrands()
  })

  const colors = useQuery({
    queryKey: ['products', 'colors'],
    queryFn: () => getColors()
  })

  const prices = useQuery({
    queryKey: ['products', 'prices'],
    queryFn: () => getMaxAndMin()
  })

  const onCategoryChange = (e: string) => {
    setSelectedCategory(parseInt(e) as any)
    router.push(useURL('test-products', [
      { key: 'filter', value: !!queryParam ? queryParam : search.current?.value },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'page', value: !!pageParam ? pageParam.toString() : '' },
      { key: 'take', value: !!takeParam ? takeParam.toString() : '' },
      { key: 'minValue', value: !!minValue ? minValue.toString() : '' },
      { key: 'maxValue', value: !!maxValue ? maxValue.toString() : '' },
      { key: 'category', value: e },
    ]))
  }

  const onTakeChange = (e: string) => {
    setSelectedTake(parseInt(e) as any)
    router.push(useURL('test-products', [
      { key: 'filter', value: !!queryParam ? queryParam : search.current?.value },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'page', value: !!pageParam ? pageParam.toString() : '' },
      { key: 'minValue', value: !!minValue ? minValue.toString() : '' },
      { key: 'maxValue', value: !!maxValue ? maxValue.toString() : '' },
      { key: 'category', value: !!categoryParam ? categoryParam : '' },
      { key: 'take', value: e },
    ]))
  }

  const onBrandChange = (e: string) => {
    setSelectedBrand(e)
    router.push(useURL('test-products', [
      { key: 'filter', value: !!queryParam ? queryParam : search.current?.value },
      { key: 'minValue', value: !!minValue ? minValue.toString() : '' },
      { key: 'maxValue', value: !!maxValue ? maxValue.toString() : '' },
      { key: 'page', value: !!pageParam ? pageParam.toString() : '' },
      { key: 'take', value: !!takeParam ? takeParam.toString() : '' },
      { key: 'brand', value: e },
    ]))
  }

  const onColorsChange = (e: boolean, color: string) => {
    if (e) {
      if (!selectedColors?.includes(color)) {
        setSelectedColors(old => [...old, color])
      }
    } else {
      if (selectedColors?.includes(color)) {
        setSelectedColors(old => old.filter(x => x != color))
      }
    }
  }

  const onSubmitSearch = (e: any) => {
    e.preventDefault()
    router.push(useURL('test-products', [
      { key: 'filter', value: search.current?.value },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'category', value: !!categoryParam ? categoryParam : '' },
      { key: 'minValue', value: !!minValue ? minValue.toString() : '' },
      { key: 'maxValue', value: !!maxValue ? maxValue.toString() : '' },
      { key: 'take', value: !!takeParam ? takeParam.toString() : '' },
    ]))
  }

  const applyFilters = () => {
    router.push(useURL('test-products', [
      { key: 'filter', value: search.current?.value },
      { key: 'brand', value: !!brandParam ? brandParam : '' },
      { key: 'category', value: !!categoryParam ? categoryParam : '' },
      { key: 'take', value: !!takeParam ? takeParam.toString() : '' },
      { key: 'minValue', value: deferredMin.toString() },
      { key: 'maxValue', value: deferredMax.toString() },
    ]))
  }

  if (products.data && nextProducts.data) {
    console.log({
      current: products.data,
      next: nextProducts.data
    })
  }

  return (
    <div className="py-4 flex gap-4">
      
      {/* Left Side filters */}
      <div className="w-[400px] divide-y flex flex-col gap-y-3 mr-8">
        {/* Colors Filter */}
        <div>
          <h5 className='font-semibold text-[15px] mb-2'>Choose Colors</h5>
          <ul>
            {colors?.data?.map((color: string, idx: number) => (
              <li key={idx} className='flex gap-2 items-center select-none mb-2 py-1'>
                <Checkbox 
                  id={`colors_${idx}`}
                  value={color}
                  defaultValue={color}
                  defaultChecked={selectedColors.includes(color as any)}
                  onCheckedChange={ (e: boolean) => onColorsChange(e, color) }
                />
                <label
                  htmlFor={`colors_${idx}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {color}
                </label>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price Filters */}
        <div className='pt-4'>
          <h5 className='font-semibold text-[15px] mb-4'>Choose Price Range</h5>
          {prices?.data && !prices.isLoading && (
            <>
              <div>
                <h4 className='text-[15px] font-medium mb-0.5'>Minimum Price</h4>
                <Slider value={[minValue]} onValueChange={ e => setMinValue(e[0] as any) } defaultValue={[0]} max={prices?.data[0]} step={1} />
                <div className="flex justify-end w-full">
                  <span className={`text-green-700 ${minValue != 0 ? 'block' : 'none'}`}>{formatNumber(minValue)}</span>
                </div>
              </div>

              <div className='mt-2'>
                <h4 className='text-[15px] font-medium mb-0.5'>Maximum Price</h4>
                <Slider value={[maxValue]} onValueChange={ e => setMaxValue(e[0] as any) } defaultValue={[33]} max={prices?.data[1]} step={100} />
                <div className="flex justify-end w-full">
                  <span className={`text-green-700 ${maxValue != 0 ? 'block' : 'none'}`}>{formatNumber(maxValue)}</span>
                </div>
              </div>

            </>
          )}
        </div>

        {/* Apply Filter */}
        <div className='pt-4'>
          <Button className='w-full' size='sm' onClick={applyFilters}>Apply Filters</Button>
        </div>
      </div>

      {/* Display products */}
      <div className='w-full'>

        <div className="filters flex items-center justify-between border-b border-b-gray-200 pb-4">
          <div>
            <div className='w-[500px] relative'>
              <Search className='w-4 h-4 absolute top-1/2 transform text-gray-600 -translate-y-1/2 left-3' />
              <form onSubmit={onSubmitSearch}>
                <Input
                  ref={search}
                  defaultValue={!!queryParam ? queryParam : ''}
                  name="query"
                  placeholder='Type some keywords...'
                  className='border-gray-300 focus-visible:ring-0 pl-8'
                />
              </form>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-2'>
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
            </div>

            <div>
              <Select defaultValue={`${selectedTake ? selectedTake : "Select a number to display"}`} onValueChange={onTakeChange}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue defaultChecked placeholder="Select a number to display" defaultValue={"Select a number to display"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"Select a category"} disabled>
                      Select a number to display
                    </SelectItem>
                      <SelectItem value={'8'}>Default (8 products)</SelectItem>
                      <SelectItem value={'10'}>10 Products</SelectItem>
                      <SelectItem value={'20'}>20 Products</SelectItem>
                      <SelectItem value={'40'}>40 Products</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          </div>
          
        </div>

        <div className='grid gap-x-2 md:grid-cols-3 xs:grid-cols-1 lg:grid-cols-4 mt-5'>
          {products.isLoading ? (
            <ListAllProdudcts.LoadingProducts />
          ): (
            <>
              {products?.data?.length && products?.data && products?.data?.length > 0 ? (
                <>
                  {products?.data?.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </>
              ): <EmptyState label={"No search"} />}
            </>
          )}
        </div>

        {nextProducts.isLoading ? (
          <ListAllProdudcts.PaginationLoading />
        ): (
          <div className='flex justify-end'>
            <Pagination className='justify-end pt-4 border-t border-t-gray-200 mt-4'>
              <PaginationContent>
                {!!pageParam && pageParam > 1 && (
                  <PaginationItem>
                  <PaginationPrevious href={useURL('test-products', [
                    { key: 'filter', value: queryParam ? queryParam : ''  },
                    { key: 'brand', value: brandParam ? brandParam : ''  },
                    { key: 'maxValue', value: maxValue as any },
                    { key: 'minValue', value: minValue as any },
                    { key: 'category', value: categoryParam },
                    { key: 'take', value: takeParam ? takeParam : '' },
                    { key: 'page', value: pageParam ? pageParam - 1 : 1 },
                  ])} />
                </PaginationItem>
                )}
                {nextProducts.data && nextProducts.data.length > 0 && (
                  <PaginationItem>
                    <PaginationNext href={useURL('test-products', [
                      { key: 'filter', value: queryParam ? queryParam : ''  },
                      { key: 'brand', value: brandParam ? brandParam : ''  },
                      { key: 'maxValue', value: maxValue as any },
                      { key: 'minValue', value: minValue as any },
                      { key: 'category', value: categoryParam ? categoryParam : ''  },
                      { key: 'take', value: takeParam ? takeParam : '' },
                      { key: 'page', value: pageParam ? pageParam + 1 : 2 },
                    ])} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
          
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
    </>
  )
}

ListAllProdudcts.PaginationLoading = () => {
  return (
    <div className='flex gap-1 justify-center my-2'>
      <Skeleton className='w-[90px] h-10 rounded-md shadow-md' />
      <Skeleton className='w-[90px] h-10 rounded-md shadow-md' />
    </div>
  )
}