import { Order, PaymentMethod, PaymentResult, OrderStatus, CartItem, User, PixData } from '@/types'
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

  // Atualiza status do pedido
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    await delay(500)
    
    // Em uma aplicação real, isso seria uma chamada para a API
    return null
  }

  // Simula geração de PIX
  async generatePix(paymentData: PixData): Promise<{ qrCode: string; code: string }> {
    await delay(1500)
    
    return {
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      code: '00020126580014br.gov.bcb.pix0136a1f4e2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5f520400005303986540510.005802BR5913COMERCIO TESTE6008BRASILIA62070503***6304'
    }
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
    return paymentMessages[Math.floor(Math.random() * paymentMessages.length)]
  }
}

export const checkoutService = new CheckoutService()
