import { type RequestOTP, type ResponseRequestcode, type VerifyOtp } from '@models/user.type'
import { requestOTP, verifyOTP } from '../services/account.service'
import { useMutation } from '@tanstack/react-query'
import { useAlert } from '@providers/Alert-system'

type SetDialogState = React.Dispatch<React.SetStateAction<boolean>>

export const useGetOTPCode = (setDialogState: SetDialogState) => {
  return useMutation({
    mutationFn: async (data: RequestOTP) => await requestOTP(data),
    onSuccess: async (response: ResponseRequestcode) =>
      response.success && setDialogState(true),
    onError: (error) => { console.log(error) }
  })
}

export const useVerifyOTPCode = (setDialogState: SetDialogState) => {
  const showAlert = useAlert()
  return useMutation({
    mutationFn: async (data: VerifyOtp) => await verifyOTP(data),
    onSuccess: async (response: ResponseRequestcode) => {
      if (response.success) {
        setTimeout(() => {
          setDialogState(false)
        }, 5000)
      }
    },
    onError: (error) => {
      console.log(error)
      setDialogState(false)
      showAlert('Error al actualizar tu numero de telefono', 'error')
    }
  })
}
