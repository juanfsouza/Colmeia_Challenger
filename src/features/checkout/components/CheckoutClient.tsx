'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/features/cart/context/CartContext'
import { useAuth } from '@/features/auth/context/AuthContext'
import { OrderSummary } from './OrderSummary'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { PaymentForm } from './PaymentForm'
import { PaymentMethodType } from '@/types'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CheckoutClient() {
  const { items } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null)
  const [testStatus, setTestStatus] = useState<'paid' | 'failed' | 'expired' | null>(null)

  // Redireciona se carrinho estiver vazio
  useEffect(() => {
    if ((items || []).length === 0) {
      router.push('/products')
    }
  }, [items, router])

  const handlePaymentSubmit = async () => {
    if (!user || (items || []).length === 0) return

    // Validação: deve ter um teste selecionado para processar pagamento
    if (!testStatus) {
      toast.error('Selecione um modo de teste para continuar com o pagamento')
      return
    }

    // Em modo de teste, redireciona diretamente sem criar pedido
    const orderId = `TEST-${Date.now()}`
    const paymentMethod = selectedMethod || 'pix'
    
    console.log('Redirecting to:', `/checkout/result/${testStatus}?orderId=${orderId}&paymentMethod=${paymentMethod}`)
    console.log('testStatus:', testStatus)
    
    router.push(`/checkout/result/${testStatus}?orderId=${orderId}&paymentMethod=${paymentMethod}`)
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


  return (
    <>
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
              onSelectMethod={setSelectedMethod}
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
              isLoading={false}
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

      {/* Seção de Teste - Apenas em desenvolvimento */}
      <motion.div
        className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Selecione uma opção para simular o resultado do pagamento:</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              testStatus === 'paid' 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => setTestStatus(testStatus === 'paid' ? null : 'paid')}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={testStatus === 'paid'}
                onChange={() => setTestStatus(testStatus === 'paid' ? null : 'paid')}
                className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">Pagamento Aprovado</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              testStatus === 'failed' 
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => setTestStatus(testStatus === 'failed' ? null : 'failed')}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={testStatus === 'failed'}
                onChange={() => setTestStatus(testStatus === 'failed' ? null : 'failed')}
                className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-gray-900 dark:text-white">Pagamento Falhou</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              testStatus === 'expired' 
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => setTestStatus(testStatus === 'expired' ? null : 'expired')}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={testStatus === 'expired'}
                onChange={() => setTestStatus(testStatus === 'expired' ? null : 'expired')}
                className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900 dark:text-white">Pagamento Expirado</span>
              </div>
            </div>
          </div>
        </div>

        {testStatus && (
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-orange-800 dark:text-blue-200 text-center">
              <strong>Modo de teste ativo:</strong> Ao confirmar o pagamento, você será redirecionado para a tela de "{testStatus === 'paid' ? 'Pagamento Aprovado' : testStatus === 'failed' ? 'Pagamento Falhou' : 'Pagamento Expirado'}"
            </p>
          </div>
        )}

        {!testStatus && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-200 text-center">
              <strong>⚠️ Atenção:</strong> Você deve selecionar uma opção de teste para poder processar o pagamento
            </p>
          </div>
        )}
      </motion.div>
    </>
  )
}
