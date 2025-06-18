import React from 'react'
import { Grid, Divider, Button } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormGroupComponent, BasicInfo } from '@sharedComponents/index'
import { type User, type ChangePassword } from '@models/user.type'
import { useMutatePassword } from '../hooks/account.hook'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface CustomFormProps {
  children?: React.ReactNode
}

interface ChangePasswordProps {
  isLoadingFetch: boolean
  user: User
}

export const ChangePasswordComponent = ({
  user,
  isLoadingFetch
}: ChangePasswordProps): React.ReactNode => {
  const { mutate: changePasswordMutation, isPending: isLoadingUpdate } =
    useMutatePassword()

  const schema = yup.object().shape({
    password: yup
      .string()
      .oneOf([user.password], 'La contraseña actual no coincide')
      .required('La contraseña actual es requerida'),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        'La contraseña debe tener al menos 8 caracteres, un carácter especial, un número y una letra mayúscula'
      )
      .required('La nueva contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Las contraseñas deben coincidir')
      .required('Confirmar nueva contraseña es requerida')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePassword>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<ChangePassword> = async (
    data: ChangePassword
  ) => {
    changePasswordMutation(data)
  }

  const CustomForm = (props: CustomFormProps): React.ReactNode => {
    const { children } = props
    return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
  }

  return (
    <Grid container direction="column" spacing={2} component={CustomForm}>
      <Grid item xs={12}>
        <Grid container>
          <BasicInfo
            isLoading={isLoadingFetch || isLoadingUpdate}
            gridSize={10}
            titleVariant="h2"
            title="Contraseña"
            descriptionVariant="body1"
            description="Actualice la contraseña de su cuenta aquí."
          />
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Grid>

      <Grid item xs={8} mb={2}>
        <Grid container alignItems={'center'}>
          <BasicInfo
            isLoading={isLoadingFetch || isLoadingUpdate}
            gridSize={6}
            titleVariant="h4"
            title="Contraseña actual"
          />
          <Grid item xs={4}>
            <Grid container>
              <FormGroupComponent
                gridSize={12}
                fullWidth
                field={{
                  fieldName: 'password',
                  fieldPlaceholder: 'Contraseña actual',
                  defaultValue: ''
                }}
                errors={errors}
                register={register}
              />
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8} mb={2}>
        <Grid container alignItems={'center'}>
          <BasicInfo
            isLoading={isLoadingFetch || isLoadingUpdate}
            gridSize={6}
            titleVariant="h4"
            title="Nueva  contraseña"
          />
          <Grid item xs={4}>
            <Grid container>
              <FormGroupComponent
                gridSize={12}
                fullWidth
                field={{
                  fieldName: 'newPassword',
                  fieldPlaceholder: 'Nueva Contraseña',
                  defaultValue: ''
                }}
                errors={errors}
                register={register}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8} mb={2}>
        <Grid container alignItems={'center'}>
          <BasicInfo
            isLoading={isLoadingFetch || isLoadingUpdate}
            gridSize={6}
            titleVariant="h4"
            title="Confirmar nueva contraseña"
          />
          <Grid item xs={4}>
            <Grid container>
              <FormGroupComponent
                gridSize={12}
                fullWidth
                field={{
                  fieldName: 'confirmPassword',
                  fieldPlaceholder: 'Confirmar nueva contraseña',
                  defaultValue: ''
                }}
                errors={errors}
                register={register}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8} mt={2}>
        <Grid container>
          <Grid item xs={10} display='flex' justifyContent='flex-end'>
            <Button variant="outlined" type={'submit'}>
              Cambiar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChangePasswordComponent
