import { type Components } from '@mui/material'
import palette from '../palette'
import typography from '../typography'

export const MuiTableContainer: Components['MuiTableContainer'] = {
  styleOverrides: {
    root: {
      position: 'relative'
    }
  }
}

export const MuiTableRow: Components['MuiTableRow'] = {
  styleOverrides: {
    root: {
      '&.Mui-selected': {
        backgroundColor: palette('light').action.selected,
        '&:hover': {
          backgroundColor: palette('light').action.hover
        }
      }
    }
  }
}

export const MuiTableCell: Components['MuiTableCell'] = {
  styleOverrides: {
    root: {
      padding: '6px',
      '&.MuiTableCell-head': {
        padding: '6px'
      }
    },
    head: {
      color: palette('light').text.secondary,
      backgroundColor: palette('light').background.neutral
    },
    stickyHeader: {
      backgroundColor: palette('light').background.paper,
      backgroundImage: 'linear-gradient(to bottom, #F9FAFB 0%, #F9FAFB 100%)'
    },
    paddingCheckbox: {
      paddingLeft: 1
    }
  }
}

export const MuiTablePagination: Components['MuiTablePagination'] = {
  defaultProps: {
    backIconButtonProps: {
      size: 'small'
    },
    nextIconButtonProps: {
      size: 'small'
    },
    SelectProps: {
      MenuProps: {
        MenuListProps: {
          sx: {
            '& .MuiMenuItem-root': {
              typography: typography.body2
            }
          }
        }
      }
    }
  },

  styleOverrides: {
    root: {
      padding: '10%'
    },
    toolbar: {
      height: 64
    },
    actions: {
      marginRight: 1
    },
    select: {
      '&:focus': {
        borderRadius: '5px'
      }
    }
  }
}
