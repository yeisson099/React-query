import React from 'react'
import { Grid } from '@mui/material'
import { BasicInfo } from '@/shared/components'
import { useUserQuery } from '@hooks/useUserData.hook'
import { ACCOUNT_TABS } from './constants/tabs.const'
import DynamicTabs from '@sharedComponents/Dynamic-tabs/DynamicTabs'

export const Account = (): any => {
  const { data: user, isLoading } = useUserQuery()
  const tabs = ACCOUNT_TABS(user, isLoading)

  return (
    <Grid
      sx={{
        transition: 'transform 0.3s, opacity 0.3s',
        opacity: isLoading ? 0 : 1
      }}
      container
      spacing={2}
      p={3}
    >
      <BasicInfo
        isLoading={false}
        gridSize={12}
        titleVariant="h1"
        title="Cuenta"
        descriptionVariant="body1"
        description="Accede a toda la información de tu cuenta."
      />
      <DynamicTabs tabs={tabs} />
    </Grid>
  )
}

export default Account
