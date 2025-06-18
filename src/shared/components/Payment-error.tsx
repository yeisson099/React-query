import React, { useCallback, useMemo } from 'react'
import { Typography, Button, Link, Grid, Modal, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type CreateLabelError } from '@models/orders.type'

interface Props {
  error?: CreateLabelError
  total?: number | null
}

export const PaymentError = ({ error, total }: Props) => {
  const [open, setOpen] = React.useState(true)
  console.log('ERRORR')
  console.log(error)
  const ENV = import.meta.env
  const navigate = useNavigate()

  const handleRecharge = useCallback(() => {
    navigate('/payments')
  }, [history, total])

  const supportUrl = useMemo(
    () => `https://wa.me/${ENV.VITE_SUPPORT_PHONE_NUMBER}`,
    []
  )

  const boxStyles = useMemo(
    () => ({
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'white',
      padding: '1rem',
      borderRadius: '1rem'
    }),
    []
  )

  const toggleModal = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyles}>
        <Typography sx={{ m: 2 }} variant="h4">
          Resumen
        </Typography>

        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {error?.statusCode === 403
            ? (
            <>
              <Typography>
                No tienes saldo suficiente para crear este envío
              </Typography>

              {Boolean(total) && (
                <Button onClick={handleRecharge}>Recargar saldo</Button>
              )}
            </>
              )
            : (
            <>
              <Typography>{error?.data.message}</Typography>

              {error?.data.errors && (
                <ul>
                  {error?.data.errors.map((error: any, index: number) =>
                    error.code
                      ? (
                      <li key={index}>
                        <Typography>
                          {' '}
                          <b>Codigo:</b> {error.code} <b>Error:</b>
                          {error.message}
                        </Typography>
                      </li>
                        )
                      : (
                      <li key={index}>
                        <Typography>{error}</Typography>
                      </li>
                        )
                  )}
                </ul>
              )}

              <Link href={supportUrl} target="_blank">
                contactar con soporte
              </Link>
            </>
              )}
        </Grid>
      </Box>
    </Modal>
  )
}
