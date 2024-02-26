"use client";

import { getProductById } from "@/actions/products";
import { useQuery } from "@tanstack/react-query";

import { ProductInformationDisplay } from "@/app/_components/product/product-details";
import { ProductImagesDisplay } from "@/app/_components/product/product-images";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductTypo } from "@/app/_components/product/product-type";

interface Props { 
  params: { id: string }  
}

const ProductPreview = ({ params }: Props) => {

  const { id } = params

  const product = useQuery({
    queryKey: ['products', id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1] as any)
  })

  if (product.isLoading) return <ProductPreview.Skeleton />

  return (
    <div>
      <div className='flex gap-6 px-14 py-6'>
        <ProductImagesDisplay productImage={product.data.image} images={product.data.productImages} />
        <ProductInformationDisplay product={product.data} />
      </div>
      <div className='mx-14 py-4 border-t border-t-gray-100'>
        <ProductTypo text={product.data.editor} />
      </div>
    </div>
  );
}

ProductPreview.Skeleton = () => {
  return (
    <div className='flex gap-6 px-14 py-6'>

      {/* Product Image */}
      <div>
        <Skeleton 
          className="w-[700px] h-[400px]"
        />
        <div className='flex justify-center items-center gap-x-2 mt-5'>
          <Skeleton className="w-[100px] h-20" />
          <Skeleton className="w-[100px] h-20" />
        </div>

      </div>


      {/* Product Details */}
      <div className='w-full flex flex-col gap-y-1'>
        <Skeleton className='w-full h-2' />
        <Skeleton className='w-[120px] h-2' />
        <Skeleton className='w-[60px] h-2' />
        <div className='flex flex-col gap-y-2 mt-4'>
          <Skeleton className='w-[70%] h-2' />
          <Skeleton className='w-[85%] h-2' />
          <Skeleton className='w-[60%] h-2' />
        </div>

        <div className='flex mt-6 items-center gap-x-2'>
          <Skeleton className='w-[60px] h-2' />
          <Skeleton className='w-[80px] h-[40px]' />
          <Skeleton className='w-[60px] h-2' />
        </div>

        <div className='flex items-center gap-x-1 mt-3'>
          <Skeleton className='w-[70px] h-10' />
          <Skeleton className='w-[70px] h-10' />
        </div>

        <Skeleton className='h-0.5 w-full my-3' />

        <div className='flex items-center gap-x-3'>
          <Skeleton className="w-[70px] h-2" />
          <Skeleton className="w-[120px] h-2" />
        </div>

        <Skeleton className='h-0.5 w-full my-3' />
        
        <div className='flex gap-y-3 flex-col'>
          <div className='flex gap-x-2'>
            <Skeleton className='w-1.5 rounded-full h-2' />
            <Skeleton className='w-[250px] h-2' />
          </div>
          <div className='flex gap-x-2'>
            <Skeleton className='w-1.5 rounded-full h-2' />
            <Skeleton className='w-[250px] h-2' />
          </div>
          <div className='flex gap-x-2'>
            <Skeleton className='w-1.5 rounded-full h-2' />
            <Skeleton className='w-[250px] h-2' />
          </div>
          <div className='flex gap-x-2'>
            <Skeleton className='w-1.5 rounded-full h-2' />
            <Skeleton className='w-[250px] h-2' />
          </div>
          <div className='flex gap-x-2'>
            <Skeleton className='w-1.5 rounded-full h-2' />
            <Skeleton className='w-[250px] h-2' />
          </div>
        </div>

        <Skeleton className='h-0.5 w-full my-3' />

        <div className='flex gap-1'>
          <Skeleton className='w-[200px] h-12 ring-2 ring-gray-200 mr-3' />
          <Skeleton className='w-[120px] h-12' />
          <Skeleton className='w-[40px] h-12' />
          <Skeleton className='w-[120px] h-12' />
        </div>

      </div>

    </div>
  )
}
 
export default ProductPreview;