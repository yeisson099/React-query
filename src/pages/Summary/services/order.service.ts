import { type IResponse } from '@models/base-service.type'
import { type Order } from '@models/orders.type'
import HttpService from '@services/http.service'

const http = new HttpService()

export const getOrderById = async (id: string): Promise<Order> => {
  const { data } = await http.service().get<IResponse<Order>>(`orders/${id}`)
  return data
}
