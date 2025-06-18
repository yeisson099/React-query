import { type Components } from '@mui/material'

// ----------------------------------------------------------------------

export const MuiListItemIcon: Components['MuiListItemIcon'] = {
  styleOverrides: {
    root: {
      color: 'inherit',
      minWidth: 'auto',
      fontSize: '12px',
      marginRight: '5px'
    }
  }
}

export const MuiListItemAvatar: Components['MuiListItemAvatar'] = {
  styleOverrides: {
    root: {
      minWidth: 'auto',
      marginRight: 2
    }
  }
}

export const MuiListItemText: Components['MuiListItemText'] = {
  styleOverrides: {
    root: {},
    multiline: {
      marginTop: 0,
      marginBottom: 0
    },
    primary: {
      marginTop: 1,
      marginBottom: 1,
      fontSize: '12px',
      fontWeight: '700'
    }
  }
}
