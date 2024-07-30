import { useApi } from '@/hooks/useApi'

import axios from 'axios'

export async function getProducts(
  filter?: string | null, 
  category?: string, 
  brand?: string,
  colors?: string[],
  range?: number[]
) {

  let api = '/api/products/test'

  return await axios.get(api + `?filter=${filter}` + `${category ? `&category=${category}` : ''}` + `${brand ? `&brand=${brand}` : ''}`).then((data) => {
    return data.data
  }).catch(e => {
    console.log(e.error)
  })
}

export async function getProductsPost(
  filter?: string | null, 
  category?: string, 
  brand?: string,
  colors?: string[],
  range?: number[]
) {

  let api = '/api/products/test'

  return await axios.post(api, {
    query: filter, category, brand, colors, range
  }).then((data) => {
    console.log(data.data)
    return data.data
  }).catch(e => {
    console.log(e.error)
  })
}

export async function getAllProducts() {
  return await axios.get('/api/products/all').then((data) => {
    return data.data
  })
}

export async function getProductById(id: number) {
  return await axios.get(`/api/products/${id}`).then((data) => {
    return data.data
  })
}

export async function getNumberOfProducts(limit?: number) {
  return await axios.get(`/api/products?limit=${limit}`).then((data) => {
    return data.data
  })
}

export async function getBrands(filter?: string) {
  return await axios.get(filter ? `/api/products/brands?filter=${filter}` : '/api/products/brands').then((data) => {
    return data.data
  })
}

export async function getColors() {
  return await axios.get(`/api/products/colors`).then((data) => {
    return data.data
  })
}

export async function getMaxAndMin() {
  return await axios.get(`/api/products/prices`).then((data) => {
    return data.data
  })
}

export async function getProductsIn(ids: number[]) {
  return await axios.post(useApi('products/in'), ids).then((data) => {
    return data.data
  })
}

export async function getOffers(take?: string) {
  if (take) {
    return await axios.get(useApi('offers', [
      { key: 'take', value: take }
    ])).then((data) => {
      return data.data
    })
  }
  return await axios.get(useApi('offers')).then((data) => {
    return data.data
  })
}


export async function getProductsByServer(
  filter?: string | null, 
  category?: string, 
  brand?: string,
  colors?: string[],
  range?: number[]
) {

  
}
