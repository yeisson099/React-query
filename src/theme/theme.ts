import { type Theme, createTheme, type ThemeOptions } from '@mui/material'
import palette from './palette'
import typography from './typography'
import { components } from './custom-components'

const themeMode = 'light'
const themeDirection = 'ltr'

const baseTheme: Theme = createTheme({
  palette: palette(themeMode),
  typography,
  direction: themeDirection
})

const themeOptions: ThemeOptions = {
  components
}

export const theme: Theme = createTheme(baseTheme, themeOptions)
