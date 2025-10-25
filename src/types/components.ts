import { PixData, CreditCardData, BoletoData } from './index'

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface ProtectedRouteProps {
  children: React.ReactNode
}

export interface CartProviderProps {
  children: React.ReactNode
}

export interface CartItemProps {
  item: {
    product: {
      id: string
      name: string
      price: number
      image: string
    }
    quantity: number
  }
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    description: string
    image: string
    category: string
    stock: number
  }
}

export interface ProductsSliderProps {
  products: Array<{
    id: string
    name: string
    price: number
    description: string
    image: string
    category: string
    stock: number
  }>
  onAddToCart: (product: {
    id: string
    name: string
    price: number
    description: string
    image: string
    category: string
    stock: number
  }) => void
  title?: string
  subtitle?: string
}

export interface PaymentFormProps {
  selectedMethod: 'pix' | 'credit_card' | 'boleto' | null
  onSubmit: (data: { type: 'pix' | 'credit_card' | 'boleto'; data: PixData | CreditCardData | BoletoData }) => void
  isLoading: boolean
}

export interface PaymentMethodSelectorProps {
  selectedMethod: 'pix' | 'credit_card' | 'boleto' | null
  onSelectMethod: (method: 'pix' | 'credit_card' | 'boleto') => void
}

export interface PaymentStatusTrackerProps {
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'expired'
  orderId?: string
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
