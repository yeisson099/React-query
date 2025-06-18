import { type Components } from '@mui/material'
import palette from '../palette'

export const MuiTab: Components['MuiTab'] = {
  styleOverrides: {
    root: {
      '& .MuiTabs-indicator': {
        height: '0px'
      },
      '& .Mui-selected': {
        backgroundColor: palette('light').secondary.light,
        color: palette('light').secondary.contrastText,
        borderRadius: '5px'
      },
      '& .MuiButtonBase-root': {
        border: '0rem',
        textTransform: 'capitalize',
        fontWeight: 600
      }
    }
  }
}

export const MuiTabs: Components['MuiTabs'] = {
  styleOverrides: {
    root: {
      '& .MuiButtonBase-root': {
        border: '0rem',
        textTransform: 'capitalize',
        fontWeight: 600,
        fontSize: '14px',
        color: palette('light').grey[800],
        minHeight: '40px'
      },
      '& .MuiTabs-indicator': {
        height: '0px'
      },
      '& .Mui-selected': {
        backgroundColor: 'rgba(249,249,249)',
        color: palette('light').primary.main,
        borderRadius: '5px'
      }
    }
  }
}
