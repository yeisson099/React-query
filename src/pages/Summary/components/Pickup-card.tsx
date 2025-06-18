import React, { useState } from 'react'
import StatusCard from './Status-card'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import { Dialog } from '@mui/material'
import { PickupForm } from '@sharedComponents/forms/Pickup-form/Pickup-form'
import { useOrderStore } from '@store/order.store'

const PickupCard: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { order } = useOrderStore()
  if (!order) return
  return (
    <>
      <StatusCard
        title="Programar Recoleccion"
        desc="Programa la recogida de tu paquete y un mensajero ira hasta tu direccion!"
        buttonLabel="Programar"
        Icon={EventOutlinedIcon}
        onClick={() => {
          setOpen(true)
        }}
      />
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

export default PickupCard
