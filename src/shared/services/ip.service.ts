import { type ApiIpResponse } from '@models/ip.type'
import axios from 'axios'

export const getIp = async (): Promise<string> => {
  const { data } = await axios.get<ApiIpResponse>(
    'https://api.ipify.org?format=json'
  )
  return data.ip
}
