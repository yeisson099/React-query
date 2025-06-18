import React, { type FC } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Stack,
  type SvgIconProps
} from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material'

interface StatusCardProps {
  title: string
  desc: string
  buttonLabel?: string
  onClick?: () => void
  buttonChild?: React.ReactNode
  Icon?: FC<SvgIconProps>
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  desc,
  buttonLabel,
  onClick,
  buttonChild,
  Icon
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 276,
        height: 218,
        background: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 1
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          textAlign: 'justify',
          height: '60%'
        }}
      >
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1}>
            {Icon && (
              <Icon
                fontSize='medium'
              />
            )}
            <Typography variant="subtitle1" component="div">
              {title}
            </Typography>
          </Stack>
          <Typography variant="body1">{desc}</Typography>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'justify'
        }}
      >
        {!buttonChild
          ? (
          <Button
            variant="contained"
            sx={{
              padding: '10px 26px',
              fontWeight: 600
            }}
            size="medium"
            startIcon={<DownloadIcon />}
            onClick={onClick}
          >
            {buttonLabel}
          </Button>
            )
          : (
              buttonChild
            )}
      </CardActions>
    </Card>
  )
}

export default StatusCard
