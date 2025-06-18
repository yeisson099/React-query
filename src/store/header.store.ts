import { create } from 'zustand'

type HeaderType = 'normal' | 'payment'

interface PaymentState {
  headerType: HeaderType
  setHeaderType: (headerType: HeaderType) => void
}

export const useHeaderStore = create<PaymentState>((set) => ({
  headerType: 'normal',
  setHeaderType: (headerType) => {
    set({ headerType })
  }
}))
