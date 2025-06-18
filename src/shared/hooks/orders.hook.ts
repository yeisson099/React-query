import { type Order } from '@models/orders.type'
import { useAlert } from '@providers/Alert-system'
import { cloneOrder } from '@services/orders.service'
import {
  useMutation,
  useQueryClient,
  type UseMutationResult
} from '@tanstack/react-query'

export const useCloneOrder = (): UseMutationResult<Order, Error, string, unknown> => {
  const queryClient = useQueryClient()
  const showAlert = useAlert()

  return useMutation({
    mutationFn: async (orderId: string) => await cloneOrder(orderId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['orders', 'completed']
      })
      showAlert('Order Duplicada', 'success')
    },
    onError: (error) => {
      console.error('cloneOrder', error)
      showAlert('Hubo un error al intentar conar la orden', 'error')
    }
  })
}
