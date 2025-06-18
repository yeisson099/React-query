export type ITransactions = {
  _id: string
  user: string
  balance: string
  type: string
  currency: string
  bank: string
  date: string
  _class: string
  metadata: any[]
}

export type IHistory = {
  motionHistory: ITransactions[]
  total_balance: number
}

export interface BalanceValidationData {
  haveCapacity: boolean
  amountToDeb: string
  actualBalance: number
  finalBalance: string
}
