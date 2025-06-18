import React, { type ReactNode } from 'react'
import { Typography, Stack, type TypographyTypeMap } from '@mui/material'
import { type Variant } from '@mui/material/styles/createTypography'
import { type DefaultComponentProps } from '@mui/material/OverridableComponent'

type Props = {
  titleVariant: Variant
  descriptionVariant?: Variant
  title: string
  description?: string
  children?: ReactNode
} & DefaultComponentProps<TypographyTypeMap>

export const Paragraph = ({
  titleVariant,
  descriptionVariant,
  title,
  description,
  children,
  textAlign
}: Props): any => {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant={titleVariant} textAlign={textAlign}>
        {title}
      </Typography>
      {description && (
        <Typography variant={descriptionVariant} textAlign={textAlign}>
          {description}
        </Typography>
      )}
      {children}
    </Stack>
  )
}
