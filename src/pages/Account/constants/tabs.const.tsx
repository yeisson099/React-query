import React from 'react'
import { type TabInfo } from '@sharedComponents/Dynamic-tabs/DynamicTabs.types'
import { BusinessInfo, Password, PersonalInfo } from '../components'
import { type User } from '@models/user.type'
import { Wallet } from '../components/Wallet/Wallet'

export const ACCOUNT_TABS = (user: User, isLoadingFetch: boolean): TabInfo[] => [
  {
    label: 'Perfil',
    content: <PersonalInfo user={user} isLoadingFetch={isLoadingFetch} />
  },
  {
    label: 'Mi Billetera',
    content: <Wallet />
  },
  {
    label: 'Información de la empresa',
    content: <BusinessInfo user={user} isLoadingFetch={isLoadingFetch} />
  },
  {
    label: 'Contraseña',
    content: <Password user={user} isLoadingFetch={isLoadingFetch} />
  }
]
