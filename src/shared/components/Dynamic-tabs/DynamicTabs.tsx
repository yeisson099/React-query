import React, { useState } from 'react'
import { Tab, Tabs, Box, Grid } from '@mui/material'
import { type DynamicTabsProps } from './DynamicTabs.types'

const DynamicTabs: React.FC<DynamicTabsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0)

  const handleChange = (_: any, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={2} pl={1} pt={1}>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 0, paddingTop: '5px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ padding: '0 !important' }}>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            sx={{
              opacity: value === index ? 1 : 0,
              transition: 'opacity 1s'
            }}
          >
            {value === index && (
              <Box pl={3} pt={3}>
                {tab.content}
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}

export default DynamicTabs
