'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/features/cart/context/CartContext'
import { useAuth } from '@/features/auth/context/AuthContext'
import { OrderSummary } from './OrderSummary'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { PaymentForm } from './PaymentForm'
import { PaymentStatusTracker, PaymentStatus } from './PaymentStatusTracker'
import { PaymentMethodType, Order, PixData, CreditCardData, BoletoData, PaymentMethod } from '@/types'
import { checkoutService } from '../services/checkoutService'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CheckoutClient() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)

  // Redireciona se carrinho estiver vazio
  useEffect(() => {
    if ((items || []).length === 0) {
      router.push('/products')
    }
  }, [items, router])

  const handlePaymentSubmit = async (paymentData: { type: 'pix' | 'credit_card' | 'boleto'; data: PixData | CreditCardData | BoletoData }) => {
    if (!user || (items || []).length === 0) return

    try {
      setIsLoading(true)

      // Converte paymentData para PaymentMethod
      const paymentMethod: PaymentMethod = {
        type: paymentData.type,
        data: paymentData.data
      }

      // Cria o pedido
      const order = await checkoutService.createOrder(
        user.id,
        items || [],
        paymentMethod,
        total || 0
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

  if ((items || []).length === 0) {
    return (
      <motion.div 
        className="flex items-center justify-center py-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-orange-200">
            <ShoppingBag className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
            Carrinho Vazio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg font-light">
            Adicione produtos ao carrinho para continuar com a compra
          </p>
          <Button
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 text-lg font-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continuar Comprando
          </Button>
        </div>
      </motion.div>
    )
  }

  // Se há um pedido em andamento, mostra o tracker de status
  if (currentOrder && paymentStatus) {
    return (
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PaymentStatusTracker
          orderId={currentOrder.id}
          paymentMethod={currentOrder.paymentMethod.type}
          onStatusChange={handleStatusChange}
          onRetry={handleRetry}
        />
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Coluna principal - Métodos de pagamento */}
      <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onMethodChange={setSelectedMethod}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PaymentForm
            selectedMethod={selectedMethod}
            onSubmit={handlePaymentSubmit}
            isLoading={isLoading}
          />
        </motion.div>
      </div>

      {/* Sidebar - Resumo do pedido */}
      <motion.div 
        className="lg:col-span-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <OrderSummary />
      </motion.div>
    </motion.div>
  )
}
