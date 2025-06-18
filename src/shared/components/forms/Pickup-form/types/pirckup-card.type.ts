import { type PickupDataDays } from '@models/pickup.type'

export interface PickupCardProps {
  cardType: string
  selected: boolean
  onClick: (cardType: string) => void
  disabled: boolean
  loading: boolean
  pickupDayData: PickupDataDays | undefined
  canScheduleToday: boolean
}
