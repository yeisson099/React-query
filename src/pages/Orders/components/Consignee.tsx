import React, { useCallback, useMemo } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type Order } from '@models/orders.type'
import { LinkAction } from '@sharedComponents/Link-action'

export const Consignee: React.FC<{ order: Order }> = ({ order }) => {
  const navigate = useNavigate()
  const handleSelectedOrder = useCallback(
    (isNational: boolean, id: string) => {
      navigate(`/shipping/${isNational ? 'international' : 'national'}/${id}`)
    },
    [history]
  )
  const imgStyles: React.CSSProperties = useMemo(
    () => ({
      width: '32px',
      objectFit: 'contain'
    }),
    []
  )
  const isComplete = order?.due_diligence?.consignee_completed
  const isInternational = order?.is_international_shippment

  return (
    <>
      {isComplete
        ? (
        <Grid container>
          <Grid item xs={2} textAlign="center" sx={{ maxHeight: '30px' }}>
            {order.consignee.country_code && (
              <img
                alt="Bandera de pais"
                style={imgStyles}
                src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${order.consignee.country_code}.svg`}
              />
            )}
          </Grid>
          <Grid item xs={10}>
            <Typography mt="5px" variant="caption" fontWeight="bold">
              {`${order?.consignee?.person_name?.toUpperCase()} ${
                order.consignee?.company_name
                  ? `(${order.consignee?.company_name.toUpperCase()})`
                  : ''
              }`}
            </Typography>
          </Grid>
          <Grid item textAlign="center" xs={2}>
            <Typography variant="caption">
              {order.consignee?.country_code}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="caption">
              {order.consignee?.city
                ? order.consignee?.city?.toUpperCase()
                : ''}
              {isInternational && (
                <>
                  {`${
                    order.consignee?.state ? `, ${order.consignee.state}` : ''
                  } ${order.consignee?.postal_code ?? ''}`}
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
          )
        : (
        <LinkAction
          text="AGREGAR DESTINO"
          action={() => {
            handleSelectedOrder(order.is_international_shippment, order._id)
          }}
        />
          )}
    </>
  )
}
