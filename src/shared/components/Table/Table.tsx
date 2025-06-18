import React, { forwardRef, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import MuiTable from '@mui/material/Table'
import { type TableProps } from './Table.types'
import { CircularProgress, Paper, Typography } from '@mui/material'
import { TableBody } from './Table-body'
import { TableHead, TablePagination, TableSectionHead } from '..'

export const ShipalTable: React.FC<TableProps> =
  ({
    headers,
    height,
    isLoading,
    tableName,
    rows,
    sx,
    emptyStateMessage = 'No items found',
    pagination,
    handleChange,
    result,
    isCheckable,
    actionButtons
  }: TableProps) => {
    const [selectedCells, setSelectedCell] = useState<string[]>([])
    const handleSelectAllCells = (event: any): undefined => {
      if (event?.target?.checked) {
        const newSelected = rows.map((n: any) => n._id)
        setSelectedCell(newSelected)
        return
      }
      setSelectedCell([])
    }
    const hasSectionHeaders = Boolean(selectedCells?.length)

    if (isLoading) return <CircularProgress />

    return (
      <>
        {rows.length
          ? (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              width: '100%',
              overflow: 'hidden',
              transition: 'transform 1s, opacity 1s',
              opacity: isLoading ? 0 : 1
            }}
          >
            {hasSectionHeaders && (
              <TableSectionHead
                rowsSelected={selectedCells}
                tableName={tableName}
                actionButtons={actionButtons}
              />
            )}
            <TableContainer
              id={`table_${tableName}`}
              sx={{
                height,
                borderRadius: 1,
                pointerEvents: isLoading ? 'none' : 'auto',
                position: 'relative'
              }}
            >
              <MuiTable stickyHeader={true} aria-label="Table">
                <TableHead
                  headers={headers}
                  isCheckable={isCheckable}
                  selectedCells={selectedCells}
                  setSelectedCell={setSelectedCell}
                  handleSelectAllCells={handleSelectAllCells}
                  rowCount={rows.length}
                />
                <TableBody
                  rows={rows}
                  headers={headers}
                  isCheckable={isCheckable}
                  selectedCells={selectedCells}
                  setSelectedCell={setSelectedCell}
                />
              </MuiTable>
            </TableContainer>
            {pagination && (
              <TablePagination
                pagination={pagination}
                handleChange={handleChange}
                result={result}
              />
            )}
          </Paper>
            )
          : (
          <Typography>{emptyStateMessage}</Typography>
            )}
      </>
    )
  }

ShipalTable.defaultProps = {
  headers: [],
  rows: [],
  isLoading: false
}
ShipalTable.displayName = 'Shipal Table'
