export interface User {
  id: string
  name: string
  email: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  stock: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export type PaymentMethodType = 'pix' | 'credit_card' | 'boleto'

export interface PaymentMethod {
  type: PaymentMethodType
  data: PixData | CreditCardData | BoletoData
}

export interface PixData {
  key: string
}

export interface CreditCardData {
  number: string
  name: string
  expiry: string
  cvv: string
}

export interface BoletoData {
}

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'expired'

export interface Order {
  id: string
  user: User
  items: CartItem[]
  paymentMethod: PaymentMethod
  status: OrderStatus
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  orderId?: string
  qrCode?: string
  code?: string
  message?: string
  error?: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CheckoutFormData {
  paymentMethod: PaymentMethodType
  creditCard?: CreditCardData
  pix?: PixData
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  code: string
}

export * from './components'
export * from './contexts'
