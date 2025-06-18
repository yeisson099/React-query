import { type Token, type Credentials } from '@models/auth.type'
import { type IResponse } from '@models/base-service.type'
import HttpService from '@services/http.service'

const http = new HttpService()

export const login = async (credentials: Credentials): Promise<IResponse<Token>> => {
  const response = await http
    .service()
    .post<IResponse<Token>, Credentials>('/auth/user/login', credentials)

  return response
}
