import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { getTransactions } from '../services/wallet.service'
import { type IResponse, type IPageParams } from '@models/base-service.type'
import { type IHistory } from '@models/wallet'

export const getTransacionsQuery = ({
  page,
  size
}: IPageParams): UseQueryResult<IResponse<IHistory>> => {
  return useQuery({
    queryKey: ['wallet', 'transactions', page, size],
    queryFn: async () =>
      await getTransactions({
        page: parseInt(page),
        size: parseInt(size)
      })
  })
}
