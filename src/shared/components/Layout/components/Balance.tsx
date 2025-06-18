import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { currentFormat } from '@utils/convert'
type BalanceProps = { balance: number | undefined }

export const Balance: React.FC<BalanceProps> = ({ balance }: BalanceProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isPaymentsPage = location.pathname === '/payments'

  const handleClick = (): void => {
    if (!isPaymentsPage) { navigate('/payments'); return }
    if (history.length > 1) {
      navigate(-1)
    } else {
      navigate('/orders')
    }
  }

  const iconStyles = {
    color: isPaymentsPage ? 'common.white' : 'common.black',
    fontSize: '20px'
  }

  return (
    <Box
      sx={{
        paddingX: '15px',
        paddingY: '10px',
        border: '1px solid',
        borderColor: 'grey.100',
        backgroundColor: isPaymentsPage ? 'common.black' : 'common.white',
        color: isPaymentsPage ? 'common.white' : 'common.black',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s'
      }}
      onClick={handleClick}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction="column" textAlign={'start'}>
          <Typography
            variant="body2"
            color={isPaymentsPage ? 'common.white' : 'grey.400'}
            fontWeight="600"
            fontSize="12px"
            lineHeight={1}
            marginBottom={1}
          >
            Saldo disponible:
          </Typography>
          <Typography
            variant="h3"
            color={isPaymentsPage ? 'common.white' : 'common.black'}
            fontWeight={700}
            lineHeight={1}
          >
            {currentFormat(balance ?? 0)}
          </Typography>
        </Stack>
        <Stack>
          {isPaymentsPage
            ? (
            <RemoveIcon
              sx={iconStyles}
            />
              )
            : (
            <AddIcon
              sx={iconStyles}
            />
              )}
        </Stack>
      </Stack>
    </Box>
  )
}
