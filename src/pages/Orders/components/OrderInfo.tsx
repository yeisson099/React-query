import { Typography, Link, Grid } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { type Order, ORDER_STATUS, ORDER_TYPE } from '@models/orders.type'
import { shipalLogo5, shopify } from '@assets/images'
import { formatDate } from '@utils/convert'

export const OrderInfo: React.FC<{ order: Order }> = ({ order }) => {
  const navigate = useNavigate()

  const imageStyles: React.CSSProperties = useMemo(
    () => ({
      maxWidth: '24px',
      objectFit: 'contain'
    }),
    []
  )

  const handleSelectedOrder = useCallback(
    (isNational: boolean, id: string) => {
      navigate(`/shipping/${isNational ? 'international' : 'national'}/${id}`)
    },
    [history]
  )

  const linkStyle: React.CSSProperties = {
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#7E00FB'
  }

  return (
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img
          alt="logo del origen de la orden"
          style={imageStyles}
          src={order?.order_type === ORDER_TYPE.SHOPIFY ? shopify : shipalLogo5}
        />
      </Grid>
      <Grid item xs={8}>
        <Grid container paddingLeft={1}>
          <Grid item xs={12}>
            {order.order_status === ORDER_STATUS.ACEPTED ||
            order.order_status === ORDER_STATUS.SCHEDULED
              ? (
              <Link
                component={RouterLink}
                to={`/order/resumen/${order._id}`}
                variant="caption"
                fontWeight="bold"
                sx={linkStyle}
              >
                #{order?.invoice_number ?? 0}
              </Link>
                )
              : (
              <Link
                onClick={() => {
                  handleSelectedOrder(
                    order.is_international_shippment,
                    order._id
                  )
                }}
                variant="caption"
                fontWeight="bold"
                sx={linkStyle}
              >
                #{order?.invoice_number ?? 0}
              </Link>
                )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              {formatDate(order?.createdAt ?? '')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
