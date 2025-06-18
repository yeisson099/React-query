import React from 'react'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { Paragraph as ShipalParagraph } from '@sharedComponents/Paragraph'
import { usePaymentStore } from '@store/payment.store'
import { useFormContext } from 'react-hook-form'

const AddAmount: React.FC = () => {
  const { setAmount } = usePaymentStore()
  const { register, formState: { errors } } = useFormContext()
  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newAmount = parseInt(event.target.value)
    setAmount(newAmount)
  }
  const message = errors?.value?.message as string

  return (
    <ShipalParagraph title="Cargar créditos" titleVariant="h1" textAlign='center'>
      <TextField
        label={'Monto'}
        type="number"
        size="medium"
        {...register('value')}
        onChange={handleAmountChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography
                variant="body1"
                color="rgba(0, 0, 0, 0.87)"
                fontSize="18px"
              >
                $
              </Typography>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <Typography variant="body1" color="rgba(0, 0, 0, 0.87)">
                COP
              </Typography>
            </InputAdornment>
          )
        }}
        error={!!errors.value}
        helperText={errors.value ? message : ''}
        variant="outlined"
      />
    </ShipalParagraph>
  )
}

export default AddAmount
