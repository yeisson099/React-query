import React from 'react'
import MuiTableCell from '@mui/material/TableCell'
import { type TableBodyContent } from './Table.types'
import { Typography } from '@mui/material'

export const CustomTableCell = ({ row, headers, isLastItem }: TableBodyContent) => {
  console.log(isLastItem)
  return (
    <>
      {headers.map(
        ({ id, renderComponent, colSpan, align, width, prop }, index) => {
          const content = renderComponent
            ? (
                React.cloneElement(renderComponent(row))
              )
            : (
            <Typography>{prop ? row[prop] : 'N/A'}</Typography>
              )

          return (
            <MuiTableCell
              key={`tableBodyCell_${id}_${index}`}
              variant="body"
              colSpan={colSpan}
              align={align}
              sx={{
                height: '50px',
                maxHeight: '80px',
                paddingRight: align && '4%',
                width,
                ...(isLastItem && { border: 'none' })
              }}
            >
              {content}
            </MuiTableCell>
          )
        }
      )}
    </>
  )
}
