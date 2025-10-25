
export const UI_CONSTANTS = {
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 'md',
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  Z_INDEX: {
    HEADER: 50,
    MOBILE_MENU: 40,
    MODAL: 60,
    TOAST: 70,
  },
} as const

export const BUSINESS_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_CART_ITEMS: 99,
  FREE_SHIPPING_THRESHOLD: 100,
  TAX_RATE: 0.1,
  CURRENCY_SYMBOL: 'R$',
} as const

export const API_CONSTANTS = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
} as const

export const STORAGE_KEYS = {
  USER: 'comeia_user',
  CART: 'comeia_cart',
  THEME: 'comeia_theme',
  LANGUAGE: 'comeia_language',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
} as const

export const PRODUCT_CATEGORIES = {
  MEL_SABORES: 'Mel de Sabores',
  MEL_PURO: 'Mel Puro',
  PRODUTOS_APICOLAS: 'Produtos Apícolas',
} as const

export const PAYMENT_METHODS = {
  PIX: 'pix',
  CREDIT_CARD: 'credit_card',
  BOLETO: 'boleto',
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PAID: 'paid',
  FAILED: 'failed',
  EXPIRED: 'expired',
} as const
