import { type SxProps, type TableCellProps } from '@mui/material'
import { type ReactElement } from 'react'
import type React from 'react'

export type TableHeader = {
  id: string
  label: ReactElement | string
  searchable?: boolean
  colSpan?: number
  sortable?: boolean
  sx?: any
  width?: any
  align?: TableCellProps['align']
  renderComponent?: (props: any) => ReactElement
  prop?: string
}

export type Row = {
  rowIndex?: number
  [key: string]: any
}

export type TableProps = {
  headers: TableHeader[]
  height?: number
  isLoading: boolean
  tableName: string
  rows: Row[]
  sx?: SxProps
  emptyStateMessage?: string
  pagination?: any
  handleChange?: any
  result?: any
  isCheckable?: boolean
  actionButtons?: TableHeadProps['actionButtons']
}

export interface TableBodyProps {
  id?: string
  headers: TableHeader[]
  rows: Row[]
  isCheckable?: boolean
  selectedCells: string[]
  setSelectedCell: React.Dispatch<React.SetStateAction<string[]>>
}

export interface TableBodyContent {
  headers: TableHeader[]
  row: Row
  isLastItem: boolean
}

export interface TableHeadProps {
  tableName: string
  rowsSelected: TableBodyProps['selectedCells']
  actionButtons?: actionButtons
  orderId?: any
  handleAction?: any
}

export type actionButtons = Record<string, (id?: any) => any>
