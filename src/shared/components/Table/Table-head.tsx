import React from 'react'
import MuiTableHead from '@mui/material/TableHead'
import MuiTableRow from '@mui/material/TableRow'
import { Checkbox } from '@mui/material'
import MuiTableCell from '@mui/material/TableCell'
import { TableHeadCell } from './Table-head-cell'

export const TableHead = ({
  handleSortChange,
  headers = [],
  order,
  orderBy,
  isCheckable,
  selectedCells,
  handleSelectAllCells,
  rowCount
}: any) => {
  return (
    <>
      <MuiTableHead sx={{ background: '#FAFAFA' }}>
        <MuiTableRow>
          {isCheckable && (
            <MuiTableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selectedCells.length > 0 && selectedCells.length < rowCount
                }
                checked={rowCount > 0 && selectedCells.length === rowCount}
                onChange={handleSelectAllCells}
                inputProps={{
                  'aria-label': 'select all desserts'
                }}
                sx={{
                  opacity: 0
                }}
                size="small"
                disabled={true}
              />
            </MuiTableCell>
          )}
          {headers.map((header: any, index: any) => (
            <TableHeadCell
              key={`header-${header.id}-${index}`}
              id={header.id}
              label={header.label}
              sortable={header.sortable}
              order={order}
              orderBy={orderBy}
              handleSortChange={handleSortChange}
              info={header.info}
              multiselect={header.multiselect}
              colSpan={header.colSpan}
              isCheckable={isCheckable}
              selectedCells={selectedCells}
              align={header.align}
            />
          ))}
        </MuiTableRow>
      </MuiTableHead>
    </>
  )
}

TableHead.displayName = 'TableHead'
