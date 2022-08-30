export class CreateInvoiceDto {
  AmountDue?: number
  BillingAddress?: string
  BillingAddressRecipient?: string
  CustomerAddress?: string
  CustomerAddressRecipient?: string
  CustomerId?: string
  CustomerName?: string
  DueDate?: Date
  InvoiceDate?: Date
  InvoiceId?: string
  InvoiceTotal?: number
  PreviousUnpaidBalance?: number
  PurchaseOrder?: string
  RemittanceAddress?: string
  RemittanceAddressRecipient?: string
  ServiceAddress?: string
  ServiceAddressRecipient?: string
  ServiceEndDate?: Date
  ServiceStartDate?: Date
  ShippingAddress?: string
  ShippingAddressRecipient?: string
  SubTotal?: number
  TotalTax?: number
  VendorAddress?: string
  VendorAddressRecipient?: string
  VendorName?: string
}
