import { type ReactNode } from 'react'

export const getHeadCellButtonsWidth = ({
  hasFilters,
  sortable,
  info
}: {
  hasFilters: boolean
  sortable?: boolean
  info?: ReactNode
}): number => {
  const buttons = {
    filters: hasFilters ? 34 : 0,
    sortable: sortable ? 18 + 16 : 0,
    info: info ? 18 + 16 : 0
  }

  return Object.values(buttons).reduce((total, current) => total + current, 0)
}
