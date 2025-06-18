import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import LoadingButton from '@mui/lab/LoadingButton'
import { type CreateLabelError, type Order } from '@models/orders.type'
import { type BalanceValidationData, PaymentAds } from './Payment-ads'
import { PaymentError } from '../Payment-error'
import { checkCompletedDueDiligence } from '@utils/dueDiligenceCheck'
import { createGuide } from '@services/orders.service'
import { validateUserBalance } from '@services/wallet.service'

interface Props {
  order: Order
}

export const PaymentButton: React.FC<Props> = ({ order }) => {
  const [error, setError] = useState<CreateLabelError>()
  const [isOnError, setIsOnError] = useState(false)
  const [dataBalanceValidated, setDataBalanceValidated] =
    useState<BalanceValidationData>()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isOpenAdvPayment, setIsOpenAdvPayment] = useState(false)

  const handleOpenModal = (): void => {
    setIsOpenAdvPayment(!isOpenAdvPayment)
  }
  const navigate = useNavigate()

  const validateCurrentBalance = async (): Promise<void> => {
    setIsLoading(true)
    const currentBalanceValidation = await validateUserBalance(
      order.total_payment
    )
    setDataBalanceValidated(currentBalanceValidation)
    handleOpenModal()
  }

  const closeModal = (): void => {
    setIsLoading(false)
    handleOpenModal()
  }

  const { mutate } = useMutation({
    mutationFn: async (id: string) => await createGuide(id),
    onSuccess: (_, id) => {
      setIsLoading(false)
      setIsLoadingPayment(false)
      navigate(`/order/result/${id}`)
    },
    onError: (errordata: CreateLabelError) => {
      setIsLoading(false)
      setError(errordata)
      setIsLoadingPayment(false)
      setIsOnError(true)
    }
  })

  const handlePay = (): void => {
    setIsLoadingPayment(true)
    setIsLoading(true)
    mutate(order._id)
  }

  return (
    <>
      <LoadingButton
        type="button"
        variant="contained"
        loading={isLoading}
        onClick={validateCurrentBalance}
        sx={{ padding: '15px' }}
        disabled={
          !checkCompletedDueDiligence(order.due_diligence) ||
          !order.total_payment
        }
      >
        Pagar
      </LoadingButton>

      <PaymentAds
        open={isOpenAdvPayment}
        isLoadingPayment={isLoadingPayment}
        handleClose={closeModal}
        handleConfirm={handlePay}
        balanceData={dataBalanceValidated}
      />

      {isOnError && <PaymentError total={order.total_payment} error={error} />}
    </>
  )
}
