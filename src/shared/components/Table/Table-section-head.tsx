import React, { useState } from 'react'
import { Button, Stack, Toolbar, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { type TableHeadProps } from './Table.types'
import { DeleteModal, OrderActionsButton } from '..'

export const TableSectionHead = ({
  rowsSelected,
  tableName,
  actionButtons
}: TableHeadProps) => {
  const isMoreThanOneRow = Boolean(rowsSelected.length > 1)
  const rowsCounter = rowsSelected.length
  const hasAction = (action: string) =>
    actionButtons && Boolean(action in actionButtons)
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => { setOpenModal(true) }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      {rowsCounter > 0
        ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {rowsCounter} selected
        </Typography>
          )
        : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableName}
        </Typography>
          )}

      {rowsCounter > 0 ? s(
        <Stack direction="row" spacing={1} alignItems="center">
          {hasAction('handleDelete') && (
            <>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
              >
                Borrar
              </Button>
              <DeleteModal
                handleBulkDelete={actionButtons?.handleDelete}
                rowsId={rowsSelected}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            </>
          )}

          {hasAction('handleDuplicate') && !isMoreThanOneRow && (
            <OrderActionsButton orderId={rowsSelected[0]} />
          )}
        </Stack>
      ) : (
        <>
          {/* <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip> */}
        </>
      )}
    </Toolbar>
  )
}

TableSectionHead.displayName = 'TableSectionHead'
TableSectionHead.defaultProps = {}
