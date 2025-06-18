export type PaymentForm = {
  bank: string
  value: string
  docType: string
  docNumber: string
  name: string
  lastName: string
  email: string
  cellPhone: string
  ip: string
}

export type TransactionRequest = {
  success: boolean
  titleResponse: string
  textResponse: string
  lastAction: string
  data: {
    ref_payco: number
    factura: string
    descripcion: string
    valor: number
    iva: number
    ico: number
    baseiva: number
    moneda: string
    estado: string
    respuesta: string
    cod_respuesta: number
    cod_error: any
    autorizacion: string
    ciudad: string
    recibo: string
    fecha: string
    urlbanco: string
    transactionID: string
    ticketId: string
    extras: {
      extra1: string
      extra2: string
      extra3: string
      extra4: string
      extra5: string
      extra6: string
      extra7: string
      extra8: string
      extra9: string
      extra10: string
    }
    ciclo: string
  }
}

export type Data = {
  user: string
  transactionStatus: string
  transactionId: string
  transactionRequest: TransactionRequest
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type PaymentURLResponse = {
  data: Data
  status: number
}
