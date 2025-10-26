'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ExpiredResultClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const paymentMethod = searchParams.get('paymentMethod') || 'pix'

  console.log('EXPIRED PAGE - orderId:', orderId, 'paymentMethod:', paymentMethod)

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX'
      case 'credit_card': return 'Cartão de Crédito'
      case 'boleto': return 'Boleto Bancário'
      default: return method
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700"
      >
        {/* Ícone de status */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-orange-100 mb-6"
        >
          <Clock className="h-10 w-10 text-orange-600" />
        </motion.div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Pagamento Expirado
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
          O tempo limite para pagamento foi excedido
        </p>

        {/* Descrição */}
        <p className="text-md text-gray-600 dark:text-gray-400 mb-8 max-w-prose mx-auto">
          O prazo para realizar o pagamento expirou. Você pode tentar novamente ou escolher outro método de pagamento.
        </p>

        {/* Informações do pedido */}
        {orderId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left border border-gray-200 dark:border-gray-600"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detalhes do Pedido
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Número do Pedido:</span>{' '}
                <span className="font-mono">{orderId}</span>
              </p>
              <p>
                <span className="font-medium">Método de Pagamento:</span>{' '}
                {getPaymentMethodName(paymentMethod)}
              </p>
              <p>
                <span className="font-medium">Data:</span>{' '}
                {new Date().toLocaleDateString('pt-BR')}
              </p>
              <p>
                <span className="font-medium">Hora:</span>{' '}
                {new Date().toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/checkout')}
            className="px-8 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Tentar Novamente
          </Button>
          
          <Button
            onClick={() => router.push('/products')}
            variant="outline"
            className="px-8 py-3 rounded-md border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar aos Produtos
          </Button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Em caso de dúvidas, entre em contato conosco através do email{' '}
            <a href="mailto:suporte@comeiastore.com" className="text-indigo-600 hover:underline">
              suporte@comeiastore.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
