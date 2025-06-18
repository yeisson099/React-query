import {
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import React, { useMemo } from 'react'
const options = 10

type Props = {
  size: string
  onChange: (e: any, value: any) => void
}

export const PeerPage = ({ size, onChange }: Props) => {
  const menuOptions = useMemo(() => {
    const newArray = Array.from(Array(options).keys())
    return newArray.map((option, index) => (
      <MenuItem key={option} value={(index + 1) * 5}>
        {(index + 1) * 5}
      </MenuItem>
    ))
  }, [])
  return (
    <Stack
      flexDirection="row"
      gap={1}
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Filas por Pagina</Typography>
      <Select size="small" inputProps={{ style: { border: 'none' } }} sx={{
        '& > fieldset': {
          border: 'none !important'
        }
      }} value={size} onChange={onChange}>
        {menuOptions}
      </Select>
    </Stack>
  )
}
