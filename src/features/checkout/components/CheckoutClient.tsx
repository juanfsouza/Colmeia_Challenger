'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/features/cart/context/CartContext'
import { useAuth } from '@/features/auth/context/AuthContext'
import { OrderSummary } from './OrderSummary'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { PaymentForm } from './PaymentForm'
import { PaymentStatusTracker, PaymentStatus } from './PaymentStatusTracker'
import { PaymentMethodType } from '@/types'
import { checkoutService } from '../services/checkoutService'
import toast from 'react-hot-toast'

export function CheckoutClient() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)

  // Redireciona se carrinho estiver vazio
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/products')
    }
  }, [cart.items.length, router])

  const handlePaymentSubmit = async (paymentData: any) => {
    if (!user || cart.items.length === 0) return

    try {
      setIsLoading(true)

      // Cria o pedido
      const order = await checkoutService.createOrder(
        user.id,
        cart.items,
        paymentData,
        cart.total
      )

      setCurrentOrder(order)
      setPaymentStatus('pending')
    } catch (error) {
      toast.error('Erro inesperado. Tente novamente.')
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = (status: PaymentStatus) => {
    setPaymentStatus(status)
    
    if (status === 'paid') {
      toast.success('Pagamento realizado com sucesso!')
      clearCart()
      setTimeout(() => {
        router.push(`/checkout/success?orderId=${currentOrder?.id}`)
      }, 2000)
    } else if (status === 'failed' || status === 'expired') {
      toast.error('Pagamento não foi processado. Tente novamente.')
    }
  }

  const handleRetry = () => {
    setCurrentOrder(null)
    setPaymentStatus(null)
    setSelectedMethod(null)
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Carrinho vazio
          </h2>
          <p className="text-muted-foreground mb-6">
            Adicione produtos ao carrinho para continuar
          </p>
          <button
            onClick={() => router.push('/products')}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    )
  }

  // Se há um pedido em andamento, mostra o tracker de status
  if (currentOrder && paymentStatus) {
    return (
      <div className="max-w-2xl mx-auto">
        <PaymentStatusTracker
          orderId={currentOrder.id}
          paymentMethod={currentOrder.paymentMethod.type}
          onStatusChange={handleStatusChange}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Coluna principal - Métodos de pagamento */}
      <div className="lg:col-span-2 space-y-6">
        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
        />
        
        <PaymentForm
          selectedMethod={selectedMethod}
          onSubmit={handlePaymentSubmit}
          isLoading={isLoading}
        />
      </div>

      {/* Sidebar - Resumo do pedido */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  )
}
