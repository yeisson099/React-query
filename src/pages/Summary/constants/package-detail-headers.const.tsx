import React from 'react'
import { Typography } from '@mui/material'
import { type TableHeader } from '@sharedComponents/Table/Table.types'
import { type IPackage } from '@models/package.type'
import { type Order } from '@models/orders.type'
import { currentFormat } from '@utils/convert'

export const PACKAGE_DESC = (): TableHeader[] => [
  {
    id: 'package_desc',
    prop: 'contents',
    label: 'Descripción',
    width: '33%'
  },
  {
    id: 'value',
    renderComponent: (order: Order) => (
      <Typography>{currentFormat(order?.declared_value)}</Typography>
    ),
    label: 'Valor Declarado',
    width: '33%'
  },
  {
    id: 'shipper',
    renderComponent: (order: Order) => (
      <Typography>{order?.export_declaration?.shipment_purpose}</Typography>
    ),
    label: 'Razon del envio',
    width: '33%'
  }
]

export const ITEM_DESC = (): TableHeader[] => [
  {
    id: 'package',
    prop: 'piece_contents',
    label: 'Paquete',
    width: '33%'
  },
  {
    id: 'dimensions',
    renderComponent: (detail: IPackage) => (
      <Typography>
        {`${detail?.weight}cm x ${detail?.height}cm x ${detail?.depth}cm`}
      </Typography>
    ),
    label: 'Dimensiones',
    width: '33%'
  },
  {
    id: 'weight',
    prop: 'payable_weight',
    label: 'Peso',
    width: '33%'
  }
]
