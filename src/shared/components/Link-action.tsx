import React from 'react'
import { Button, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

type LinkActionProps = {
  text: string
  action?: (arg0: any) => any
}

export const LinkAction: React.FC<LinkActionProps> = ({
  text,
  action
}: LinkActionProps) => {
  return (
    <Button
      variant="text"
      onClick={action}
      startIcon={
        <AddCircleOutlineIcon
          fontSize="medium"
          sx={{ color: '#7E00FB', marginRight: 1 }}
        />
      }
    >
      <Typography variant="caption" fontWeight="bold">
        {text}
      </Typography>
    </Button>
  )
}
