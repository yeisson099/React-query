import React, { type ReactNode, useMemo, useState } from 'react'
import { type SxProps } from '@mui/system'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Collapse
} from '@mui/material'
import { type MenuItem, menuItemsMock } from '../constants/menu.const'
import { theme } from '@/theme/theme'
import { Link, useLocation } from 'react-router-dom'

type OpenState = Record<number, boolean>

const commonStyles: SxProps = {
  fontSize: '12px !important',
  transition: '0.4s'
}

const commonHover: SxProps = {
  backgroundColor: theme.palette.primary.lighter,
  color: '#7E00FB'
}

export const MainMenu: React.FC = () => {
  const location = useLocation()

  const menuItems: MenuItem[] = menuItemsMock
  const [open, setOpen] = useState<OpenState>({})

  const handleClick = (index: number): void => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index]
    }))
  }

  const isMenuItemActive = (path: string): boolean => {
    return location.pathname === path
  }

  const menuStyles = useMemo<SxProps>(
    () => ({
      ...commonStyles,
      ':hover': {
        ...commonHover,
        borderRadius: '5px'
      },
      justifyContent: 'start!important',
      borderRadius: '5px',
      opacity: '1'
    }),
    []
  )

  const textStyles = useMemo<SxProps>(
    () => ({
      ...commonStyles,
      ':hover': {
        color: '#7E00FB'
      }
    }),
    []
  )

  const renderMenuItem = (
    { name, icon: Icon, children, path, isOpen }: MenuItem,
    index: number
  ): ReactNode => {
    const isSelected = isMenuItemActive(path ?? '')

    if (children !== null) {
      return (
        <div key={`father-${index}`}>
          <ListItemButton
            key={`father-list-${index}`}
            component={Link}
            sx={{
              ...menuStyles,
              ...(isSelected && {
                backgroundColor: theme.palette.primary.lighter,
                color: '#7E00FB'
              })
            }}
            to={path ?? ''}
            onClick={() => {
              handleClick(index)
            }}
          >
            <ListItemIcon>
              {Icon !== undefined && (
                <ListItemIcon>
                  <Icon sx={{ fontSize: '20px !important' }} />
                </ListItemIcon>
              )}
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{
                ...textStyles,
                ...(isSelected && { color: '#7E00FB' })
              }}
            />
            {/* {open[index] ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>
          <Container>
            <Collapse
              in={isOpen ?? open[index]}
              timeout="auto"
              unmountOnExit
              sx={{
                borderLeft: '2px solid rgba(63, 81, 181, 0.08)',
                opacity: 1
              }}
            >
              <List sx={{ marginLeft: 1 }} disablePadding>
                {children?.map(({ name, path }, childIndex) => (
                  <ListItemButton
                    key={`child-${childIndex}-list-${index}`}
                    component={Link}
                    sx={{
                      ...menuStyles,
                      ...(isSelected && {
                        backgroundColor: theme.palette.primary.lighter,
                        color: '#7E00FB'
                      }),
                      marginLeft: 1
                    }}
                    to={path ?? ''}
                    onClick={() => {
                      handleClick(index)
                    }}
                  >
                    <ListItemText
                      primary={name}
                      sx={{
                        ...textStyles,
                        ...(isSelected && { color: '#7E00FB' })
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Container>
        </div>
      )
    }

    return (
      <ListItemButton
        key={`father-list-${index}`}
        component={Link}
        sx={{
          ...menuStyles,
          ...(isSelected && {
            backgroundColor: theme.palette.primary.lighter,
            color: '#7E00FB'
          })
        }}
        to={path ?? ''}
        onClick={() => {
          handleClick(index)
        }}
      >
        <ListItemIcon>
          {Icon !== undefined && (
            <ListItemIcon>
              <Icon sx={{ fontSize: '20px !important' }} />
            </ListItemIcon>
          )}
        </ListItemIcon>
        <ListItemText
          primary={name}
          sx={{
            ...textStyles,
            ...(isSelected && { color: '#7E00FB' })
          }}
        />
      </ListItemButton>
    )
  }
  return (
    <Container sx={{ padding: '0px 10px !important', backgroundColor: 'grey.0' }}>
      <List>
        {menuItems.map((menuItem, index) => renderMenuItem(menuItem, index))}
      </List>
    </Container>
  )
}
