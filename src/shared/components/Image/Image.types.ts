import { type ImgHTMLAttributes } from 'react'
import { type BoxProps } from '@mui/material/Box'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  height?: string | number
  width?: string | number
  sx?: BoxProps['sx']
}
