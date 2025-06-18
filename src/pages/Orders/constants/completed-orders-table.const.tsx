import React, { useMemo } from 'react'
import { type TableHeader } from '@sharedComponents/Table/Table.types'
import {
  OrderInfo,
  Consignee,
  CarrierInfo,
  ContactInfo,
  OrderTag,
  Tracking,
  PickupButton
} from '@pages/Orders/components'
import { type Order } from '@models/orders.type'

export const useHeaders = (): TableHeader[] => {
  return useMemo(
    () => [
      {
        id: 'invoice_number',
        renderComponent: (order: Order) => <OrderInfo order={order} />,
        label: 'Orden',
        width: '12%'
      },
      {
        id: 'client_name',
        renderComponent: (order: Order) => <Consignee order={order} />,
        label: 'Destino',
        width: '25%'
      },
      {
        id: 'contact_info',
        renderComponent: (order: Order) => <ContactInfo order={order} />,
        label: 'Contact Info'
      },
      {
        id: 'shipments',
        renderComponent: (order: Order) => <CarrierInfo order={order} />,
        label: 'Servicio',
        width: '15%'
      },
      {
        id: 'pickup',
        renderComponent: (order: Order) => <PickupButton order={order} />,
        label: 'Recolección'
      },
      {
        id: 'tracking',
        renderComponent: (order: Order) => <Tracking order={order} />,
        label: 'Guia'
      },
      {
        id: 'tag',
        renderComponent: (order: Order) => <OrderTag order={order} />,
        label: 'Etiqueta',
        align: 'center'
      }
    ],
    []
  )
}
