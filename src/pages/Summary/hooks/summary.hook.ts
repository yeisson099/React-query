import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getOrderById } from '../services/order.service'
import { type Order } from '@models/orders.type'

export const getOrderByIdQuery = (
  id: string
): UseQueryResult<Order> => {
  return useQuery({
    queryKey: ['order', 'summary', id],
    queryFn: async () => await getOrderById(id)
  })
}
