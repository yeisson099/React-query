import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { Flag} from '@shared/types'
import { getFlags } from '@services/flag-icon.service'

export const useFlagIconQuery = (): UseQueryResult<Flag[]> =>
  useQuery({
    queryKey: ["flags"],
    queryFn: async () => await getFlags(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    initialData: null,
  })
