export const convertCamelCase = (item: Record<string, any>): Record<string, any> => {
  const newMap: Record<string, any> = {}
  Object.keys(item).forEach((key: string) => {
    const keySplit = key.split('')
    keySplit[0] = keySplit[0].toLowerCase()
    const newKey: string = keySplit.join('')
    newMap[newKey] = item[key]
  })
  return newMap
}

export const currentFormat = (value: number): string => {
  if (!value) return '0'
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(value)
}

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phoneNumber
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)

  return formattedDate
}
