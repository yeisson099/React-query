import { type IResponse } from '@models/base-service.type'
import HttpService from './http.service'
import { type DayAvailability } from '@models/pickup.type'

const http = new HttpService()

export const getPickupDays = async (): Promise<DayAvailability> => {
  const response = await http
    .service()
    .get<IResponse<DayAvailability>>('/pricing-engine/config/range-day')

  return response.data
}
