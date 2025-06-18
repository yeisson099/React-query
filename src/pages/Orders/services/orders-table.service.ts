import { type PaginatedResult } from '@models/base-service.type'
import { type Order, ORDER_STATUS, type ParamGetUserOrders } from '@models/orders.type'
import HttpService from '@services/http.service'

const http = new HttpService()

export const getUserOrders = async ({
  page = 1,
  size = 10,
  draftOrders = false
}: ParamGetUserOrders): Promise<PaginatedResult<Order[]>> => {
  const url = draftOrders
    ? `/orders/my-orders?order_status=${ORDER_STATUS.DRAFT}`
    : `/orders/my-orders?order_status=${ORDER_STATUS.ACEPTED},${ORDER_STATUS.SCHEDULED}`

  const response = await http.service().get<PaginatedResult<Order[]>>(url, {
    limit: size,
    page
  })

  return response
}

export const bulkDelete = async (ids: string[]) => {
  const response = await http.service().delete('/orders/many', {
    data: {
      orders: ids
    }
  })
  return response
}
