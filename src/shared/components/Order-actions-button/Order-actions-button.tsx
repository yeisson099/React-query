import { useState } from 'react'
import { Typography, Tooltip, Link } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { type OrderActionsAlertDto } from './action-buttons.types'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAlert } from '@providers/Alert-system'
import { cloneOrder } from '@services/orders.service'
import { Link as RouterLink } from 'react-router-dom'

interface OrderActionsButtonProps {
  orderId: string
  handleChangeAlert?: (data: OrderActionsAlertDto) => void
}
export const OrderActionsButton = ({
  orderId,
  handleChangeAlert
}: OrderActionsButtonProps) => {
  const [isLoading, setLoader] = useState(false)
  const showAlert = useAlert()

  const handleDuplicateOrder = async () => {
    setLoader(true)
    const cloneCreated = await cloneOrder(orderId)
    const alertContent = (
      <Typography>
        Orden duplicada -{' '}
        <strong>
          La nueva orden{' '}
          <Link
            component={RouterLink}
            to={`/shipping/${
              cloneCreated.is_international_shippment
                ? 'international'
                : 'national'
            }/${cloneCreated._id}`}
            sx={{ color: '#7E00FB' }}
          >
            #{cloneCreated.invoice_number}
          </Link>{' '}
          ha sido creada!
        </strong>{' '}
        podrás verla en la pagina de{' '}
        <Link
          component={RouterLink}
          to="/shipments/realizados"
          sx={{ color: '#7E00FB' }}
        >
          Envíos pendientes
        </Link>
      </Typography>
    )
    if (cloneCreated.invoice_number) {
      if (handleChangeAlert) {
        handleChangeAlert({
          showAlert: true,
          alertMessage: alertContent,
          alertType: 'success'
        })
      } else {
        showAlert(alertContent, 'success')
      }
    } else {
      showAlert(
        'Hubo un error al duplicar la orden, vuelve a intentarlo por favor',
        'error'
      )
    }
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }

  return orderId && orderId !== ''
    ? (
    <>
      <Tooltip
        title="Ahora, podrás duplicar tus ordenes con un solo click!"
        arrow
      >
        <LoadingButton
          onClick={handleDuplicateOrder}
          sx={{ ':hover': { color: '#7E00FB' } }}
          loading={isLoading}
          variant="outlined"
          startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
        >
          Duplicar
        </LoadingButton>
      </Tooltip>
    </>
      )
    : (
    <></>
      )
}
