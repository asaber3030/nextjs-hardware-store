export function useApi(route: string, params: { key: string, value?: string }[] = []) {

  let api = '/api/'

  api += route + '?';

  for (let i of params) {
    api += i.key + '=' + i.value + '&'
  }

  if (api.endsWith('&') || api.endsWith('?')) {
    api = api.slice(0, api.length - 1)
  }

  return api

}