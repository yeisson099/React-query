import { useCallback, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQueryString } from './useQueryString'

export const usePagination = (): [
  Record<string, string>,
  Function
] => {
  const navigate = useNavigate()
  const location = useLocation()

  const [search, queryString] = useQueryString()

  const currentSearch = {
    tab: (search?.tab ?? 'pending') as string,
    page: (search?.page ?? '1') as string,
    size: (search?.size ?? '5') as string
  }

  const [pagination, setPagination] =
    useState<Record<string, string>>(currentSearch)

  const callback = useCallback(
    (type: string, value: string) => {
      const newDataPaginate = {
        ...pagination,
        [type]: value
      }
      const newPath = queryString.stringify({
        tab: pagination.tab,
        ...newDataPaginate
      })
      setPagination(newDataPaginate)
      navigate({
        pathname: location.pathname,
        search: newPath
      })
    },
    [pagination]
  )
  return [currentSearch, callback]
}
