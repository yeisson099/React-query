import React from 'react'
import { Grid } from '@mui/material'
import { BasicInfo } from '@/shared/components'
import DynamicTabs from '@sharedComponents/Dynamic-tabs/DynamicTabs'
import { ORDERS_TABS } from './constants/tabs.const'

export const Account = (): any => {
  return (
    <Grid
      sx={{
        transition: 'transform 0.3s, opacity 0.3s',
        opacity: 1
      }}
      container
      spacing={2}
      p={3}
    >
      <BasicInfo
        isLoading={false}
        gridSize={12}
        titleVariant="h1"
        title="Mis Ordenes"
        descriptionVariant="body1"
      />
      <DynamicTabs tabs={ORDERS_TABS} />
    </Grid>
  )
}

export default Account
