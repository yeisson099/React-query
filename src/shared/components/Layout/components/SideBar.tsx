import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Divider,
  Alert,
  List,
  ListItem,
  Button,
  Fab,
  Typography
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { shipalLogo } from '@assets/logos'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LogoutIcon from '@mui/icons-material/Logout'
import { useUserQuery } from '@hooks/useUserData.hook'
import { type SideBarProps } from '../types/header.type'
import { Balance } from './Balance'
import { MainMenu } from './SideMenu'

export const SideBar: React.FC<{ headerDimension: SideBarProps }> = ({
  headerDimension
}) => {
  const REACT_APP_SUPPORT_PHONE_NUMBER = 1111
  const { data: authData } = useUserQuery()

  const handleLogout = (): void => {
    console.log('logout')
  }

  if (!authData) {
    handleLogout()
  }

  return (
    <>
      <Box key={'firstBox'} sx={{ backgroundColor: 'grey.0' }}>
        <Box
          padding={1}
          sx={{
            maxWidth: headerDimension?.width ?? 0,
            maxHeight: headerDimension?.height ?? 0,
            paddingTop: '10px'
          }}
        >
          <Link
            to="/orders/"
            key={'logoSipal'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img src={shipalLogo} alt="logo-shipal" height="56" width="80%" />
          </Link>
        </Box>
        <Box padding="16px" marginTop={1} paddingBottom={1}>
          <Balance balance={authData?.balanceAvailable} />
        </Box>
      </Box>

      {authData?.isActive && <MainMenu />}

      <Box
        key={'secondBox'}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'grey.0'
        }}
      >
        <List key={'AfterlinksList'} sx={{ backgroundColor: 'grey.0' }}>
          {!authData?.isActive && (
            <ListItem key={'unactiveAccountKey'}>
              <Alert
                sx={{ background: 'red', color: '#fff' }}
                variant="standard"
                icon={<InfoOutlinedIcon fontSize="inherit" />}
                color="error"
              >
                Cuenta inactiva
              </Alert>
            </ListItem>
          )}
          <ListItem key={'supportButton'} sx={{ justifyContent: 'center' }}>
            <Fab
              sx={{
                background: '#25D366',
                color: '#fff',
                fontSize: '14px !important',
                textTransform: 'capitalize',
                fontWeight: 500,
                ':hover': { background: '#DCF8C6', color: '#fff' },
                boxShadow: 'unset'
              }}
              size="small"
              variant="extended"
              href={`https://wa.me/${REACT_APP_SUPPORT_PHONE_NUMBER}`}
              target="_blank"
            >
              <WhatsAppIcon sx={{ mr: 1 }} fontSize="small" />
              Contactar Soporte
            </Fab>
          </ListItem>
          <Divider key={'aftersideitemsmenudivider'} sx={{ width: '100%', marginTop: 1, marginBottom: 1 }} />
          <ListItem key={'logout'} sx={{ justifyContent: 'center' }}>
            <Button
              component="label"
              variant="text"
              size="small"
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ fontSize: '14px' }} />}
            >
              <Typography fontSize='12px'>Cerrar Sesión!</Typography>
            </Button>
          </ListItem>
        </List>
      </Box>
    </>
  )
}
