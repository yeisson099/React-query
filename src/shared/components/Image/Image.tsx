import React, { useState } from 'react'
import { type ImageProps } from './Image.types'
import Skeleton from '@mui/material/Skeleton'
import { Box } from '@mui/material'

const Image: React.FC<ImageProps> = ({
  height,
  width,
  sx,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <Box sx={{ height, width, ...sx }}>
      {!imageLoaded && (
        <Skeleton
          data-testid={'image-skeleton'}
          variant="rectangular"
          width={'100%'}
          height={'100%'}
          sx={{ borderRadius: 'inherit' }}
        />
      )}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          opacity: imageLoaded ? 1 : 0,
          borderRadius: 'inherit',
          transition: ({ transitions: { create } }) => create('opacity')
        }}
      >
        <img
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            borderRadius: 'inherit'
          }}
          data-isloaded={imageLoaded}
          src={props.src}
          alt={props.alt}
          onLoad={handleImageLoad}
          {...props}
        />
      </Box>
    </Box>
  )
}

export default Image
