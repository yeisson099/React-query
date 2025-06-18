import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material'
import { KeyboardBackspaceOutlined } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { LoadingButton } from '@mui/lab'
import { type UseMutateAsyncFunction } from '@tanstack/react-query'
import { type User, type ResponseRequestcode, type VerifyOtp } from '@models/user.type'
import { OTPmeesage } from '..'
import { type MuiTelInputInfo } from 'mui-tel-input'
import { formatPhoneNumber } from '@utils/convert'
import { type SubmitHandler } from 'react-hook-form'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

interface OTPComponentProps {
  open: boolean
  loader: boolean
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  handleVerify: UseMutateAsyncFunction<
  ResponseRequestcode,
  Error,
  VerifyOtp,
  unknown
  >
  handleResend: () => void
  formValues: Partial<User>
  accountMutation: SubmitHandler<Partial<User>>
}

export const OTPComponent = ({
  open,
  loader,
  handleClose,
  handleVerify,
  handleResend,
  formValues,
  accountMutation
}: OTPComponentProps): JSX.Element => {
  const [OTPCode, setOTPCode] = useState<string>('')
  const [messageStatus, setMessageStatus] = useState<boolean | null>(null)
  const [otpComplete, setOtpComplete] = useState<boolean>(false)

  const onSubmit = async (): Promise<void> => {
    const { success } = await handleVerify({ code: OTPCode })
    setMessageStatus(success)
    if (success) {
      const { dialCode, phone } = formValues
      accountMutation({
        dialCode,
        phone
      })
    }
  }

  return (
    <>
      <BootstrapDialog open={open}>
        <Grid container alignItems={'center'}>
          <Grid item xs={1}>
            <IconButton
              aria-label="close"
              onClick={() => {
                handleClose(false)
              }}
            >
              <KeyboardBackspaceOutlined />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <DialogTitle sx={{ p: 2, textAlign: 'center' }}>
              Verifica tu numero
            </DialogTitle>
          </Grid>
        </Grid>
        <DialogContent dividers>
          <Typography sx={{ textAlign: 'center' }} gutterBottom>
            Por favor ingresa el código enviado al
          </Typography>
          <Typography sx={{ textAlign: 'center' }} gutterBottom>
            {`${formValues?.dialCode} ${formatPhoneNumber(
              formValues?.phone ?? ''
            )}`}
          </Typography>
          <Grid width={'80%'} m={'auto'} container alignItems={'center'}>
            <Grid item xs p={2}>
              <MuiOtpInput
                sx={{
                  borderColor: '#7E00FB'
                }}
                onChange={setOTPCode}
                onComplete={() => {
                  setOtpComplete(true)
                }}
                value={OTPCode}
                length={6}
                autoFocus
                TextFieldsProps={{
                  type: 'number'
                }}
              />
            </Grid>
          </Grid>
          {messageStatus !== null && <OTPmeesage success={messageStatus} />}
        </DialogContent>
        <DialogActions sx={{ alignItems: 'center' }}>
          <Grid container alignItems={'center'}>
            <Grid item xs={12} textAlign={'center'}>
              <LoadingButton
                disabled={!otpComplete}
                variant="contained"
                onClick={onSubmit}
                loading={loader}
              >
                Verificar
              </LoadingButton>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <LoadingButton
                variant="text"
                onClick={handleResend}
                loading={false}
              >
                Reenviar código
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}
