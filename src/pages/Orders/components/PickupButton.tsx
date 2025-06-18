import React, { useState } from 'react'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import { ORDER_STATUS, type Order } from '@models/orders.type'
import { PickupForm } from '@sharedComponents/forms/Pickup-form/Pickup-form'

type PickupButtonProps = {
  order: Order
}

export const PickupButton: React.FC<PickupButtonProps> = ({
  order
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {order.order_status === ORDER_STATUS.ACEPTED && (
        <Button
          variant="contained"
          sx={{ padding: '15px' }}
          onClick={() => {
            setOpen(true)
          }}
        >
          Programar
        </Button>
      )}

      {order.order_status === ORDER_STATUS.SCHEDULED && (
        <Stack
          direction="column"
          alignItems="start"
          width={'100%'}
          height={'100%'}
        >
          {order.pick_up_info.type === 'SELF_PICKUP'
            ? (
            <Typography>Entrega en oficina</Typography>
              )
            : (
            <>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ minHeight: '70%' }}
              >
                <Typography variant="caption" fontWeight="bold">
                  Fecha estimada:
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ minHeight: '30%' }}
              >
                <Typography variant="caption">
                  {order.pick_up_info.date}
                </Typography>
              </Stack>
            </>
              )}
        </Stack>
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <PickupForm
          id={order?._id}
          closeModal={() => {
            setOpen(false)
          }}
        />
      </Dialog>
    </>
  )
}
