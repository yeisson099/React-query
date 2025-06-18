import { type Order } from '@models/orders.type'
import {
  type PickupError,
  type DayAvailability,
  type PickupData
} from '@models/pickup.type'
import { useAlert } from '@providers/Alert-system'
import { schedulePickup } from '@services/orders.service'
import { getPickupDays } from '@services/pickup.service'
import {
  type UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationResult
} from '@tanstack/react-query'

export const usePickupDayQuery = (): UseQueryResult<DayAvailability> =>
  useQuery({
    queryKey: ['pricing_engine', 'pickup_days'],
    queryFn: async () => await getPickupDays()
  })

export const useCreatePickup = (): UseMutationResult<
Order,
PickupError,
PickupData,
unknown
> => {
  const queryClient = useQueryClient()
  const showAlert = useAlert()

  return useMutation({
    mutationFn: async (data: PickupData) => await schedulePickup(data),
    onSuccess: async () => {
      //   closeModal()
      await queryClient.invalidateQueries({
        queryKey: ['orders', 'completed']
      })
      showAlert('Recolección agendada', 'success')
    },
    onError: (errordata: PickupError) => {
      console.log(errordata)
      //   setDialogState(false)
      showAlert('Hubo un error al intentar agendar la recolección', 'error')
    }
  })
}
