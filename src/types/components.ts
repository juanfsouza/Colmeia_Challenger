import { PaymentStatus } from '@/features/checkout/components/PaymentStatusTracker'
import { Product, PixData, CreditCardData, BoletoData, PaymentMethodType } from './index'

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export interface CartProviderProps {
  children: React.ReactNode
}

export interface CartItemProps {
  item: {
    product: Pick<Product, 'id' | 'name' | 'price' | 'image'>
    quantity: number
  }
}

export interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export interface ProductCardProps {
  product: Product
}

export interface ProductsSliderProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  title?: string
  subtitle?: string
}

export interface PaymentFormProps {
  selectedMethod: PaymentMethodType | null
  onSubmit: (data: { type: PaymentMethodType; data: PixData | CreditCardData | BoletoData }) => void
  isLoading: boolean
}

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null
  onSelectMethod: (method: PaymentMethodType) => void
}

export interface PaymentStatusTrackerProps {
  orderId: string
  paymentMethod: PaymentMethodType
  onStatusChange: (status: PaymentStatus) => void
  onRetry: () => void
}

export interface PaymentResultPageProps {
  params: Promise<{
    status: 'paid' | 'failed' | 'expired'
  }>
}

export interface PaymentResultContentProps {
  status: 'paid' | 'failed' | 'expired'
}

export interface CurvedLoopProps {
  marqueeText: string
  speed?: number
  curveAmount?: number
  direction?: 'left' | 'right'
  className?: string
  interactive?: boolean
}

export interface WaveSeparatorProps {
  className?: string
  fillColor?: string
  height?: number
}

export interface TextAnimateProps {
  children: React.ReactNode
  className?: string
  by?: 'word' | 'character'
  animation?: 'slideUp' | 'fadeIn' | 'slideLeft' | 'slideRight'
  delay?: number
  duration?: number
}

export interface StatusStep {
  id: PaymentStatus
  label: string
  description: string
  icon: string
}
