import React from 'react'
import { type TabInfo } from '@sharedComponents/Dynamic-tabs/DynamicTabs.types'
import DisplayInfo from '../components/Dispay-info'

export const SUMMARY_TABS = (): TabInfo[] => [
  {
    label: 'Destinatario',
    content: <DisplayInfo />
  },
  {
    label: 'Remitente',
    content: <DisplayInfo isShipper />
  }
]
