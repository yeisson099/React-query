import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { router } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from './theme/theme'
import { Backdrop, CircularProgress } from '@mui/material'

const queryClient = new QueryClient()

function App (): JSX.Element {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <Backdrop open={true} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
              </Backdrop>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
