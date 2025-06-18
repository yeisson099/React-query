export type Credentials = {
  email: string
  password: string
}

export type Token = {
  token: string
  webhookStatus: string
}

export interface JwtPayload {
  _id: string
  firstName: string
  lastName: string
  isActive: boolean
  apiCredentialId: string
  iat: number
  exp: number
}
