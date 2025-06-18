import {
  CalculatorIcon,
  DirectoryIcon,
  ShipmentIcon,
  UserIcon
} from '@assets/icons'
import { type SvgIconProps } from '@mui/material'

const { VITE_AWS_BRANCH } = import.meta.env
const externalAppUrl = VITE_AWS_BRANCH === 'prod' ? 'https://app.shipal.co' : 'https://dev.shipal.co'

export interface MenuItem {
  name: string
  icon?: React.FC<SvgIconProps>
  children?: MenuItem[]
  path?: string
  isOpen?: boolean
}

export const menuItemsMock: MenuItem[] = [
  {
    name: 'Envíos',
    icon: ShipmentIcon,
    isOpen: true,
    // path: '/orders',
    children: [
      {
        name: 'Pendientes',
        path: '/orders?tab=pending'
      },
      {
        name: 'Realizados',
        path: '/orders?tab=completed'
      }
    ]
  },
  {
    name: 'Directorio',
    path: `${externalAppUrl}/address-book`,
    icon: DirectoryIcon
  },
  {
    name: 'Cuenta',
    path: '/account',
    icon: UserIcon
  },
  {
    name: 'Cotizar envío',
    path: `${externalAppUrl}/quoter`,
    icon: CalculatorIcon
  }
]
