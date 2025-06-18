import React, { useMemo } from 'react'
import { type TableHeader } from '@sharedComponents/Table/Table.types'
import { Typography } from '@mui/material'
import { type ITransactions } from '@models/wallet'
import { currentFormat, formatDate } from '@utils/convert'

export const useHeaders = (): TableHeader[] => {
  return useMemo(
    () => [
      {
        id: 'date',
        label: 'Fecha',
        renderComponent: (transaction: ITransactions) => (
          <Typography>{`${formatDate(transaction?.date)}`}</Typography>
        )
      },
      {
        id: 'amount',
        label: 'Monto',
        renderComponent: (transaction: ITransactions) => (
          <Typography>{`${currentFormat(
            parseFloat(transaction?.balance)
          )}`}</Typography>
        )
      },
      {
        id: 'bank',
        prop: 'bank',
        label: 'Banco'
      },
      {
        id: 'balance',
        label: 'Balance',
        renderComponent: (transaction: ITransactions) => (
          <Typography>{`${currentFormat(
            parseFloat(transaction?.balance)
          )}`}</Typography>
        )
      },
      {
        id: 'type',
        prop: 'type',
        label: 'Typo'
      }
    ],
    []
  )
}
