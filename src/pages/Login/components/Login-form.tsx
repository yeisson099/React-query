import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, Alert, Stack } from '@mui/material'
import { type Credentials } from '@models/auth.type'

// import { Logo } from '../../atoms/logo'

// import logo from '../../../assets/imgs/shipal-logo6.svg'
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormField } from '@sharedComponents/index'
import { LoadingButton } from '@mui/lab'
import { useSignUp } from '../hooks/auth.hook'

export const LoginForm: React.FC = () => {
  const login = useSignUp()

  const schema = yup.object().shape({
    email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    password: yup.string().required('La contraseña es requerida')
  })

  const formMethods = useForm({
    resolver: yupResolver(schema)
  })
  const { handleSubmit } = formMethods

  const onSubmit: SubmitHandler<Credentials> = (data) => {
    login(data)
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <FormField
              name="email"
              label="Correo Electrónico"
              size="medium"
              showError
            />
            <FormField
              name="password"
              label="Contraseña"
              type="password"
              size="medium"
              showError
            />
            <LoadingButton
              variant="contained"
              color="primary"
              loading={false}
              type="submit"
              sx={{
                minHeight: '37px'
              }}
            >
              Enviar
            </LoadingButton>
          </Stack>
        </form>
      </FormProvider>
    </>
  )
}
