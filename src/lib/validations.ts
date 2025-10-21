import { z } from 'zod'

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
})

// Schema para registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
})

// Schema para cartão de crédito
export const creditCardSchema = z.object({
  number: z
    .string()
    .min(1, 'Número do cartão é obrigatório')
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Número do cartão inválido'),
  name: z
    .string()
    .min(1, 'Nome no cartão é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  expiry: z
    .string()
    .min(1, 'Data de validade é obrigatória')
    .regex(/^\d{2}\/\d{2}$/, 'Data de validade inválida (MM/AA)'),
  cvv: z
    .string()
    .min(1, 'CVV é obrigatório')
    .regex(/^\d{3,4}$/, 'CVV inválido')
})

// Schema para PIX
export const pixSchema = z.object({
  key: z
    .string()
    .min(1, 'Chave PIX é obrigatória')
    .min(5, 'Chave PIX deve ter pelo menos 5 caracteres')
})

// Schema para checkout
export const checkoutSchema = z.object({
  paymentMethod: z.enum(['pix', 'credit_card', 'boleto'], {
    required_error: 'Método de pagamento é obrigatório'
  }),
  creditCard: creditCardSchema.optional(),
  pix: pixSchema.optional()
}).refine((data) => {
  if (data.paymentMethod === 'credit_card' && !data.creditCard) {
    return false
  }
  if (data.paymentMethod === 'pix' && !data.pix) {
    return false
  }
  return true
}, {
  message: 'Dados do método de pagamento são obrigatórios',
  path: ['paymentMethod']
})

// Tipos inferidos dos schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type CreditCardFormData = z.infer<typeof creditCardSchema>
export type PixFormData = z.infer<typeof pixSchema>
export type CheckoutFormData = z.infer<typeof checkoutSchema>

// Utilitários para formatação de cartão
export function formatCreditCardNumber(value: string): string {
  const cleanValue = value.replace(/\D/g, '')
  const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ')
  return formatted.slice(0, 19) // 16 dígitos + 3 espaços
}

export function formatExpiryDate(value: string): string {
  const cleanValue = value.replace(/\D/g, '')
  const formatted = cleanValue.replace(/(\d{2})(?=\d)/g, '$1/')
  return formatted.slice(0, 5) // MM/AA
}
