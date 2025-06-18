import React, { useCallback } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type Order } from '@models/orders.type'
import { currentFormat } from '@utils/convert'
import { LinkAction } from '@sharedComponents/Link-action'

export const ItemResume: React.FC<{ order: Order }> = ({
  order
}) => {
  const navigate = useNavigate()
  const handleSelectedOrder = useCallback(
    (isNational: boolean, id: string) => {
      navigate(`/shipping/${isNational ? 'international' : 'national'}/${id}`)
    },
    [history]
  )
  return (
    <>
      {order.contents && order.declared_value
        ? (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              {order.contents && order.contents}
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
              {order.declared_value &&
                `${currentFormat(order.declared_value)} Total`}
            </Typography>
          </Grid>
        </Grid>
          )
        : (
        <LinkAction
          text="AGREGAR ARTICULOS"
          action={() => {
            handleSelectedOrder(order.is_international_shippment, order._id)
          }}
        />
          )}
    </>
  )
}
