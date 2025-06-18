import React from 'react'
import { Container, Typography } from '@mui/material'
import { type pageProps } from './Page-title.type'

export const PageTitle: React.FC<pageProps> = ({ title }: pageProps) => {
  return (
    <Container>
      <Typography variant="h4" fontWeight='bold"'>
        {title}
      </Typography>
    </Container>
  )
}
