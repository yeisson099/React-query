import * as Yup from 'yup'

export const PaymentFormSchema = Yup.object().shape({
  value: Yup.string()
    .test('positive', 'El monto debe ser mayor que 0', (value) => {
      if (!value) return false
      return parseFloat(value) > 0
    })
    .test('non-negative', 'El monto no puede ser negativo', (value) => {
      if (!value) return false
      return parseFloat(value) >= 0
    })
    .required('Ingrese un monto'),
  bank: Yup.string().required('Seleccione una entidad bancaria'),
  name: Yup.string().required('Ingrese el nombre del titular'),
  lastName: Yup.string().required('Ingrese el apellido del titular'),
  docType: Yup.string().required('Seleccione el tipo de cliente'),
  docNumber: Yup.string().required('Ingrese el número de documento'),
  cellPhone: Yup.string().required('Ingrese el número de teléfono'),
  email: Yup.string()
    .email('Ingrese un correo electrónico válido')
    .required('Ingrese el correo electrónico')
})
