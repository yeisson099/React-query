import React from 'react'
import { SvgIcon } from '@sharedComponents/SvgIcon'
import { type SvgIconProps } from '@mui/material'

const ExpandMoreIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} data-testid={'expandMoreIcon'}>
    <path
      d={
        'M12 15.0125L6.70001 9.7125L7.40001 8.9875L12 13.5875L16.6 ' +
        '8.9875L17.3 9.7125L12 15.0125Z'
      }
    />
  </SvgIcon>
)

export default ExpandMoreIcon
