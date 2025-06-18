import React, { useEffect } from 'react'
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { OrderDetail } from './components/Order-detail'
import StatusCard from './components/Status-card'
import { BasicInfo } from '@sharedComponents/Basic-info'
import { PackageDetail } from './components/Package-detail'
import { SUMMARY_TABS } from './constants/tabs.const'
import { DynamicTabs } from '@sharedComponents/index'
import { ContentPaste, ExpandMore } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { getOrderByIdQuery } from './hooks/summary.hook'
import { useOrderStore } from '@store/order.store'
import PickupCard from './components/Pickup-card'
import Guidelines from './components/Guidelines'
import { OrderTag } from '@pages/Orders/components'

const Summary: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const { setOrder } = useOrderStore()
  const tabs = SUMMARY_TABS()
  if (!orderId) {
    return <div>Error: No se proporcionó un ID de pedido válido.</div>
  }
  const { data: order, isLoading } = getOrderByIdQuery(orderId)

  const handleClipBoard = async (): Promise<void> => {
    await navigator.clipboard.writeText(order?.airway_bill_number)
  }

  useEffect(() => {
    setOrder(order)
  }, [order, setOrder])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '7fr 3fr',
        gap: 2,
        width: '100%',
        height: '100%',
        transition: 'transform 0.3s, opacity 0.3s',
        opacity: isLoading ? 0 : 1
      }}
    >
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
        <Stack direction="column" spacing={4}>
          <OrderDetail />
          <Stack direction="row" spacing={4}>
            <StatusCard
              title="Descargar Guia"
              desc="Descargue e imprima su guía para adjuntarla a su paquete. Lee nuestros consejos sobre cómo hacerlo."
              Icon={DescriptionOutlinedIcon}
              buttonChild={<OrderTag order={order} contained={true} />}
            />
            <PickupCard />
          </Stack>
          <BasicInfo
            isLoading={false}
            gridSize={12}
            titleVariant="h2"
            title="Muy Importante!"
            descriptionVariant="body1"
            description="Lea nuestras directrices a continuación sobre cómo gestionar correctamente el proceso posterior a la compra de su envío. Si necesita más ayuda, visite nuestra página de recursos para obtener más información."
          />
          <Accordion
            elevation={0}
            variant="outlined"
            sx={{
              borderRadius: '6px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>📄 Lee nuestras directrices</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Guidelines />
            </AccordionDetails>
          </Accordion>

          <BasicInfo
            isLoading={false}
            gridSize={12}
            titleVariant="h2"
            title="Detalle del paquete"
          />
          <PackageDetail />
        </Stack>
      </Box>

      <Box
        sx={{
          paddingY: 4,
          paddingX: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start'
        }}
      >
        <Stack
          direction="column"
          justifyContent="start"
          pl={1}
          alignItems="start"
        >
          <Typography variant="body3" color="grey.400">
            Número de Guía
          </Typography>
          <Stack
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Tooltip title="Haz click para rastrear tu guia." placement="top">
              <Typography variant="h2" fontWeight="bold">
                {order?.airway_bill_number}
              </Typography>
            </Tooltip>
            <Tooltip
              title="Haz click para copiar el numero de tu guia."
              placement="top"
            >
              <IconButton
                aria-label="copy"
                color="default"
                onClick={handleClipBoard}
              >
                <ContentPaste fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <DynamicTabs tabs={tabs} />
      </Box>
    </Box>
  )
}

export default Summary
