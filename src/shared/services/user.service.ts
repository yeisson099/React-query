import { type User, type UserServerResponse } from '@models/user.type'
import HttpService from './http.service'

const http = new HttpService()

export const getUserData = async (): Promise<User> => {
  const resp = await http.get<UserServerResponse>(
    '/auth/user/me'
  )
  return resp.data
}
