import { COURIERS, type ICOURIERS } from '@models/orders.type'

const urlDictionary = {
  [COURIERS.DHL]: (guide: string) =>
    `https://www.dhl.com/us-en/home/tracking/tracking-express.html?submit=1&tracking-id=${guide}`,
  [COURIERS.FEDEX]: (guide: string) =>
    `https://www.fedex.com/fedextrack/system-error?trknbr=${guide}`,
  [COURIERS.COORDINADORA]: (guide: string) =>
    `https://www.coordinadora.com/portafolio-de-servicios/servicios-en-linea/rastrear-guias/?guia=${guide}`
}

export const handleTrackingUrl = (guide: string, carrier: ICOURIERS): string =>
  urlDictionary[carrier](guide)
