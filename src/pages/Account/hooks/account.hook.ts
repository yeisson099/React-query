import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  changeUserPassword,
  updateAccountData
} from '../services/account.service'
import { type ChangePassword, type User } from '@models/user.type'
import { useAlert } from '@providers/Alert-system'

export const useMutateAccount = (
  setIsOnEditMode: (previuseditState: any) => void
) => {
  const queryClient = useQueryClient()
  const showAlert = useAlert()

  return useMutation({
    mutationFn: async (data: Partial<User>) => await updateAccountData(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user_data'] })
      setIsOnEditMode((previuseditState: any) => !previuseditState)
      showAlert('Los datos de tu cuenta han sido actualizados', 'success')
    },
    onError: (error) => {
      console.log(error)
      showAlert('Error al actualizar los datos de tu cuenta', 'error')
    }
  })
}

export const useMutatePassword = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ChangePassword) => await changeUserPassword(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user_data'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
}
