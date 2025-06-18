import axios from 'axios'
import type { UserServerResponse, User, ChangePassword, RequestOTP, VerifyOtp, ResponseRequestcode } from 'src/shared/types/user.type'

export const updateAccountData = async (userData: Partial<User>): Promise<User | null> => {
  const resp = await axios.put<UserServerResponse>('https://api-dev.shipal.co/auth/user/update-me', userData, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  return resp.data.data
}

export const changeUserPassword = async (userData: ChangePassword): Promise<User | null> => {
  const resp = await axios.put<UserServerResponse>('https://api-dev.shipal.co/auth/user/update-me', userData, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  return resp.data.data
}

export const requestOTP = async (userData: RequestOTP): Promise<ResponseRequestcode> => {
  const resp = await axios.post<ResponseRequestcode>('https://api-dev.shipal.co/auth/otp/generate-code', userData, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  return resp.data
}

export const verifyOTP = async (userData: VerifyOtp): Promise<ResponseRequestcode> => {
  const resp = await axios.post<ResponseRequestcode>(
    'https://api-dev.shipal.co/auth/otp/verify-code',
    userData,
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  )
  return resp.data
}
