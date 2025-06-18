import React from 'react'
import {
  Dialog,
  Card,
  Grid,
  Divider,
  Typography,
  Button,
  Container,
  CardActionArea,
  CardContent,
  DialogTitle,
  CardActions,
  DialogActions,
  Stack,
  IconButton
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import AddIcon from '@mui/icons-material/Add'
import { currentFormat } from '@utils/convert'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'

export interface BalanceValidationData {
  actualBalance?: string
  finalBalance?: string
  amountToDeb?: string
  haveCapacity?: boolean
}

export interface BalanceValidationProps {
  balanceData?: BalanceValidationData
  open: boolean
  isLoadingPayment: boolean
  handleClose: () => void
  handleConfirm: () => void
}

export const PaymentAds: React.FC<BalanceValidationProps> = ({
  balanceData,
  open,
  handleClose,
  handleConfirm,
  isLoadingPayment
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        {!balanceData?.haveCapacity && (
          <ErrorOutlineOutlinedIcon sx={{ color: 'red' }} />
        )}
        <Typography fontWeight="bold">Confirmar pago </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ width: '100%' }} />
      <Card>
        <CardContent>
          <Grid container>
            <Grid xs={12} item>
              <Grid container padding={2}>
                <Grid xs={6} item>
                  <Typography variant="h4">Saldo inicial</Typography>
                </Grid>
                <Grid xs={6} item>
                  {balanceData?.haveCapacity
                    ? (
                    <Typography variant="body1" textAlign={'right'}>
                      {balanceData?.actualBalance &&
                        currentFormat(parseFloat(balanceData?.actualBalance))}
                    </Typography>
                      )
                    : (
                    <Typography variant="body1" textAlign={'right'}>
                      <Typography variant="body1" color={'red'}>
                        {balanceData?.actualBalance &&
                          currentFormat(parseFloat(balanceData?.actualBalance))}
                      </Typography>
                      <Typography variant="body1" color={'red'}>
                        ¡Saldo insuficiente!
                      </Typography>
                    </Typography>
                      )}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid container padding={2}>
                <Grid xs={6} item>
                  <Typography variant="h4">Costo de envío</Typography>
                </Grid>
                <Grid xs={6} item>
                  <Typography variant="body1" textAlign={'right'}>
                    -{' '}
                    {balanceData?.amountToDeb &&
                      currentFormat(parseFloat(balanceData?.amountToDeb))}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ width: '100%' }} />
            <Grid xs={12} item>
              {balanceData?.haveCapacity
                ? (
                <Grid container padding={2}>
                  <Grid xs={6} item>
                    <Typography variant="h4">Balance final</Typography>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography variant="body1" textAlign={'right'}>
                      {balanceData?.finalBalance &&
                        currentFormat(parseFloat(balanceData?.finalBalance))}
                    </Typography>
                  </Grid>
                </Grid>
                  )
                : (
                <Grid container padding={2}>
                  <Grid xs={12} item textAlign={'center'}>
                    <Typography variant="body1">Cantidad requerida</Typography>
                  </Grid>
                  <Grid xs={12} item textAlign={'center'}>
                    <Typography variant="h4" fontWeight="bold">
                      {balanceData?.finalBalance &&
                        currentFormat(
                          parseFloat(balanceData?.finalBalance)
                        ).replace('-', '')}
                    </Typography>
                  </Grid>
                </Grid>
                  )}
            </Grid>
          </Grid>
        </CardContent>

        <CardActions
          sx={{
            p: 2,
            gap: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {!balanceData?.haveCapacity
            ? (
            <Button
              variant="outlined"
              component={Link}
              to={'/payments'}
              startIcon={<AddIcon />}
            >
              ABONAR
            </Button>
              )
            : (
            <LoadingButton
              loading={isLoadingPayment}
              sx={{
                background: '#0EBF71',
                ':hover': { background: '#086B3F' }
              }}
              variant="contained"
              onClick={handleConfirm}
            >
              PAGAR
            </LoadingButton>
              )}
          <Typography color={'gray'}>
            ¡No te preocupes, tu pedido ha sido guardado!
          </Typography>
        </CardActions>
      </Card>
    </Dialog>
  )
}
