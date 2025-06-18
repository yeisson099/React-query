import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Divider,
  Skeleton,
  Button,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material'
import {
  BasicInfo,
  FormButtons,
  FormGroupComponent
} from '@/shared/components'
import { ModeEditOutline } from '@mui/icons-material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { updateAccountData } from '../../services/account.service'
import { type User } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DETAILS,
  EMPOLOYEE_OPTIONS,
  INDUSTRY_OPTIONS,
  INFO
} from './meessages.const'

interface CustomFormProps {
  children?: React.ReactNode
}

interface BusinessInfoProps {
  user: User | null | undefined
  isLoadingFetch: boolean
}

export const BusinessInfo = ({
  user,
  isLoadingFetch
}: BusinessInfoProps): React.ReactNode => {
  const queryClient = useQueryClient()
  const [isOnEditMode, SetIsOnEditMode] = useState(false)
  const { mutate: userAccountMutation, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: async (data: User) => await updateAccountData(data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user_data'] })
        SetIsOnEditMode((previuseditState) => !previuseditState)
      },
      onError: (error) => {
        console.log(error)
      }
    })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    defaultValues: user ?? {}
  })

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    userAccountMutation(data)
  }

  const CustomForm = (props: CustomFormProps): React.ReactNode => {
    const { children } = props
    return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
  }

  const IsFetching = isLoadingFetch || isLoadingUpdate

  return (
    <Grid container spacing={2} component={CustomForm}>
      <Grid item xs={12}>
        <Grid container>
          <BasicInfo
            isLoading={IsFetching}
            gridSize={isOnEditMode ? 9 : 10}
            titleVariant="h2"
            title="Empresa"
            descriptionVariant="body1"
            description="Actualice la información de su empresa aquí."
          />

          <FormButtons
            setloading={true}
            isLoading={IsFetching}
            gridSize={isOnEditMode ? 3 : 2}
            isSubmit={isOnEditMode}
            icon={<ModeEditOutline sx={{ fontSize: '16px !important' }} />}
            renderCancel={isOnEditMode}
            cancelAction={() => {
              SetIsOnEditMode((previusState) => !previusState)
            }}
            callbackAction={() => {
              !isOnEditMode && SetIsOnEditMode((previusState) => !previusState)
            }}
          />
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Grid container alignItems={'center'}>
          <BasicInfo
            isLoading={IsFetching}
            gridSize={6}
            titleVariant="h4"
            title={
              user?.documentType === 'Nit'
                ? 'Nombre de empresa'
                : 'Representante legal'
            }
            descriptionVariant="description"
            description="Porfavor Utilice el mismo nombre que figura en su documentación oficial"
          />
          <Grid item xs={6}>
            {IsFetching
              ? (
              <Skeleton animation="wave" />
                )
              : !isOnEditMode
                  ? (
              <Typography variant="body3">
                {user?.documentType === 'Nit'
                  ? user?.enterpriseName
                  : user?.enterpriseLegalName}
              </Typography>
                    )
                  : (
              <Grid container>
                <FormGroupComponent
                  gridSize={12}
                  field={{
                    fieldName:
                      user?.documentType === 'Nit'
                        ? 'enterpriseName'
                        : 'enterpriseLegalName',
                    fieldPlaceholder:
                      user?.documentType === 'Nit'
                        ? 'Nombre de empresa'
                        : 'Representante legal',
                    defaultValue:
                      user?.documentType === 'Nit'
                        ? user?.enterpriseName
                        : user?.enterpriseLegalName
                  }}
                  errors={errors}
                  register={register}
                />
              </Grid>
                    )}
          </Grid>
        </Grid>
        <Grid container alignItems={'center'} mt={2}>
          <BasicInfo
            isLoading={IsFetching}
            gridSize={6}
            titleVariant="h4"
            title="Nombre de Marca"
            descriptionVariant="description"
            description="Porfavor Utilice el mismo nombre que figura en su documentación oficial"
          />
          <Grid item xs={6}>
            {IsFetching
              ? (
              <Skeleton animation="wave" />
                )
              : !isOnEditMode
                  ? (
              <Typography variant="body3">
                {!user?.brandName
                  ? (
                  <Button
                    variant="text"
                    onClick={() => {
                      SetIsOnEditMode((currentEditMode) => !currentEditMode)
                    }}
                    type={'button'}
                  >
                    Agregar
                  </Button>
                    )
                  : (
                      user?.brandName
                    )}
              </Typography>
                    )
                  : (
              <Grid container>
                <FormGroupComponent
                  gridSize={12}
                  field={{
                    fieldName: 'brandName',
                    fieldPlaceholder: 'Nombre de la marca',
                    defaultValue:
                      user?.documentType === 'Nit'
                        ? user?.brandName
                        : user?.enterpriseName
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
        <Grid container>
          <BasicInfo
            isLoading={IsFetching}
            gridSize={6}
            titleVariant="h4"
            title="Tipo de documento"
            descriptionVariant="description"
            description="Su tipo y numero de documento no estan habilitados para ser cambiados."
          />
          <Grid item xs={6} sx={{ paddingTop: '0 !important' }}>
            {IsFetching
              ? (
              <Skeleton animation="wave" />
                )
              : (
              <>
                <Typography variant="body2">{user?.documentType}</Typography>
                <Typography variant="body2">{user?.document}</Typography>
              </>
                )}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <BasicInfo
            isLoading={IsFetching}
            gridSize={6}
            titleVariant="h4"
            title="Información de paquetes"
            descriptionVariant="description"
            description={DETAILS.description}
          />
          <Grid item xs={6}>
            <Grid item xs={12}>
              {IsFetching && <Skeleton animation="wave" />}
              {!IsFetching && (
                <Stack flexDirection="column" spacing={2}>
                  <Typography variant="body1">
                    <b>{DETAILS.questionNational}</b>
                  </Typography>
                  <Typography variant="body2">
                    {user?.nationalShipmentsEstimated}
                  </Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} mt={4}>
              {IsFetching && <Skeleton animation="wave" />}
              {!IsFetching && (
                <Stack flexDirection="column" spacing={2}>
                  <Typography variant="body1">
                    <b>{DETAILS.questionInternational}</b>
                  </Typography>
                  <Typography variant="body2">
                    {user?.internationalShipmentsEstimated}
                  </Typography>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <BasicInfo
            isLoading={IsFetching}
            gridSize={6}
            titleVariant="h4"
            title="Información de la empresa"
            descriptionVariant="description"
            description={INFO.description}
          />
          <Grid item xs={6}>
            <Grid item xs={12}>
              {IsFetching && <Skeleton animation="wave" />}
              {!IsFetching && (
                <Stack flexDirection="column" spacing={2}>
                  <Typography variant="body1">
                    <b>{INFO.questionIndustry}</b>
                  </Typography>
                  {!isOnEditMode
                    ? (
                    <Typography variant="body3">
                      {user?.industryTarget}
                    </Typography>
                      )
                    : (
                    <>
                      <FormControl>
                        <InputLabel id="industryTarget-label">
                          Industria
                        </InputLabel>
                        <Select
                          label="Industria"
                          labelId="industryTarget-label"
                          defaultValue={user?.industryTarget ?? ''}
                          size="small"
                          {...register('industryTarget')}
                        >
                          {INDUSTRY_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                      )}
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} mt={4}>
              {IsFetching && <Skeleton animation="wave" />}
              {!IsFetching && (
                <Stack flexDirection="column" spacing={2}>
                  <Typography variant="body1">
                    <b>{INFO.questionEmployees}</b>
                  </Typography>
                  {!isOnEditMode
                    ? (
                    <Typography variant="body3">
                      {user?.employeesNumber}
                    </Typography>
                      )
                    : (
                    <FormControl>
                      <InputLabel id="employeesNumber-label">
                        Empleados
                      </InputLabel>
                      <Select
                        label="Empleados"
                        labelId="employeesNumber-label"
                        defaultValue={user?.employeesNumber ?? ''}
                        size="small"
                        {...register('employeesNumber')}
                      >
                        {EMPOLOYEE_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                      )}
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Grid>
    </Grid>
  )
}

export default BusinessInfo
