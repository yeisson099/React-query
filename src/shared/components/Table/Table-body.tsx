import React from 'react'
import MuiTableRow from '@mui/material/TableRow'
import MuiTableBody from '@mui/material/TableBody'
import MuiTableCell from '@mui/material/TableCell'
import { type TableBodyProps } from './Table.types'
import { Checkbox } from '@mui/material'
import { CustomTableCell } from './Table-body-cell'

export const TableBody: React.FC<TableBodyProps> = ({ rows, headers, isCheckable, selectedCells, setSelectedCell }) => {
  const isSelected = (name: string) => selectedCells.includes(name)
  const handleClickSelectOrder = (
    event: React.MouseEvent<unknown>,
    id: string
  ) => {
    const selectedIndex = selectedCells.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = [...selectedCells, id]
    } else {
      newSelected = selectedCells.filter(
        (selectedId: string) => selectedId !== id
      )
    }

    setSelectedCell(newSelected)
  }
  const isLastItem = (index) => index === rows.length - 1

  return (
    <MuiTableBody>
      {rows.map((row, index) => (
        <MuiTableRow
          key={`row-${index}`}
          role={isCheckable ? 'checkbox' : 'dataGrid'}
          aria-checked={isSelected(row._id)}
          selected={isSelected(row._id)}
        >
          <>
            {isCheckable
              ? (
              <MuiTableCell
                colSpan={1}
                padding="checkbox"
                sx={{
                  ...(isLastItem(index) && { border: 'none' })
                }}
              >
                <Checkbox
                  color="primary"
                  onClick={(event) => {
                    handleClickSelectOrder(event, row._id)
                  }}
                  checked={isSelected(row._id)}
                  inputProps={{
                    'aria-labelledby': `tableCell-checkbox-${index}`
                  }}
                  size="small"
                />
              </MuiTableCell>
                )
              : null}

            <CustomTableCell
              row={{ ...row, rowIndex: index }}
              headers={headers}
              isLastItem={isLastItem(index)}
            />
          </>
        </MuiTableRow>
      ))}
    </MuiTableBody>
  )
}

TableBody.displayName = 'TableBody'
