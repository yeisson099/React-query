import React from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { Paragraph as ShipalParagraph } from '@sharedComponents/Paragraph'
import { useUserQuery } from '@hooks/useUserData.hook'
import { currentFormat } from '@utils/convert'
import { usePaymentStore } from '@store/payment.store'

interface GridItemProps {
  xs: number
  textAlign?: 'left' | 'center' | 'right'
  fontWeight?: string
  children?: React.ReactNode
  color?: string
}

const BalanceSummary: React.FC = () => {
  const { data: authData } = useUserQuery()
  const { amount } = usePaymentStore()

  const PaddedGridItem: React.FC<GridItemProps> = ({
    xs,
    textAlign = 'left',
    fontWeight = 'normal',
    children,
    color
  }) => {
    return (
      <Grid item xs={xs} sx={{ paddingTop: '5px !important' }}>
        <Typography
          variant="body1"
          textAlign={textAlign}
          fontWeight={fontWeight}
          color={color}
        >
          {children}
        </Typography>
      </Grid>
    )
  }

  const totalAmount = (authData?.balanceAvailable ?? 0) + (amount ?? 0)

  return (
    <ShipalParagraph title="Resumen de tu abono" titleVariant="h2">
      <Box paddingTop={3}>
        <Grid container spacing={3}>
          <PaddedGridItem xs={6} color="rgb(109, 116, 130)">
            Saldo actual
          </PaddedGridItem>
          <PaddedGridItem xs={6} textAlign="right">
            {currentFormat(authData?.balanceAvailable ?? 0)}
          </PaddedGridItem>
          <PaddedGridItem xs={6} color="rgb(109, 116, 130)">
            Saldo de abono
          </PaddedGridItem>
          <PaddedGridItem xs={6} textAlign="right" fontWeight="bold">
            {currentFormat(amount ?? 0)}
          </PaddedGridItem>
          <Grid item xs={12} sx={{ paddingTop: '0 !important' }}>
            <Divider sx={{ mt: 2, mb: 2, width: '100%' }} />
          </Grid>
          <PaddedGridItem xs={6} color="rgb(109, 116, 130)">
            Saldo Total
          </PaddedGridItem>
          <PaddedGridItem xs={6} textAlign="right" fontWeight="bold">
            {currentFormat(totalAmount)}
          </PaddedGridItem>
        </Grid>
      </Box>
    </ShipalParagraph>
  )
}

export default BalanceSummary
