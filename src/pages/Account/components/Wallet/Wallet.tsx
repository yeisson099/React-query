import React from 'react'
import { useHeaders } from '../../constants/wallet-table.const'
import { BasicInfo, ShipalTable } from '@sharedComponents/index'
import { usePagination } from '@hooks/usePagination'
import { Divider, Stack } from '@mui/material'
import { getTransacionsQuery } from '@pages/Account/hooks/wallet.hook'
import { currentFormat } from '@utils/convert'

export const Wallet: React.FC = () => {
  const [pagination, actionPagination] = usePagination()
  const headers = useHeaders()
  const { data: historyQuery, isPending } = getTransacionsQuery(pagination)
  const balance = currentFormat(historyQuery?.data.total_balance ?? 0)
  const rows = historyQuery?.data ?? []

  const handleChange = (type: string) => (event: any, value: any) =>
    actionPagination(
      type,
      type === 'page' ? value.toString() : event.target.value
    )

  return (
    <Stack spacing={2}>
      <BasicInfo
        isLoading={false}
        gridSize={12}
        titleVariant="h1"
        title={balance}
        descriptionVariant="body1"
        description="Tu balance general es"
      />
      <Divider sx={{ mt: 2, mb: 2, width: '100%' }} />
      <ShipalTable
        tableName="Historial de Transacciones"
        rows={rows}
        headers={headers}
        isLoading={isPending}
        result={historyQuery}
        pagination={pagination}
        handleChange={handleChange}
        isCheckable={false}
      />
    </Stack>
  )
}
