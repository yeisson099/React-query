import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Stack, IconButton, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

const styles = {
  minWidth: 0,
  lineHeight: 1.3,
  fontSize: 12,
  borderColor: 'rgba(0,0,0,0.3)',
  '& .MuiButton-endIcon': {
    marginLeft: '8px',
    marginRight: '0px',
    fontSize: '16px !important'
  }
}

export const PaymentHeader: React.FC = () => {
  const naigate = useNavigate()

  const handleGoBack = (): void => {
    naigate(-1)
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottom: '1px solid rgba(63, 81, 181, 0.08)',
        opacity: 1,
        flexGrow: 1,
        p: 3,
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: '50px'
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="go back"
          onClick={handleGoBack}
        >
          <ArrowBack sx={{ color: 'text.60', fontSize: '20px' }} />
        </IconButton>
        <Typography variant="h4" sx={{ marginLeft: 2 }} color="text.60">
          Volver a configurar orden
        </Typography>
      </Stack>
      <Stack>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleGoBack}
          sx={styles}
        >
          Cerrar
        </Button>
      </Stack>
    </Stack>
  )
}
