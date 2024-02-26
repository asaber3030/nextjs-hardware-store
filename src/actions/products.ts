import { useApi } from '@/hooks/useApi'
import axios from 'axios'

export async function getProducts(filter?: string | null, category?: string, brand?: string) {

  let api = '/api/products'

  return await axios.get(api + `?filter=${filter}` + `${category ? `&category=${category}` : ''}` + `${brand ? `&brand=${brand}` : ''}`).then((data) => {
    console.log(data.data)
    return data.data
  }).catch(e => {
    console.log(e.error)
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