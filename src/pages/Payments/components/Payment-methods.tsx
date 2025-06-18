import React, { useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { METHODS } from '../constants/payment-methos'
import { usePaymentStore } from '@store/payment.store'
import { useUserQuery } from '@hooks/useUserData.hook'
import PseIcon from '@assets/icons/PseIcon'

const styles = {
  container: (isSelected: boolean) => ({
    borderRadius: '5px',
    padding: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: isSelected ? '2px solid #7E00FB' : '2px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: isSelected ? '#f0eaff' : 'transparent',
    transition:
      'border-color 0.3s, background-color 0.3s, width 0.3s, height 0.3s',
    cursor: 'pointer',
    width: '150px',
    height: '150px',
    justifyContent: 'end',
    '&:hover': {
      borderColor: '#7E00FB',
      backgroundColor: 'rgba(126, 0, 251, 0.03)'
    }
  })
}

const PaymentMethods: React.FC = () => {
  const { selectedMethod, setSelectedMethod } = usePaymentStore()
  const { data } = useUserQuery()
  const filteredMethods = METHODS.filter((method) => data?.merchants[method.value])

  const handleSelect = (value: string): void => {
    setSelectedMethod(value)
  }

  useEffect(() => {
    if (filteredMethods.length === 1) {
      handleSelect(filteredMethods[0].value)
    }
  }, [])

  return (
    <Stack direction="row" spacing={2}>
      {filteredMethods.map(({ logo, name, value }) => (
        <Box
          key={value}
          sx={{
            ...styles.container(value === selectedMethod),
            width: selectedMethod ? '68px' : '150px',
            height: selectedMethod ? '68px' : '150px'
          }}
          onClick={() => {
            handleSelect(value)
          }}
        >
          <PseIcon />
          <Typography variant="body1" fontWeight='600' fontSize='12px' color='text.60'>
            {name}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}

export default PaymentMethods
