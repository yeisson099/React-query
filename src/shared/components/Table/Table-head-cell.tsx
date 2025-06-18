import React from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import MuiBox from '@mui/material/Box'
import MuiTableCell from '@mui/material/TableCell'
import { getHeadCellButtonsWidth } from './Table.utils'
import { TableSortLabel, Typography } from '@mui/material'

export const TableHeadCell = ({
  filterOptions = [],
  handleSortChange = () => {},
  id,
  info,
  label,
  order,
  orderBy,
  sortable,
  sx,
  colSpan,
  align
}: any) => {
  const hasFilters = Boolean(filterOptions?.length)
  const sortIsActive = orderBy === id
  const buttonsWidth = getHeadCellButtonsWidth({ hasFilters, sortable, info })
  return (
    <>
      <MuiTableCell
        sortDirection={
          sortIsActive ? (order.toLowerCase() as 'asc' | 'desc') : false
        }
        colSpan={colSpan}
        variant="head"
        sx={{ padding: '12px' }}
        align={align}
      >
        <MuiBox
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...(sx?.width && { width: sx.width + buttonsWidth })
          }}
        >
          {sortable ? (
            <ButtonBase
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                height: 40
              }}
              onClick={() => handleSortChange(id, order)}
            >
              {/* <TableHeadCellSortIcon
                            isAsc={isAsc}
                            sortIsActive={sortIsActive}
                            sortable={sortable}
                            backgroundColor={sx?.backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
                        /> */}
            </ButtonBase>
          ) : (
            <TableSortLabel>
              <Typography color='text.primary' variant='subtitle1'>{label}</Typography>
            </TableSortLabel>
          )}
        </MuiBox>
      </MuiTableCell>
    </>
  )
}
