import { getIp } from '@services/ip.service'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'

export const useIPQuery = (): UseQueryResult<any> =>
  useQuery({
    queryKey: ['user_ip'],
    queryFn: async () => await getIp(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    initialData: null
  })
