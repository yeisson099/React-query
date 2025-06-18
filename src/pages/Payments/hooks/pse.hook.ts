import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { useAlert } from '@providers/Alert-system'
import { requestPaymentURL } from '../services/pse.service'
import { type PaymentForm } from '@models/payment.type'

export const useMutatePse = (): UseMutationResult<
void,
Error,
PaymentForm,
unknown
> => {
  const showAlert = useAlert()

  return useMutation({
    mutationFn: async (paymentForm: PaymentForm) => {
      const {
        data: {
          transactionRequest: {
            data: { urlbanco }
          }
        }
      } = await requestPaymentURL(paymentForm)
      window.location.href = urlbanco
    },
    onSuccess: async () => {
      showAlert('Abono realizado', 'success')
    },
    onError: (error) => {
      console.log(error)
      showAlert('Error al generar la URL de pago', 'error')
    }
  })
}
