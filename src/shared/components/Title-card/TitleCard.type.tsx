export type TitleCardProps = {
  title: string
  handleOpenModal?: () => void
  buttonName?: string
  validations?: ValidationProp
}

export type ValidationProp = {
  label: string
  type: string
  postal_code: {
    label: string
    color: string
  }
  city: {
    label: string
    color: string
  }
  state: {
    label: string
    color: string
  }
}
