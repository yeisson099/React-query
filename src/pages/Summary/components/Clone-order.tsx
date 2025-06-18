import React from 'react'
import { Alert } from '@mui/material'
import { useOrderStore } from '@store/order.store'
import { useCloneOrder } from '@hooks/orders.hook'

const CloneOrder: React.FC = () => {
  const { order } = useOrderStore()

  const { mutate } = useCloneOrder()

  return (
    <Alert severity="success" onClose={() => {}}>
      Tu orden ha sido creada
    </Alert>
  )
}

export default CloneOrder
