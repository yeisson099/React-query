import { type User } from '@models/user.type'

export interface HeaderProps {
  userData: User | undefined
  onDimensionsSetted: ({
    width,
    height
  }: {
    width: number
    height: number
  }) => void
}

export type SideBarProps = {
  width: number
  height: number
} | null
