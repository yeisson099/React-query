export type IParams = Record<string, any>

export type IPageParams = {
  page: number
  size: number
}
export interface IGenericOptions {
  url: string
  params?: IParams
}

export interface IErrorResponse {
  status: string
  message: string
}

export interface IResponse<T> {
  data: T
  message: string
  statusCode?: number
  status?: number
}

export interface PaginatedResult<T> {
  data: T
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  total: number
  page: number
  limit: number
  status: number
}

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
