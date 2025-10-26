import { Order, PaymentMethod, PaymentResult, CartItem, User } from '@/types'
import { delay, generateOrderId } from '@/lib/utils'

export class CheckoutService {
  // Processa o pagamento do pedido
  async processPayment(order: Order): Promise<PaymentResult> {
    await delay(2000) // Simula processamento
    
    // Simula diferentes cenários baseados no método de pagamento
    const failureRate = this.getFailureRate(order.paymentMethod.type)
    const shouldFail = Math.random() < failureRate
    
    if (shouldFail) {
      return {
        success: false,
        error: this.getRandomErrorMessage(order.paymentMethod.type)
      }
    }
    
    return {
      success: true,
      transactionId: generateOrderId(),
      orderId: order.id
    }
  }

  // Cria um pedido
  async createOrder(
    userId: string,
    items: CartItem[],
    paymentMethod: PaymentMethod,
    total: number
  ): Promise<Order> {
    await delay(1000) // Simula criação do pedido
    
    const order: Order = {
      id: generateOrderId(),
      user: { id: userId } as User,
      items,
      paymentMethod,
      status: 'pending',
      total,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    return order
  }



  // Simula geração de boleto
  async generateBoleto(orderId: string): Promise<{ boletoUrl: string; dueDate: string }> {
    await delay(1000)
    
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 3)
    
    return {
      boletoUrl: `https://boleto.example.com/${orderId}`,
      dueDate: dueDate.toLocaleDateString('pt-BR')
    }
  }

  // Taxa de falha por método de pagamento
  private getFailureRate(paymentType: string): number {
    const rates: Record<string, number> = {
      pix: 0.05,
      credit_card: 0.15,
      boleto: 0.02
    }
    return rates[paymentType] || 0.1
  }

  // Mensagens de erro aleatórias
  private getRandomErrorMessage(paymentType: string): string {
    const messages: Record<string, string[]> = {
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
    
    const paymentMessages = messages[paymentType] || ['Erro no processamento']
    
    if (!paymentMessages || paymentMessages.length === 0) {
      return 'Erro no processamento'
    }
    
    const randomIndex = Math.floor(Math.random() * paymentMessages.length)
    const selectedMessage = paymentMessages[randomIndex]
    
    if (!selectedMessage) {
      return 'Erro no processamento'
    }
    
    return selectedMessage
  }
}

export const checkoutService = new CheckoutService()
