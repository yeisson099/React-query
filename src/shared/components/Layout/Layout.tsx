import React, { useState } from 'react'
import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
  ThemeProvider
} from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Header } from './components/headers/Header'
import { SideBar } from './components/SideBar'
import { useUserQuery } from '@hooks/useUserData.hook'
import { type SideBarProps } from './types/header.type'
import CssBaseline from '@mui/material/CssBaseline'
import { PageTitle } from '..'

const drawerWidth = 216
interface MainLayoutProps {
  children: React.ReactNode
  PageName?: string | null
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  background: theme.palette.grey[0]
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.grey[0],
  width: `calc(${theme.spacing(1)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(1)} + 1px)`
  }
})

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open = true }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.grey[0],
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  PageName = null
}: MainLayoutProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [headerDimension, setHeaderDimension] = useState<SideBarProps>(null)
  const { data: userData } = useUserQuery()

  const toggleDrawerOpen = (): void => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleSubHeaderDimensions = ({
    width,
    height
  }: {
    width: number
    height: number
  }): void => {
    setHeaderDimension({ width, height })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <CustomDrawer
          variant="permanent"
          open={open}
          sx={{
            borderColor: 'rgba(63, 81, 181, 0.08)',
            backgroundColor: 'grey.0'
          }}
        >
          {userData?.isActive && <SideBar headerDimension={headerDimension} />}
        </CustomDrawer>
        <Box component="main" sx={{ flexGrow: 1, padding: 0 }}>
          {userData?.isActive && (
            <Header
              userData={userData}
              onDimensionsSetted={handleSubHeaderDimensions}
            />
          )}
          <Box sx={{ position: 'relative', flexGrow: 1 }}>
            <IconButton
              onClick={toggleDrawerOpen}
              sx={{
                display: { md: 'none' },
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                zIndex: 10000
              }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            {PageName && <PageTitle title={PageName} />}
            {userData?.isActive
              ? (
                  children
                )
              : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'inherit',
                  width: 'inherit'
                }}
              >
                <h3>Cuenta deshabilitada:</h3>
                <p>{`${userData?.firstName ?? ''} ${
                  userData?.lastName ?? ''
                } tu usuario ha sido desactivada. Si requiere de ayuda por favor pongase en contacto con soporte.`}</p>
              </Box>
                )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
