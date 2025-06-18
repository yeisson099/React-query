import React from 'react'
import { type TabInfo } from '@sharedComponents/Dynamic-tabs/DynamicTabs.types'
import { CompletedShipments, DraftShipments } from '../views'

export const ORDERS_TABS: TabInfo[] = [
  {
    label: 'Pendientes',
    content: <DraftShipments />
  },
  {
    label: 'Realizadas',
    content: <CompletedShipments/>
  }
]
