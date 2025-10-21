import { Product, User, PaymentMethodType } from '@/types'

// Produtos mockados
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S24',
    price: 2999.99,
    description: 'Smartphone com tela de 6.2", 128GB, 8GB RAM, câmera tripla de 50MP',
    image: '/images/samsung-s24.jpg',
    category: 'Smartphones',
    stock: 15
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron 15',
    price: 2499.99,
    description: 'Notebook com Intel i5, 8GB RAM, 256GB SSD, tela 15.6" Full HD',
    image: '/images/dell-inspiron.jpg',
    category: 'Notebooks',
    stock: 8
  },
  {
    id: '3',
    name: 'Fone de Ouvido Sony WH-1000XM4',
    price: 899.99,
    description: 'Fone de ouvido com cancelamento de ruído ativo, 30h de bateria',
    image: '/images/sony-wh1000xm4.jpg',
    category: 'Áudio',
    stock: 12
  },
  {
    id: '4',
    name: 'Smartwatch Apple Watch Series 9',
    price: 1899.99,
    description: 'Smartwatch com GPS, monitoramento de saúde, resistente à água',
    image: '/images/apple-watch-9.jpg',
    category: 'Wearables',
    stock: 6
  },
  {
    id: '5',
    name: 'Tablet iPad Air 5ª Geração',
    price: 3299.99,
    description: 'Tablet com chip M1, 64GB, tela 10.9", suporte ao Apple Pencil',
    image: '/images/ipad-air.jpg',
    category: 'Tablets',
    stock: 4
  },
  {
    id: '6',
    name: 'Monitor LG UltraWide 29"',
    price: 1299.99,
    description: 'Monitor 21:9, Full HD, 75Hz, USB-C, ideal para produtividade',
    image: '/images/lg-ultrawide.jpg',
    category: 'Monitores',
    stock: 10
  }
]

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
    id: '2',
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

// Senhas mockadas (em produção, isso seria hash)
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

// Tempos de processamento simulados (em segundos)
export const paymentProcessingTimes: Record<PaymentMethodType, { min: number; max: number }> = {
  pix: { min: 1, max: 3 },
  credit_card: { min: 2, max: 5 },
  boleto: { min: 1, max: 2 }
}
