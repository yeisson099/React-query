import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CardActions,
  Skeleton,
  Box,
  CircularProgress
} from '@mui/material'
import { type PickupCardProps } from '../types/pirckup-card.type'

const PickupCard: React.FC<PickupCardProps> = ({
  cardType,
  selected,
  onClick,
  disabled,
  loading,
  pickupDayData,
  canScheduleToday
}) => {
  const isToday = cardType === 'today'
  const pickupDate = isToday ? pickupDayData?.today : pickupDayData?.next_day
  const isDisabled = !canScheduleToday && isToday

  const cardActionAreaStyles = {
    height: '80px',
    background: isDisabled ? '#F5F5F5' : selected ? '#FCFAFF' : '',
    opacity: isDisabled ? 0.5 : 1
  }

  return (
    <Box
      sx={{
        maxWidth: 345,
        borderRadius: '5px',
        border: 2,
        borderColor: 'transparent',
        ...(selected && { borderColor: '#7E00FB' })
      }}
    >
      {loading
        ? (
        <Box
          sx={{
            width: '200px',
            height: '130px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
          )
        : (
        <Card
          sx={{
            height: '130px',
            transition: 'opacity 0.6s',
            opacity: loading ? 0 : 1
          }}
        >
          <CardActionArea
            onClick={() => !disabled && onClick(cardType)}
            sx={cardActionAreaStyles}
            disabled={isDisabled}
          >
            <CardContent sx={{ padding: 1 }}>
              <Typography variant="h3">
                {isToday ? 'Hoy' : pickupDate?.day}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {`${pickupDate?.monthAbbreviated} ${pickupDate?.date.slice(
                  -2
                )}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ height: '50px' }}>
            <Typography
              sx={{ textAlign: isToday ? 'left' : 'right', p: 0 }}
              width={'100%'}
              variant="body1"
              color="text.secondary"
            >
              {isToday
                ? 'No disponible después de las 11:59 AM'
                : 'Aprox 2pm - 5pm'}
            </Typography>
          </CardActions>
        </Card>
          )}
    </Box>
  )
}

export default PickupCard
