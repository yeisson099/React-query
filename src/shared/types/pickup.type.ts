export type PickupError = {
  status: number
  listErrors: string[]
}

export type PickupData = {
  date: string
  type: string
  orderId: string
  time?: string
}

export type PickupDay = {
  day: string
  date: string
  availability: boolean
  fullDay: string
  monthAbbreviated: string
  fullMonth: string
  time: string
  closeTime: string
}

export type PickupDataDays = {
  next_day: PickupDay
  today: PickupDay
}

export type DayInfo = {
  day: string
  date: string
  availability: boolean
  fullDay: string
  monthAbbreviated: string
  fullMonth: string
  time: string
  closeTime: string
}

export type DayAvailability = {
  next_day: DayInfo
  today: DayInfo
}
