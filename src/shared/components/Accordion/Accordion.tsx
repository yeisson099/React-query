import React, { useEffect } from 'react'
import { Stack, Typography, Collapse } from '@mui/material'
import TransitionIcon from './Transition-icon'
import { type AccordionProps } from './accordion.types'

const Accordion: React.FC<AccordionProps> = ({
  expandedState = false,
  title,
  children
}) => {
  const [expanded, setExpanded] = React.useState(expandedState)
  useEffect(() => {
    setExpanded(expandedState)
  }, [expandedState])

  return (
    <div>
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        gap={1}
      >
        <Typography variant='body1' mr={'auto'}>
          {title}
        </Typography>
        <TransitionIcon
          expanded={expanded}
          onClick={() => {
            setExpanded(!expanded)
          }}
        />
      </Stack>
      <Collapse in={expanded}>{children}</Collapse>
    </div>
  )
}

export default Accordion
