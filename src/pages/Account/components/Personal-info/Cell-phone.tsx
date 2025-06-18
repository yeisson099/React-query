import React, { useState } from 'react'
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,

  FormControl,
  InputLabel
} from '@mui/material'
import { BasicInfo } from '@sharedComponents/Basic-info'
import { OTPComponent } from './OTP-modal'
import { type User } from '@models/user.type'
import { useGetOTPCode, useVerifyOTPCode } from '../../hooks/otp.hook'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { formatPhoneNumber } from '@utils/convert'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  type CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput
} from 'react-international-phone'
import 'react-international-phone/style.css'

type CellphoneProps = {
  isLoadingFetch: boolean
  isLoadingUpdate: boolean
  user: User
  accountMutation: SubmitHandler<Partial<User>>
}

export const Cellphone: React.FC<CellphoneProps> = ({
  isLoadingFetch,
  isLoadingUpdate,
  user,
  accountMutation
}: CellphoneProps) => {
  const [openDialog, setOTPDialogStatus] = useState<boolean>(false)
  const [isOnEditMode, setIsOnEditMode] = useState(false)

  const formValidations = yup.object().shape({
    dialCode: yup.string().required('El indicativo de pais es requerido'),
    phone: yup
      .string()
      .required('El teléfono es requerido')
      .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos')
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues
  } = useForm<Pick<User, 'phone' | 'dialCode'>>({
    defaultValues: user,
    mode: 'onChange',
    resolver: yupResolver(formValidations)
  })

  const {
    country,
    setCountry,
    phone: dialCode
  } = usePhoneInput({
    value: user.dialCode,
    countries: defaultCountries
  })

  const { mutate: getOTPCode, isPending: RequestingOtpLoading } =
      useGetOTPCode(setOTPDialogStatus)

  const { isPending: validateOtpLoader, mutateAsync: verifyOTPMutation } =
      useVerifyOTPCode(setOTPDialogStatus)

  const isLoading = isLoadingFetch || isLoadingUpdate

  const onSubmit = handleSubmit(async (data) => {
    await handleClickOpenOTPDialog(data)
  })

  const handleClickOpenOTPDialog = async (
    { phone }: Pick<User, 'phone'>
  ): Promise<void> => {
    getOTPCode({
      cellphone: `${dialCode}${phone}`
    })
  }

  const handleCancel = (): void => {
    setIsOnEditMode(false)
    reset({
      dialCode: user?.dialCode,
      phone: user?.phone
    })
  }

  return (
    <>
      {openDialog && country
        ? (
        <OTPComponent
          open={openDialog}
          loader={validateOtpLoader}
          handleClose={setOTPDialogStatus}
          handleVerify={verifyOTPMutation}
          handleResend={handleClickOpenOTPDialog}
          formValues={{ dialCode, phone: getValues('phone') }}
          accountMutation={accountMutation}
        />
          )
        : null}
      <Grid container alignItems={'center'}>
        {isLoading && <Skeleton animation="wave" variant="rectangular" />}
        {!isLoading && (
          <>
            <BasicInfo
              isLoading={isLoading}
              gridSize={6}
              titleVariant="h4"
              title="Teléfono"
            />
            <Grid item xs={6} alignItems={'center'}>
              {!isOnEditMode
                ? (
                <Stack
                  flexDirection="row"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Typography variant="body3" mr={5}>
                    {user?.dialCode} {formatPhoneNumber(user?.phone)}
                  </Typography>
                  <Button
                    variant="text"
                    sx={{ margin: '0 !important' }}
                    onClick={() => {
                      setIsOnEditMode(true)
                    }}
                  >
                    Cambiar
                  </Button>
                </Stack>
                  )
                : (
                <form onSubmit={onSubmit}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="spa"
                    alignItems="center"
                    wrap="nowrap"
                    spacing={1}
                  >
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="phone-select-label">Celular</InputLabel>
                        <Select
                          labelId="phone-select-label"
                          id="phone-select"
                          value={country.iso2}
                          size="small"
                          {...register('dialCode')}
                          error={!!errors.dialCode}
                          MenuProps={{
                            style: {
                              height: '300px',
                              width: '360px',
                              top: '10px',
                              left: '-34px'
                            }
                          }}
                          label="Celular"
                          onChange={(e) => {
                            setCountry(e.target.value as CountryIso2)
                          }}
                          renderValue={(value) => {
                            return (
                              <Stack direction="row" spacing={2}>
                                <FlagImage
                                  iso2={value}
                                  style={{ display: 'flex' }}
                                />
                                <Typography color="gray">
                                  +{country.dialCode}
                                </Typography>
                              </Stack>
                            )
                          }}
                        >
                          {defaultCountries.map((c) => {
                            const country = parseCountry(c)
                            return (
                              <MenuItem key={country.iso2} value={country.iso2}>
                                <FlagImage
                                  iso2={country.iso2}
                                  style={{ marginRight: '8px' }}
                                />
                                <Typography marginRight="8px">
                                  {country.name}
                                </Typography>
                                <Typography color="gray">
                                  +{country.dialCode}
                                </Typography>
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label={'Teléfono'}
                        type="number"
                        size="small"
                        error={!!errors.phone}
                        {...register('phone', { required: true })}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Stack
                        direction={'row'}
                        justifyContent={'flex-end'}
                        spacing={2}
                        gap={2}
                      >
                        <LoadingButton
                          variant="contained"
                          type="submit"
                          loading={RequestingOtpLoading}
                        >
                          Verificar
                        </LoadingButton>

                        <Button
                          variant="text"
                          type="button"
                          sx={{ margin: '0 !important' }}
                          onClick={handleCancel}
                        >
                          Cancelar
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
                  )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}
