import { type Order } from '@models/orders.type'
import HttpService from './http.service'
import { type IResponse } from '@models/base-service.type'
import { type PickupData } from '@models/pickup.type'

const http = new HttpService()

export const cloneOrder = async (orderId: string): Promise<Order> => {
  const response = await http
    .service()
    .post<IResponse<Order>, { orderId: string }>('/orders/clone', { orderId })
  return response.data
}

export const createGuide = async (order: string): Promise<Order> => {
  const response = await http
    .service()
    .post<Order, { order: string }>('/orders/shipment', {
    order
  })
  return response
}

export const schedulePickup = async (data: PickupData): Promise<Order> => {
  const response = await http
    .service()
    .post<IResponse<Order>, PickupData>('/orders/pickup', data)
  return response.data
}
