import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import PickupCard from './components/Pickup-card'
import { PICKUP_TYPE, type PickupProps } from './types/pickup-form.type'
import { pickupSchema } from './constants/pickup-form.yup'
import { useCreatePickup, usePickupDayQuery } from '@hooks/pickup.hook'
import { LoadingButton } from '@mui/lab'

export const PickupForm: React.FC<PickupProps> = ({ id, closeModal }) => {
  const [checkedCustom, setCheckedCustom] = useState(false)
  const [scheduleCardTypeSelected, setScheduleCardTypeSelected] =
    useState('today')

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(pickupSchema)
  })

  const { data: pickupDayData, isLoading: loadingPickupData } =
    usePickupDayQuery()

  const {
    mutate: CreatePickup,
    isPending
  } = useCreatePickup()

  const changePickupType = useCallback(() => {
    setCheckedCustom((prev) => !prev)
  }, [])

  const onSubmit: SubmitHandler<unknown> = async () => {
    const date =
     scheduleCardTypeSelected === 'today'
       ? pickupDayData?.today.date
       : pickupDayData?.next_day.date
    const type = checkedCustom
      ? PICKUP_TYPE.SELF_PICKUP
      : PICKUP_TYPE.AUTOMATIC_PICKUP
    CreatePickup({ date: date ?? '', type, orderId: id })
  }

  const canScheduleToday = useMemo(() => {
    const currentDateTime = new Date()
    const closeTodayTime = new Date(currentDateTime.setHours(12, 0, 0))
    return currentDateTime < closeTodayTime
  }, [])

  useEffect(() => {
    if (!canScheduleToday) {
      setScheduleCardTypeSelected('nextDay')
    }
  }, [canScheduleToday])

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <DialogTitle fontWeight="bold">Fecha de recolección</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox checked={checkedCustom} onChange={changePickupType} />
          }
          label="Entregar en oficina"
        />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <PickupCard
              cardType="today"
              selected={scheduleCardTypeSelected === 'today'}
              onClick={setScheduleCardTypeSelected}
              disabled={!canScheduleToday}
              loading={loadingPickupData}
              pickupDayData={pickupDayData}
              canScheduleToday={canScheduleToday}
            />
          </Grid>
          <Grid item xs={6}>
            <PickupCard
              cardType="nextDay"
              selected={scheduleCardTypeSelected === 'nextDay'}
              onClick={setScheduleCardTypeSelected}
              disabled={false}
              loading={loadingPickupData}
              pickupDayData={pickupDayData}
              canScheduleToday={canScheduleToday}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={() => {
            closeModal()
          }}
          type="button"
        >
          Cancelar
        </Button>
        <LoadingButton loading={isPending} variant="contained" type="submit">
          Enviar
        </LoadingButton>
      </DialogActions>
    </form>
  )
}
