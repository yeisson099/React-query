import React from 'react'
import MuiSvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export const SvgIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => <MuiSvgIcon {...props} />

SvgIcon.defaultProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
  color: 'inherit',
  fill: 'none'
}
