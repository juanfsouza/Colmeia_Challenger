import { delay, shouldSimulateFailure, generateId, generateOrderId } from '@/lib/utils'
import { 
  mockUsers, 
  mockPasswords, 
  paymentFailureRates, 
  paymentProcessingTimes 
} from '../mockAuthData'
import { 
  User, 
  Product, 
  Order, 
  OrderStatus, 
  PaymentMethodType, 
  CartItem,
  PaymentMethod 
} from '@/types'

// Simulador de autenticação
export class AuthSimulator {
  async login(email: string, password: string): Promise<User> {
    await delay(1000)
    
    const user = mockUsers.find(u => u.email === email)
    const correctPassword = mockPasswords[email]
    
    if (!user || password !== correctPassword) {
      throw new Error('Email ou senha inválidos')
    }
    
    return user
  }
  
  async register(name: string, email: string, password: string): Promise<User> {
    await delay(1500)
    
    // Verifica se email já existe
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      throw new Error('Email já cadastrado')
    }
    
    // Cria novo usuário
    const newUser: User = {
      id: generateId(),
      name,
      email,
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Brasil'
      }
    }
    
    // Adiciona às listas mockadas
    mockUsers.push(newUser)
    mockPasswords[email] = password
    
    return newUser
  }
  
  async getCurrentUser(): Promise<User | null> {
    await delay(500)
    
    // Em uma aplicação real, isso viria do token/sessão
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    
    return null
  }
}

// Simulador de pagamento
export class PaymentSimulator {
  async processPayment(order: Order): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    const processingTime = paymentProcessingTimes[order.paymentMethod.type]
    const delayTime = Math.random() * (processingTime.max - processingTime.min) + processingTime.min
    
    await delay(delayTime * 1000)
    
    // Simula falha baseada na taxa de falha do método
    const failureRate = paymentFailureRates[order.paymentMethod.type]
    if (Math.random() < failureRate) {
      return {
        success: false,
        error: this.getRandomErrorMessage(order.paymentMethod.type)
      }
    }
    
    return {
      success: true,
      transactionId: generateId()
    }
  }
  
  private getRandomErrorMessage(paymentType: PaymentMethodType): string {
    const errorMessages = {
      pix: [
        'Chave PIX inválida',
        'Conta bloqueada',
        'Limite diário excedido'
      ],
      credit_card: [
        'Cartão expirado',
        'Saldo insuficiente',
        'Transação negada pelo banco',
        'CVV inválido'
      ],
      boleto: [
        'Dados do boleto inválidos',
        'Banco indisponível'
      ]
    }
    
    const messages = errorMessages[paymentType]
    return messages[Math.floor(Math.random() * messages.length)]
  }
}

// Simulador de pedidos
export class OrderSimulator {
  private orders: Order[] = []
  
  async createOrder(user: User, items: CartItem[], paymentMethod: PaymentMethod): Promise<Order> {
    await delay(1000)
    
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    
    const order: Order = {
      id: generateOrderId(),
      user,
      items,
      paymentMethod,
      status: 'pending',
      total,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.orders.push(order)
    return order
  }
  
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    await delay(500)
    
    const order = this.orders.find(o => o.id === orderId)
    if (order) {
      order.status = status
      order.updatedAt = new Date()
    }
    
    return order || null
  }
  
  async getOrder(orderId: string): Promise<Order | null> {
    await delay(500)
    
    return this.orders.find(o => o.id === orderId) || null
  }
  
  async getOrdersByUser(userId: string): Promise<Order[]> {
    await delay(800)
    
    return this.orders.filter(o => o.user.id === userId)
  }
}

// Instâncias dos simuladores
export const authSimulator = new AuthSimulator()
export const paymentSimulator = new PaymentSimulator()
export const orderSimulator = new OrderSimulator()
