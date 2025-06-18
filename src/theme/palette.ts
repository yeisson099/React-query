import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string
  }
  interface SimplePaletteColorOptions {
    lighter: string
    darker: string
  }
  interface PaletteColor {
    lighter: string
    darker: string
  }
}

// SETUP COLORS

const GREY = {
  0: '#F9FAFB',
  100: 'rgba(0,0,0,0.12)',
  200: '#F4F6F8',
  300: 'rgba(0,0,0,0.3)',
  400: 'rgba(0, 0, 0, 0.38)',
  500: '#919EAB',
  600: '#5a5a5aa6',
  700: '#454F5B',
  800: '#5A5A5A',
  900: '#161C24'
}

const PRIMARY = {
  lighter: '#f7f1ff',
  light: '#a64dff',
  main: '#7E00FB',
  dark: '#5a00b3',
  darker: '#400080',
  contrastText: '#fff',
  contrastPurple: '#7E00FB'
}

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
}

const INFO = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#fff'
}

const SUCCESS = {
  lighter: '#D8FBDE',
  light: '#86E8AB',
  main: '#36B37E',
  dark: '#1B806A',
  darker: '#0A5554',
  contrastText: '#fff'
}

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: GREY[800]
}

const ERROR = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#fff'
}

const COMMON = {
  common: { black: '#000', white: '#fff', border: 'rgba(63, 81, 181, 0.08)' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  done: SUCCESS,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
}

export default function palette (themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: 'rgba(0,0,0,0.8)',
      disabled: 'rgba(0,0,0,0.3)',
      secondary: '#939baa',
      60: 'rgba(0,0,0,0.6)'
    },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600]
    }
  } as const

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600]
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: '#F9FAFB'
    },
    action: {
      ...COMMON.action,
      active: GREY[500]
    }
  } as const

  return themeMode === 'light' ? light : dark
}
