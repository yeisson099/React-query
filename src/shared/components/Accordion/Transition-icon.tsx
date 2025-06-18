import React from 'react'
import { type TransitionIconProps } from './accordion.types'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@assets/icons/ExpandMoreIcon'

const TransitionIcon: React.FC<TransitionIconProps> = ({
  onClick,
  expanded
}) => {
  return (
    <IconButton onClick={onClick}>
      <ExpandMoreIcon
        color={expanded ? 'primary' : 'inherit'}
        sx={{
          transition: ({ transitions: { create } }) => create('transform'),
          transform: `rotate(${expanded ? 180 : 0}deg)`
        }}
      />
    </IconButton>
  )
}

export default TransitionIcon
