import React from 'react'
import { useHeaders } from '../constants/draft-orders-table.const'
import { ShipalTable } from '@sharedComponents/index'
import { usePagination } from '@hooks/usePagination'
import {
  getOrdersQuery,
  useMutateOrdersList
} from '@pages/Orders/hooks/orders-tables.hook'

export const DraftShipments: React.FC = () => {
  const [pagination, actionPagination] = usePagination()
  const headersV2 = useHeaders()
  const { data: listOrdersQuery, isLoading } = getOrdersQuery({
    service: 'orders',
    key: 'draft',
    isDraftOrder: true,
    ...pagination
  })
  const { mutate: bulkDetele, isPending } = useMutateOrdersList(pagination)
  const rows = listOrdersQuery?.data ?? []

  const handleBulkDelete = (selectedIds: string[]): void => {
    bulkDetele(selectedIds)
  }

  const handleChange = (type: string) => (event: any, value: any) =>
    actionPagination(
      type,
      type === 'page' ? value.toString() : event.target.value
    )

  const actionButtons = {
    handleDuplicate: () => {},
    handleDelete: async (selectedIds: string[]) => {
      handleBulkDelete(selectedIds)
    }
  }

  return (
    <ShipalTable
      tableName="envios realizados"
      rows={rows}
      headers={headersV2}
      isLoading={isLoading}
      result={listOrdersQuery}
      pagination={pagination}
      handleChange={handleChange}
      isCheckable={true}
      actionButtons={actionButtons}
    />
  )
}
