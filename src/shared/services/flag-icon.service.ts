import axios from 'axios'
import { type Flag } from '@models/user.type'

export const getFlags = async (): Promise<Flag[]> => {
  const resp = await axios.get<Flag[]>(
    'https://gist.githubusercontent.com/devhammed/78cfbee0c36dfdaa4fce7e79c0d39208/raw/07df5ed443941c504c65e81c83e6313473409d4c/countries.json'
  )
  return resp.data
}
