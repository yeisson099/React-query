import { type IPageParams, type PaginatedResult } from '@models/base-service.type'
import HttpService from '@services/http.service'

const http = new HttpService()

export const getTransactions = async ({
  page = 1,
  size = 10
}: IPageParams): Promise<PaginatedResult<any[]>> => {
  const response = await http
    .service()
    .get<PaginatedResult<any[]>>('/wallet/paginated', {
    limit: size,
    page
  })

  return response
}
