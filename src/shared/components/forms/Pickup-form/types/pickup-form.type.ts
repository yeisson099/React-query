export type PickupProps = {
  id: string
  closeModal: () => void
}

export enum PICKUP_TYPE {
  SELF_PICKUP = 'SELF_PICKUP',
  AUTOMATIC_PICKUP = 'AUTOMATIC_PICKUP',
}
