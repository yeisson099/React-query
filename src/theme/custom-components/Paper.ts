import { type Components } from '@mui/material'

export const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: {
      borderColor: 'rgba(63, 81, 181, 0.08)',
      borderRight: '1px solid rgba(63, 81, 181, 0.08) !important',
      '&-MuiAccordion-root::before': {
        opacity: '0 !important',
        backgroundColor: 'red'
      }
    }
  }
}
