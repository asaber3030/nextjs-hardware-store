import Image from "next/image"

import { ProductImageType } from "@/types/product-image"
import { useState } from "react"

interface Props {
  productImage: string,
  images?: ProductImageType[]
}

export const ProductImagesDisplay = ({ productImage, images }: Props) => {

  const [currentImage, setCurrentImage] = useState(productImage)

  return (
    <div className="min-w-[700px] w-[700px] h-fit">
      <div className='flex items-center justify-center p-5 py-10 bg-gray-100 rounded-md shadow-md mb-5 h-[400px]'>
        <Image src={currentImage} alt='Main product image' className='max-w-full my-5 max-h-[350px] object-contain' width={350} height={100} />
      </div>
      <div className='flex justify-center items-center gap-x-2'>
        {images?.map((image: ProductImageType) => (
          <div onClick={ () => setCurrentImage(image.location) } className='p-4 rounded-sm cursor-pointer transition-all hover:bg-gray-200 h-20 '>
            <Image src={image.location} alt='Product Image' width={70} height={70} className='max-h-full max-w-full object-contain' />
          </div>
        ))}
      </div>
    </div>
  )
}