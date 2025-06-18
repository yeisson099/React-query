import React from 'react'
import { usePagination } from '@hooks/usePagination'
import { useHeaders } from '../constants/completed-orders-table.const'
import { getOrdersQuery } from '../hooks/orders-tables.hook'
import { ShipalTable } from '@sharedComponents/index'

export const CompletedShipments: React.FC = () => {
  const [pagination, actionPagination] = usePagination()

  const { data: listOrdersQuery, isLoading } = getOrdersQuery({
    service: 'orders',
    key: 'completed',
    isDraftOrder: false,
    ...pagination
  })

  const rows = listOrdersQuery?.data ?? []

  const handleChange = (type: string) => (event: any, value: any) => {
    actionPagination(
      type,
      type === 'page' ? value.toString() : event.target.value
    )
  }

  const headersV2 = useHeaders()
  const actionButtons = {
    handleDuplicate: () => {}
  }

  return (
    <>
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
      ></ShipalTable>
    </>
  )
}
