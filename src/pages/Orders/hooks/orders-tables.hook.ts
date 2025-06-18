import { type UseQueryResult, useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { bulkDelete, getUserOrders } from '../services/orders-table.service'
import { useAlert } from '@providers/Alert-system'
import { type TableParams, type Order } from '@models/orders.type'
import { type PaginatedResult } from '@models/base-service.type'

export const getOrdersQuery = ({
  page,
  size,
  key,
  service,
  isDraftOrder = true
}: TableParams): UseQueryResult<PaginatedResult<Order[]>> => {
  return useQuery({
    queryKey: [service, key, page, size],
    queryFn: async () =>
      await getUserOrders({
        page: parseInt(page),
        size: parseInt(size),
        draftOrders: isDraftOrder
      }),
    select: (values) => {
      const { data, ...rest } = values
      const newData = data?.map((item) => ({
        ...item,
        company_name: item?.shipal?.company_name ?? 'Sin Store',
        client_name: item?.consignee?.company_name || 'Sin Cliente'
      }))
      return {
        data: newData,
        ...rest
      }
    }
  })
}

export const useMutateOrdersList = ({ page, size }: any) => {
  const queryClient = useQueryClient()
  const showAlert = useAlert()

  return useMutation({
    mutationFn: async (selectedIds: string[]) => await bulkDelete(selectedIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['orders', 'draft', page, size]
      })
      showAlert(
        'Los datos de la tabla de ordenes pendientes han sido actualizados',
        'success'
      )
    },
    onError: (error) => {
      console.error(error)
      showAlert('Error al actualizar los datos de la tabla de ordenes pendientes', 'error')
    }
  })
}
