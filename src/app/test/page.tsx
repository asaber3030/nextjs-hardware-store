"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { add, remove, plus, minus, changeColor } from "@/store/slices/cart";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const TestPage = () => {

  const product1 = {
    "id": 1,
    "name": "X1",
    "price": 1500,
    "offerPrice": 1500,
    "brand": "Brand",
    "color": "Black,Red,White",
    "keywords": "Product",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit quasi autem iste cum quod, voluptate, nobis assumenda harum nisi ipsam illum illo aperiam dolorum, exercitationem laborum.",
    "qty": 5,
    "image": "/defaults/default-image.png",
    "categoryId": 34234234,
  }
  const product2 = {
    "id": 2,
    "name": "X2",
    "price": 1500,
    "offerPrice": 1500,
    "brand": "Brand",
    "color": "Black,Red,White",
    "keywords": "Product",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit quasi autem iste cum quod, voluptate, nobis assumenda harum nisi ipsam illum illo aperiam dolorum, exercitationem laborum.",
    "qty": 5,
    "image": "/defaults/default-image.png",
    "categoryId": 34234234,
  }

  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    console.log(cart)
  }, [cart])
  return (
    <div>
      <Button onClick={ () => dispatch(changeColor({ product: product1, color: "changed color!" })) }>Color</Button>
      <Button onClick={ () => dispatch(plus({ product: product1, quantity: 1 })) }>Plus</Button>
      <Button onClick={ () => dispatch(minus({ product: product1, quantity: 1 })) }>Minus</Button>
      <Button onClick={ () => dispatch(add({ productId: 1, qty: 1, color: "REd", productData: product1 })) }>Add</Button>
      <Button onClick={ () => dispatch(remove({ productId: 1, qty: 1, color: "REd", productData: product1 })) }>Remove</Button>
      <hr/>
      <Button onClick={ () => dispatch(changeColor({ product: product2, color: "changed color!" })) }>Color</Button>
      <Button onClick={ () => dispatch(plus({ product: product2, quantity: 1 })) }>Plus</Button>
      <Button onClick={ () => dispatch(minus({ product: product2, quantity: 1 })) }>Minus</Button>
      <Button onClick={ () => dispatch(add({ productId: 2, qty: 1, color: "REd", productData: product2 })) }>Add</Button>
      <Button onClick={ () => dispatch(remove({ productId: 2, qty: 1, color: "REd", productData: product2 })) }>Remove</Button>
    </div>
  );
}
 
export default TestPage;