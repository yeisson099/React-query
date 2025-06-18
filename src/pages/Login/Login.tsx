import React from 'react'
import {
  Card,
  CardContent,
  Stack
} from '@mui/material'
import { LoginForm } from './components/Login-form'

export const Login: React.FC = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      height={'100vh'}
      style={{ background: '#F7F7FF' }}
    >
      <Card sx={{ minWidth: 500, maxWidth: 500 }}>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Stack>
  )
}

export default Login
