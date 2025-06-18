import { type Order } from '@models/orders.type'
import { create } from 'zustand'

interface OrderState {
  order: Order | null
  setOrder: (order: Order) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  setOrder: (order) => {
    set({ order })
  }
}))
