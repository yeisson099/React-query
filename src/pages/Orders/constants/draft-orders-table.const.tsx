import React, { useMemo } from 'react'
import { type TableHeader } from '@sharedComponents/Table/Table.types'
import { OrderInfo, Consignee, ItemResume, CarrierInfo } from '@pages/Orders/components'
import { type Order } from '@models/orders.type'
import { PaymentButton } from '@sharedComponents/Payment-button/Payment-button'

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
        id: 'item',
        renderComponent: (order: Order) => <ItemResume order={order} />,
        label: 'Articulos'
      },
      {
        id: 'shipments',
        renderComponent: (order: Order) => (
          <CarrierInfo order={order} canModify />
        ),
        label: 'Servicio'
      },
      {
        id: 'track_guide',
        renderComponent: (props) => <PaymentButton order={props} />,
        label: 'Crear guía'
      }
    ],
    []
  )
}
