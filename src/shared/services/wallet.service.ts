import { type BalanceValidationData } from '@models/wallet'
import HttpService from './http.service'
import { type IResponse } from '@models/base-service.type'

const http = new HttpService()

export const validateUserBalance = async (
  amountToDeb: number
): Promise<BalanceValidationData> => {
  const response = await http
    .service()
    .get<IResponse<BalanceValidationData>>(
      `/wallet/check-capacity/${amountToDeb}`
  )

  return response.data
}
