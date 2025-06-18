export interface UserServerResponse {
  data: User
  statusCode: number
  message: string
}

export interface User {
  _id: string
  lastName: string
  isActive: boolean
  country: string
  city: string
  receiveEmails: boolean
  acceptedPolicies: any[]
  balanceAvailable: number
  plan: string
  testingFree: boolean
  accountMessage: string
  wallet: string
  firstName: string
  email: string
  password: string
  phone: string
  dialCode: string
  enterpriseName: string
  enterpriseLegalName: string
  legalRepresentative: string
  brandName: string
  documentType: string
  document: string
  createdAt: string
  updatedAt: string
  ordersCount: number
  merchants: Record<string, boolean>
  industryTarget: string
  employeesNumber: string
  internationalShipmentsEstimated: number
  nationalShipmentsEstimated: number
  onboardingViewed: boolean
}

export interface ChangePassword {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface RequestOTP {
  cellphone: string
}

export interface ResponseRequestcode {
  success: boolean
}

export interface VerifyOtp {
  code: string
}

export interface Flag {
  name: string
  code: string
  emoji: string
  dial_code: string
  flag: string
}
