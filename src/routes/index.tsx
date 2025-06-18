import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes.const'
import { PrivateRoutes } from '@hooks/privateRoutes.hook'

const Orders = lazy(async () => await import('@pages/Orders/Orders'))
const Payments = lazy(async () => await import('@pages/Payments/Payments'))
const Account = lazy(async () => await import('@pages/Account/Account'))
const Summary = lazy(async () => await import('@pages/Summary/Summary'))

const Login = lazy(async () => await import('@pages/Login/Login'))

export const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '*',
        element: <>NOT FOUND</>
      },
      {
        path: PRIVATE_ROUTES.PAYMENTS,
        element: <Payments />
      },
      {
        path: PRIVATE_ROUTES.PROFILE,
        element: <Account />
      },
      {
        path: PRIVATE_ROUTES.ORDERS,
        element: <Orders />
      },
      {
        path: PRIVATE_ROUTES.SUMMARY,
        element: <Summary />
      }
    ]
  },
  {
    path: PUBLIC_ROUTES.LOGIN,
    element: <Login />
  }
])
