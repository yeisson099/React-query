import React, { useState } from 'react'
import { ORDER_TYPE } from '@models/orders.type'
import { ShipalIcon, ShopifyIcon } from '@assets/icons'
import {
  Alert,
  Box,
  Divider,
  Grid, IconButton, Stack, Typography
} from '@mui/material'
import Image from '@sharedComponents/Image'
import { useOrderStore } from '@store/order.store'
import { currentFormat, formatDate } from '@utils/convert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useCloneOrder } from '@hooks/orders.hook'
import CheckIcon from '@mui/icons-material/Check'
import { shopify } from '@assets/images'

export const OrderDetail: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false)

  const { order } = useOrderStore()

  const { mutateAsync, isPending } = useCloneOrder()

  const providerLogo = {
    [ORDER_TYPE.SHIPAL]: ShipalIcon,
    [ORDER_TYPE.SHOPIFY]: ShopifyIcon
  }

  const cloneOrder = async () => {
    await mutateAsync(order?._id)
    setShowAlert(true)
  }

  return (
    <Box sx={{ flexGrow: 0.8 }}>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" alignmentBaseline="central" />}
          severity="success"
          onClose={() => {
            setShowAlert(false)
          }}
          sx={{
            marginBottom: 1,
            transition: 'opacity 0.5s',
            opacity: showAlert ? 1 : 0
          }}
        >
          Tu orden ha sido creada
        </Alert>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="start"
            spacing={2}
          >
            <Image
              height={62}
              src={providerLogo[order?.order_type]}
              width={62}
            />
            <Typography variant="h2">Orden</Typography>
            <Typography fontSize="20px">#{order?.invoice_number}</Typography>
            <IconButton
              disabled={isPending}
              aria-label="duplicate"
              onClick={cloneOrder}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="secondary">Paid on</Typography>
              <Typography variant="body3">
                {formatDate(order?.shipment_date)}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="secondary">Total Cost</Typography>
              <Typography variant="body3">
                {currentFormat(order?.total_payment)}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="secondary">Seguro</Typography>
              <Typography variant="body3">
                {order?.shipal.insurance ? 'Si' : 'No'}
              </Typography>
            </Stack>
            {order?.order_type === ORDER_TYPE.SHOPIFY && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image height={20} src={shopify} width={20} />
                <Typography variant="secondary">Shopify Orden</Typography>
                <Typography variant="body3">
                  #{order?.invoice_number}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
