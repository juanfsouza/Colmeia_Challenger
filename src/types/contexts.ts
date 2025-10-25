import { User, CartItem, Product } from './index'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: { email: string; password: string }) => Promise<void>
  register: (data: { name: string; email: string; password: string; confirmPassword: string }) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
}

export interface CartContextType {
  items: CartItem[]
  total: number
  isLoading: boolean
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
}
