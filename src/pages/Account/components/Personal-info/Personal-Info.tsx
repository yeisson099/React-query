import { useState } from 'react'
import { Grid, Typography, Divider, Skeleton } from '@mui/material'
import {
  BasicInfo,
  FormButtons,
  FormGroupComponent
} from '@/shared/components'
import { ModeEditOutline } from '@mui/icons-material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type User } from '@shared/types'
import { useMutateAccount } from '../../hooks/account.hook'
import { Cellphone } from '..'

interface CustomFormProps {
  children?: React.ReactNode
}
interface PersonalInfoProps {
  user: User
  isLoadingFetch: boolean
}

export const PersonalInfo = ({
  user,
  isLoadingFetch
}: PersonalInfoProps): React.ReactNode => {
  const [isOnEditMode, setIsOnEditMode] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<User>({ defaultValues: user })

  const { mutate: userAccountMutation, isPending: isLoadingUpdate } =
    useMutateAccount(setIsOnEditMode)

  const onSubmit: SubmitHandler<Partial<User>> = async (
    user: Partial<User>
  ) => {
    userAccountMutation(user)
  }

  const CustomForm = (props: CustomFormProps): React.ReactNode => {
    const { children } = props
    return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
  }

  return (
    <Grid>
      {isLoadingFetch || (isLoadingUpdate && 'Cargando')}
      <Grid container spacing={2} component={CustomForm}>
        <Grid item xs={12}>
          <Grid container>
            <BasicInfo
              isLoading={isLoadingFetch || isLoadingUpdate}
              gridSize={isOnEditMode ? 9 : 10}
              titleVariant="h2"
              title="Perfil"
              descriptionVariant="body1"
              description="Actualice su información de cuenta y contacto aquí."
            />

            <FormButtons
              setloading={true}
              isLoading={isLoadingFetch || isLoadingUpdate}
              gridSize={isOnEditMode ? 3 : 2}
              isSubmit={isOnEditMode}
              icon={<ModeEditOutline sx={{ fontSize: '16px !important' }} />}
              renderCancel={isOnEditMode}
              cancelAction={() => {
                setIsOnEditMode((previusState) => !previusState)
              }}
              callbackAction={() => {
                if (!isOnEditMode) {
                  setIsOnEditMode((previusState) => !previusState)
                }
              }}
            />
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <BasicInfo
              isLoading={isLoadingFetch || isLoadingUpdate}
              gridSize={6}
              titleVariant="h4"
              title="Nombre"
              descriptionVariant="description"
              description="Ingresa tu(s) nombres y apellidos"
            />
            <Grid item xs={6}>
              {isLoadingFetch || isLoadingUpdate
                ? (
                <Skeleton animation="wave" />
                  )
                : !isOnEditMode
                    ? (
                <Typography variant="body3">
                  {user?.firstName} {user?.lastName}
                </Typography>
                      )
                    : (
                <Grid container>
                  <FormGroupComponent
                    gridSize={6}
                    field={{
                      fieldName: 'firstName',
                      fieldPlaceholder: 'Nombres',
                      defaultValue: user?.firstName
                    }}
                    errors={errors}
                    register={register}
                  />
                  <FormGroupComponent
                    gridSize={6}
                    field={{
                      fieldName: 'lastName',
                      fieldPlaceholder: 'Apellidos',
                      defaultValue: user?.lastName
                    }}
                    errors={errors}
                    register={register}
                  />
                </Grid>
                      )}
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <BasicInfo
              isLoading={isLoadingFetch || isLoadingUpdate}
              gridSize={6}
              titleVariant="h4"
              title="Correo electrónico"
              descriptionVariant="description"
              description="Su correo electrónico no se puede cambiar debido a que se utiliza como inicio de sesión."
            />
            <Grid item xs={6} alignItems={'center'}>
              {isLoadingFetch || isLoadingUpdate
                ? (
                <Skeleton animation="wave" />
                  )
                : (
                <Typography variant="body1" color="rgba(0,0,0,0.3)">
                  {user?.email}
                </Typography>
                  )}
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Cellphone
          isLoadingFetch={isLoadingFetch}
          isLoadingUpdate={isLoadingUpdate}
          user={user}
          accountMutation={onSubmit}
        />
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Grid>
    </Grid>
  )
}

export default PersonalInfo
