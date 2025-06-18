import { type Components } from '@mui/material'

export const MuiAccordion: Components['MuiAccordion'] = {
  styleOverrides: {
    root: {
      '&::before': {
        opacity: '0 !important',
        backgroundColor: 'red'
      }
    }
  }
}
