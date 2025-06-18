import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Link, Grid } from '@mui/material'
import {
  shipalLogo5,
  coordinadoraLogo,
  dhlLogo,
  fedexLogo
} from '@assets/images'
import { currentFormat } from '@utils/convert'
import { LinkAction } from '@sharedComponents/Link-action'
import { type Order } from '@models/orders.type'

export const CarrierInfo: React.FC<{ order: Order, canModify?: boolean }> = ({
  order,
  canModify = false
}) => {
  const navigate = useNavigate()

  const carrierPlaceHolderStyle: React.CSSProperties = useMemo(
    () => ({
      maxWidth: '50px',
      width: '100%'
    }),
    []
  )

  const handleSelectedOrder = useCallback(
    (isNational: boolean, id: string) => {
      navigate(`/shipping/${isNational ? 'international' : 'national'}/${id}`)
    },
    [history]
  )

  const linkStyle: React.CSSProperties = useMemo(
    () => ({
      fontWeight: 'bold',
      cursor: 'pointer'
    }),
    []
  )

  const blueColorStyle: React.CSSProperties = useMemo(
    () => ({
      ...linkStyle,
      color: '#1890FF'
    }),
    [linkStyle]
  )

  const getCarrierLogo = (carrierLogo: string) => {
    let selectedCarrierLogo: string

    switch (carrierLogo) {
      case 'COORDINADORA':
        selectedCarrierLogo = coordinadoraLogo
        break
      case 'DHL':
        selectedCarrierLogo = dhlLogo
        break
      case 'FEDEX':
        selectedCarrierLogo = fedexLogo
        break
      default:
        selectedCarrierLogo = shipalLogo5
        break
    }

    return (
      <img src={selectedCarrierLogo} style={carrierPlaceHolderStyle} alt="" />
    )
  }

  return order?.due_diligence?.carrier_selected &&
    Boolean(order.total_payment)
    ? (
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {getCarrierLogo(order.shipal.selected_carrier)}
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ...(!canModify && {
            pl: 1,
            justifyContent: 'space-between'
          })
        }}
      >
        <Typography variant="captionTable" fontWeight="bold">
          {order.shipal.selected_carrier.toUpperCase()}
        </Typography>
        <Typography variant="captionTable">
          {currentFormat(order.total_payment)}
        </Typography>
        {canModify && (
          <Typography variant="captionTable">
            <Link
              sx={blueColorStyle}
              onClick={() => {
                handleSelectedOrder(
                  order.is_international_shippment,
                  order._id
                )
              }}
            >
              Cambiar
            </Link>
          </Typography>
        )}
      </Grid>
    </Grid>
      )
    : (
    <LinkAction
      text="CONFIGURAR ENVÍO"
      action={() => {
        handleSelectedOrder(order.is_international_shippment, order._id)
      }}
    />
      )
}
