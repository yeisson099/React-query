import React from 'react'
import Alert, { type AlertColor } from '@mui/material/Alert'
import { styled } from '@mui/system'
import { type ResponseRequestcode } from '@models/user.type'

type PartialOTPStatus = Extract<AlertColor, 'success' | 'error'>

export const OTPmeesage = ({ success }: ResponseRequestcode): React.ReactNode => {
  const InfoText = styled(Alert)(() => ({
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none',
    justifyContent: 'center',
    display: 'flex'
  }))

  const SUCCESS_MESSAGE = 'Tu numero de celular ha sido verificado!'
  const ERROR_MESSAGE =
    'Tu numero no se ha podido verificar, porfavor intenta de nuevo'

  const severity = (): PartialOTPStatus => {
    if (success) return 'success'
    return 'error'
  }

  return (
    <InfoText
      severity={severity()}
      variant="outlined"
      sx={{ color: success ? 'green' : 'red' }}
    >
      {success ? SUCCESS_MESSAGE : ERROR_MESSAGE}
    </InfoText>
  )
}
