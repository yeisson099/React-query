import { type DueDiligence } from '@models/orders.type'

export const checkCompletedDueDiligence = (
  dueDiligence: DueDiligence
): boolean => {
  const { export_declaration_required, ...rest } = dueDiligence

  const keys = Object.keys(rest) as Array<keyof typeof rest>

  for (const key of keys) {
    if (
      !export_declaration_required &&
      key === 'export_declaration_completed'
    ) {
      continue
    }
    if (!dueDiligence[key]) {
      return false
    }
  }
  return true
}
