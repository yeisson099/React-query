import { type AlertColor } from '@mui/material'

export type OrderActionsAlertDto = {
  alertMessage?: JSX.Element | Element | HTMLElement | string | undefined
  alertType?: AlertColor
  showAlert: boolean
}
