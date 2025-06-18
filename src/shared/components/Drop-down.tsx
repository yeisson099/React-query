import { type MouseEvent, useCallback, useMemo, useState } from 'react'
import { Button, type ButtonProps, Menu, type MenuProps } from '@mui/material'

interface Props extends ButtonProps {
  label: string
}

export const DropDownButton = ({ label, children, ...rest }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const menuStyles = useMemo<MenuProps['sx']>(
    () => ({
      boxShadow:
        ' 0 0 2px 0 rgba(145, 158, 171, 0.5), 0 12px 24px -4px rgba(145, 158, 171, 0.3)'
    }),
    []
  )

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        {...rest}
        sx={{
          padding: '10px',
          fontWeight: 600
        }}
        size="medium"
      >
        {label}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        sx={menuStyles}
      >
        {children}
      </Menu>
    </>
  )
}
