import React from 'react'
import { Box, Link, Typography, Chip } from '@mui/material'
import { WarningAmberOutlined } from '@mui/icons-material'
import { type TitleCardProps } from './TitleCard.type'

export const TitleCard: React.FC<TitleCardProps> = ({
  handleOpenModal,
  title,
  buttonName = 'Editar',
  validations
}) => {
  return (
    <Box
      sx={{
        margin: '1rem 24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h4" sx={{ fontSize: '18px !important' }}>
        {title}
      </Typography>
      {validations?.type && validations.type === 'ERROR' && (
        <Chip
          color="error"
          variant="outlined"
          icon={<WarningAmberOutlined />}
          label={validations.label}
        />
      )}
      {!!handleOpenModal && (
        <Link onClick={handleOpenModal}> {buttonName}</Link>
      )}
    </Box>
  )
}
