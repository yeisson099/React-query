import React, { useState } from 'react'
import {
  Button,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { type Order } from '@models/orders.type'
import { handleTrackingUrl } from '@utils/tracking'

type TrackingProps = {
  order: Order
}

export const Tracking: React.FC<TrackingProps> = ({ order }) => {
  const [open, setOpen] = useState(false)
  const handleClipBoard = async (): Promise<void> => {
    setOpen(true)
    await navigator.clipboard.writeText(order.airway_bill_number)
  }
  const handleButtonClick = (): void => {
    window.open(
      handleTrackingUrl(
        order.airway_bill_number,
        order?.shipal?.selected_carrier
      ),
      '_blank'
    )
  }
  return (
    <>
      {order.airway_bill_number && order?.shipal?.selected_carrier && (
        <>
          <Stack
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Tooltip title="Haz click para rastrear tu guia." placement="top">
              <Button variant="text" onClick={handleButtonClick}>
                <Typography variant="caption" fontWeight="bold">
                  {order.airway_bill_number}
                </Typography>
              </Button>
            </Tooltip>
            <Tooltip
              title="Haz click para copiar el numero de tu guia."
              placement="top"
            >
              <IconButton
                aria-label="copy"
                color="default"
                onClick={handleClipBoard}
              >
                <ContentPasteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Snackbar
            open={open}
            onClose={() => { setOpen(false) }}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message="Numero de guia copiado."
          />
        </>
      )}
    </>
  )
}
