import React from 'react'
import { Typography, Stack } from '@mui/material'
import { useOrderStore } from '@store/order.store'
import { FlagImage } from 'react-international-phone'
import { formatPhoneNumber } from '@utils/convert'

const DisplayInfo: React.FC<{ isShipper?: boolean }> = ({
  isShipper = false
}) => {
  const { order } = useOrderStore()

  const target = isShipper ? order?.shipper : order?.consignee

  return (
    <Stack direction="column" spacing={0.5}>
      <Typography variant="h1" fontWeight='500'>{target?.person_name}</Typography>
      <Typography variant="secondary">{target?.address_line}</Typography>
      <Typography
        variant="secondary"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <FlagImage iso2={target?.country_code.toLowerCase()} size="20px" />
        {target?.country_name}
      </Typography>
      <Typography variant="secondary">
        {formatPhoneNumber(target?.phone_number)}
      </Typography>
      <Typography variant="secondary">{target?.email}</Typography>
    </Stack>
  )
}

export default DisplayInfo
