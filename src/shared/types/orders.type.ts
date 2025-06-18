import { type IPageParams } from './base-service.type'

export enum COURIERS {
  COORDINADORA = 'COORDINADORA',
  FEDEX = 'FEDEX',
  DHL = 'DHL',
}

export type ICOURIERS = `${COURIERS}`

export enum ORDER_STATUS {
  DRAFT = 'DRAFT',
  ACEPTED = 'ACEPTED',
  SCHEDULED = 'SCHEDULED',
}

export enum ORDER_TYPE {
  SHOPIFY = 'SHOPIFY',
  SHIPAL = 'SHIPAL',
}

export type CreateLabelError = {
  status?: number
  listErrors?: any
}

export type ParamGetUserOrders = {
  page: number
  size: number
  draftOrders?: boolean
}

export type TableParams = {
  service: string
  key: string
  isDraftOrder: boolean
} & IPageParams

export interface LocationValidation {
  city: {
    label: string
    color: string
  }
  postal_code: {
    label: string
    color: string
  }
  state: {
    label: string
    color: string
  }
  label: string
  type: string
}

export interface ShipperConsignee {
  address_line: string
  document_number: string
  city: string
  country_name: string
  country_code: string
  company_name: string
  postal_code: string
  dane_code: string
  state: string
  email: string
  person_name: string
  phone_number: string
  location_validation: LocationValidation
}

export interface ShopifyShippingAddress {
  province: string
  country: string
  company: unknown
  country_code: string
  province_code: string
  city: string
  first_name: string
  last_name: string
  address1: string
  address2: string
  phone: string
  zip: string
  name: string
}

export interface Shipal {
  currency: string
  company_name: string
  insurance: boolean
  need_insurance_carrier_mark: string
  insurance_value: number
  selected_carrier: ICOURIERS
  shipal_account: string
  declared_currency: string
}

export interface PickUpInfo {
  date: string
  time: string
  closeTime: string
  type: string
}

export interface ExportDeclaration {
  export_reason: string
  export_reason_code: string
  inter_consignee: string
  invoice_date: string
  invoice_number: string
  invoice_total_gross_weight: number
  invoice_total_net_weight: number
  shipment_purpose: string
  signature_name: string
}

export interface PackageInformation {
  depth: number
  height: number
  package_type: string
  payable_weight: string
}

export interface DueDiligence {
  consignee_completed: boolean
  shipper_completed: boolean
  carrier_selected: boolean
  minimum_items_filled: boolean
  export_declaration_required: boolean
  export_declaration_completed: boolean
  declared_value_filled: boolean
}

export interface Order {
  _id: string
  shopify_order_number: number
  invoice_code: string
  invoice_number: number
  shopify_order_id: number
  airway_bill_number: string
  trm_used: string
  error_condition_data: string
  error_condition_code: string
  label_image_id: string
  shipment_date: string
  shipment_value: number
  declared_value: number
  shopify_declared_value: number
  shopify_declared_currency: string
  total_payment: number
  payable_weight: number
  shipper_account: string
  is_international_shippment: boolean
  contents: string
  package_type: string
  order_status: string
  carrier_response_status: string
  order_type: string
  due_diligence: DueDiligence
  shipper: ShipperConsignee
  consignee: ShipperConsignee
  shopify_shipping_address: ShopifyShippingAddress
  shipal: Shipal
  pick_up_info: PickUpInfo
  export_declaration: ExportDeclaration
  package_information: PackageInformation[]
  createdAt: string
  updatedAt: string
}
