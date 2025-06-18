import { create } from 'zustand'

interface PaymentState {
  selectedMethod: string | null
  setSelectedMethod: (selectedMethod: string) => void
  amount: number | null
  setAmount: (selectedMethod: number) => void
}

export const usePaymentStore = create<PaymentState>((set) => ({
  selectedMethod: null,
  setSelectedMethod: (selectedMethod) => {
    set({ selectedMethod })
  },
  amount: null,
  setAmount: (amount) => {
    set({ amount })
  }
}))
