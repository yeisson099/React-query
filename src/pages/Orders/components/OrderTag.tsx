import React from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { type Order } from '@models/orders.type'

type OrderTagProps = {
  order: Order
  contained?: boolean
}

export const OrderTag: React.FC<OrderTagProps> = ({
  order,
  contained = false
}) => {
  const ENV = import.meta.env
  const generateLabelLink = `${
    ENV.PROD ? ENV.VITE_S3_PROD : ENV.VITE_S3_LABEL
  }${order?.label_image_id}`

  const handleButtonClick = (): void => {
    window.open(generateLabelLink, '_blank')
  }
  return (
    <Tooltip title="Haz click para descargar tu guia" placement="top">
      {!contained
        ? (
        <IconButton
          aria-label="copy"
          color="primary"
          onClick={handleButtonClick}
        >
          <FileDownloadOutlinedIcon fontSize="small" />
        </IconButton>
          )
        : (
        <Button
          sx={{
            padding: '10px 26px',
            fontWeight: 600
          }}
          size="medium"
          variant="contained"
          onClick={handleButtonClick}
          startIcon={<FileDownloadOutlinedIcon />}
        >
          Descargar
        </Button>
          )}
    </Tooltip>
  )
}
