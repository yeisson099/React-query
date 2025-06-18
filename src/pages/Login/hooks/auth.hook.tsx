import { type Token, type Credentials } from '@models/auth.type'
import { type IResponse } from '@models/base-service.type'
import Cookies from 'js-cookie'
import { useAlert } from '@providers/Alert-system'
import { login } from '@services/auth.service'
import {
  useQueryClient,
  type UseMutateFunction,
  useMutation
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

type IUseSignUp = UseMutateFunction< IResponse<Token>,
unknown,
Credentials,
unknown>

export const useSignUp = (): IUseSignUp => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const showAlert = useAlert()

  const { mutate: signUpMutation } = useMutation<
  IResponse<Token>,
  unknown,
  Credentials,
  unknown
  >({
    mutationFn: async (credentials: Credentials) => await login(credentials),
    onSuccess: async ({ data: { token } }: IResponse<Token>) => {
      await queryClient.invalidateQueries({ queryKey: ['token'] })
      Cookies.set('AccessToken', token)
      showAlert('Ingreso exitoso', 'success')
      navigate('/orders')
    },
    onError: (error) => {
      console.log(error)
      showAlert('Error al validar las credenciales', 'error')
    }
  })

  return signUpMutation
}
