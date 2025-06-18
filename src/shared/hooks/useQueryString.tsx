import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const useQueryString = (): [queryString.ParsedQuery<string>, typeof queryString] => {
  const { search } = useLocation()
  const methods = queryString
  const parsed = queryString.parse(search)

  return [parsed, methods]
}
