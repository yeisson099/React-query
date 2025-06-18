import React, { useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, MenuItem, Typography, Link } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import { DropDownButton } from '@sharedComponents/Drop-down'
import { type HeaderProps } from '../../types/header.type'
import { useHeaderStore } from '@store/header.store'
import { PaymentHeader } from './Payment-header'

export const Header: React.FC<HeaderProps> = ({
  userData,
  onDimensionsSetted
}: HeaderProps) => {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const { headerType } = useHeaderStore()

  useLayoutEffect(() => {
    if (ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current
      onDimensionsSetted({ width, height })
    }
  }, [])

  return (
    <>
      {headerType === 'normal'
        ? (
        <Box
          sx={{
            borderBottom: '1px solid rgba(63, 81, 181, 0.08)',
            opacity: 1,
            flexGrow: 1,
            p: 3,
            paddingTop: 0,
            paddingBottom: 0,
            minHeight: '48px'
          }}
          ref={ref}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={{
              paddingTop: 1,
              paddingBottom: 1
            }}
          >
            <Box display="flex" flexDirection="row">
              <Typography
                variant="subtitle1"
                display="flex"
                flexDirection="row"
              >
                Bienvenido,&nbsp;
                <Link
                  variant="subtitle1"
                  underline="always"
                  href="/account"
                  sx={{
                    textDecorationColor: 'rgba(0, 0, 0)',
                    color: 'black'
                  }}
                >
                  <Typography variant="subtitle1">
                    {userData?.firstName ?? ''}
                  </Typography>
                </Link>
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Typography
                variant="subtitle1"
                color={'rgba(0, 0, 0, 0.6)'}
                marginRight={1}
              >
                {userData?.enterpriseName}
              </Typography>
              <DropDownButton
                label="Crear Envio"
                variant="contained"
                endIcon={<KeyboardArrowDown fontSize="small" />}
                disableElevation
              >
                <MenuItem
                  onClick={() => {
                    navigate('/shipping/national')
                  }}
                >
                  Nacional
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate('/shipping/international')
                  }}
                >
                  Internacional
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/quoter')
                  }}
                >
                  Cotizar envio
                </MenuItem>
              </DropDownButton>
            </Box>
          </Box>
        </Box>
          )
        : (
        <PaymentHeader />
          )}
    </>
  )
}
