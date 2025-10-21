import { User, PaymentMethodType } from '@/types'

// Usuários mockados para autenticação
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    }
  },
  {
    id: 'Madrid',
    name: 'Maria Santos',
    email: 'maria@email.com',
    address: {
      street: 'Av. Paulista, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      country: 'Brasil'
    }
  }
]

// Senhas mockadas
export const mockPasswords: Record<string, string> = {
  'joao@email.com': '123456',
  'maria@email.com': 'senha123'
}

// Métodos de pagamento disponíveis
export const paymentMethods: { type: PaymentMethodType; name: string; description: string }[] = [
  {
    type: 'pix',
    name: 'PIX',
    description: 'Pagamento instantâneo via PIX'
  },
  {
    type: 'credit_card',
    name: 'Cartão de Crédito',
    description: 'Visa, Mastercard, Elo'
  },
  {
    type: 'boleto',
    name: 'Boleto Bancário',
    description: 'Vencimento em 3 dias úteis'
  }
]

// Simulação de falhas para diferentes métodos
export const paymentFailureRates: Record<PaymentMethodType, number> = {
  pix: 0.05, // 5% de falha
  credit_card: 0.15, // 15% de falha
  boleto: 0.02 // 2% de falha
}

// Tempos de processamento simulado
export const paymentProcessingTimes: Record<PaymentMethodType, { min: number; max: number }> = {
  pix: { min: 1, max: 3 },
  credit_card: { min: 2, max: 5 },
  boleto: { min: 1, max: 2 }
}
