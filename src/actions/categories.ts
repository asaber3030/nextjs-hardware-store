import axios from 'axios'

export async function getCategories(filter?: string) {
  return await axios.get(`/api/categories`).then((data) => {
    return data.data
  })
}

export async function getCategory(id: number) {
  return await axios.get(`/api/categories/${id}`).then((data) => {
    return data.data
  })
}