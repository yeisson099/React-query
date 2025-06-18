import React from 'react'
import { Stack } from '@mui/material'
import MuiTablePagination, { type PaginationProps } from '@mui/material/Pagination'
import { PeerPage } from '..'

export const TablePagination = ({
  pagination,
  handleChange,
  result
}: any) => {
  const paginationStyles: PaginationProps['sx'] = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '& .Mui-selected': {
      color: '#000 !important',
      fontWeight: 'bold !important',
      borderColor: '#fff !important',
      backgroundColor: 'rgba(145, 158, 171, 0.16) !important'
    }
  }

  return (
    <Stack
      sx={{
        borderTop: '1px solid',
        borderColor: 'common.border',
        px: 1,
        padding: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <PeerPage size={pagination.size} onChange={handleChange('size')} />
      <MuiTablePagination
        count={result?.totalPages ?? 1}
        page={parseInt(pagination.page)}
        onChange={handleChange('page')}
        variant="outlined"
        dir="ltr"
        sx={paginationStyles}
      />
    </Stack>
  )
}
