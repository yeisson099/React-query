import React, { useEffect } from 'react'
import { Box, Divider, Grid } from '@mui/material'
import PaymentMethods from './components/Payment-methods'
import BalanceSummary from './components/Balance-summary'
import AddAmount from './components/Add-amount'
import { Paragraph as ShipalParagraph } from '@sharedComponents/Paragraph'
import { PaymentForm } from './components/Payment-form'
import { usePaymentStore } from '@store/index'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PaymentFormSchema } from './constants/form/schema.yup'
import { useHeaderStore } from '@store/header.store'
import PseIcon from '@assets/icons/PseIcon'

const Payments: React.FC = () => {
  const methods = useForm({ resolver: yupResolver(PaymentFormSchema) })
  const { selectedMethod } = usePaymentStore()
  const { setHeaderType } = useHeaderStore()
  const showPaymentForm = selectedMethod !== null

  useEffect(() => {
    setHeaderType('payment')
    return () => {
      setHeaderType('normal')
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '7fr 3fr',
        gap: 2,
        width: '100%',
        height: '100%',
        transition: 'transform 0.3s, opacity 0.3s',
        opacity: 1
      }}
    >
      <FormProvider {...methods}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRight: '1px solid rgba(63, 81, 181, 0.08)',
            p: 3,
            flexGrow: 1
          }}
        >
          <AddAmount />
          <Divider sx={{ mt: 2, mb: 2 }} />
          {!showPaymentForm && (
            <>
              <Box width="80%">
                <ShipalParagraph
                  title="¿Qué proveedor de pago le gustaría utilizar?"
                  titleVariant="h2"
                  description="Elige la plataforma de pago de tu preferencia para cargar tus créditos. Para obtener más información sobre cómo funcionan nuestros pagos, haga clic aquí."
                  descriptionVariant="body1"
                  textAlign="center"
                />
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
            </>
          )}
          <PaymentMethods />
          <Divider sx={{ mt: 2, mb: 2, width: '100%' }} />

          {showPaymentForm && (
            <Box
              sx={{
                width: '90%',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: 'scale(1)',
                opacity: 1
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <PseIcon />
                </Grid>
                <Grid item xs={10}>
                  <Grid
                    container
                    sx={{
                      marginLeft: '8%'
                    }}
                  >
                    <Grid item xs={8}>
                      <PaymentForm />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            padding: 4,
            paddingRight: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <BalanceSummary />
        </Box>
      </FormProvider>
    </Box>
  )
}

export default Payments
