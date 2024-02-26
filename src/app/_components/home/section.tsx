import { cn, generateArray } from "@/lib/utils";

import { Product } from "@/types/product"; 

import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { ProductCard } from "../product";
import { ProductSkeleton } from "../skeleton/product-skeleton";

interface HomeSectionDisplay {
  title?: string,
  bg?: boolean,
  isLoading?: boolean,
  products?: Product[]
}

export const HomeSectionDisplay = ({ isLoading, title, bg, products }: HomeSectionDisplay) => {

  if (isLoading) {
    return (
      <div className={cn(
        'px-14 py-8',
        bg ? 'bg-[#e9e9e9]' : 'bg-white'
      )}>
        <h2 className='text-5xl font-bold'>{title}</h2>
        <Separator className='my-3 h-[.75px] bg-main/10' />
        <HomeSectionDisplay.Skeleton />
      </div>
    )
  }

  return (
    <div className={cn(
      'px-14 py-8',
    )}>
      <h2 className='text-4xl font-bold'>{title}</h2>
      <Separator className='my-3 h-[.75px] bg-main/10' />
      <Carousel
        opts={{ align: "end" }}
        className="w-full"
      >
        <CarouselContent>
          {products?.map((product: Product) => (
            <CarouselItem key={product.id} className='relative md:basis-1/4 lg:basis-1/5'>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
 

HomeSectionDisplay.Skeleton = function HomePageSkeleton () {
  return (
    <div className='flex gap-2 p-5'>
      {generateArray(5).map((_, idx) => (
        <ProductSkeleton />
      ))}
    </div>
  )
}