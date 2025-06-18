import React from 'react'
import { Grid, Typography } from '@mui/material'
import { type Order } from '@models/orders.type'

export const ContactInfo: React.FC<{ order: Order }> = ({
  order
}) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="caption">
          {order.consignee?.email?.toUpperCase() ?? ''}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="caption">
          {order.consignee?.phone_number?.toUpperCase() ?? ''}
        </Typography>
      </Grid>
    </Grid>
  )
}
