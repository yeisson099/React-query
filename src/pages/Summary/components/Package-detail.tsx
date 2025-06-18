import React from 'react'
import { Stack } from '@mui/material'
import { useOrderStore } from '@store/order.store'
import { ShipalTable } from '@sharedComponents/index'
import {
  ITEM_DESC,
  PACKAGE_DESC
} from '../constants/package-detail-headers.const'

export const PackageDetail: React.FC = () => {
  const { order } = useOrderStore()

  return (
    <>
      <Stack sx={{
        marginTop: '16px !important'
      }} gap={1}>
        <ShipalTable
          tableName="envios realizados"
          rows={[order]}
          headers={PACKAGE_DESC()}
          isLoading={!order}
          isCheckable={false}
        />

        <ShipalTable
          tableName="envios realizados"
          rows={order?.package_information ?? []}
          headers={ITEM_DESC()}
          isLoading={!order}
          isCheckable={false}
        />
      </Stack>
    </>
  )
}
