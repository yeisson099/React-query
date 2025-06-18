import { type PaymentForm, type PaymentURLResponse } from '@models/payment.type'
import axios from 'axios'

export const requestPaymentURL = async (
  paymentForm: PaymentForm
): Promise<PaymentURLResponse> => {
  const resp = await axios.post<PaymentURLResponse>(
    'https://api-dev.shipal.co/wallet/transactions/',
    paymentForm,
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  )
  return resp.data
}
