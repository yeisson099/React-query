import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type User } from '@shared/types'
import { getUserData } from '@services/user.service'

export const useUserQuery = (): UseQueryResult<User> =>
  useQuery({
    queryKey: ['user_data'],
    queryFn: async () => await getUserData(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    initialData: null
  })
