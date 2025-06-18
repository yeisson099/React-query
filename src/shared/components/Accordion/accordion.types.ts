export interface AccordionProps {
  expandedState: boolean
  title: string
  children: React.ReactNode
}

export type TransitionIconProps = { onClick: () => void, expanded: boolean }
