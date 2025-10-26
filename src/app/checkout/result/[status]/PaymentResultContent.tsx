'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, ArrowLeft, RotateCcw, Home, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { PaymentResultContentProps } from '@/types/components'

export function PaymentResultContent({ status }: PaymentResultContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const paymentMethod = searchParams.get('paymentMethod') || 'pix'

  // Debug: vamos ver o que está chegando
  console.log('PaymentResultContent status:', status)
  console.log('PaymentResultContent orderId:', orderId)
  console.log('PaymentResultContent paymentMethod:', paymentMethod)

  const getStatusConfig = () => {
    switch (status) {
      case 'paid':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          title: 'Pagamento Aprovado!',
          subtitle: 'Seu pedido foi processado com sucesso',
          description: 'Obrigado por sua compra. Você receberá um email de confirmação em breve e seu pedido será enviado.',
          primaryButton: {
            text: 'Continuar Comprando',
            action: () => router.push('/products'),
            icon: ShoppingBag,
            variant: 'default' as const
          },
          secondaryButton: {
            text: 'Ver Pedidos',
            action: () => router.push('/orders'),
            icon: Home,
            variant: 'outline' as const
          }
        }
      case 'failed':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100',
          title: 'Pagamento Falhou',
          subtitle: 'Não foi possível processar seu pagamento',
          description: 'Ocorreu um problema durante o processamento. Verifique os dados informados e tente novamente.',
          primaryButton: {
            text: 'Tentar Novamente',
            action: () => router.push('/checkout'),
            icon: RotateCcw,
            variant: 'default' as const
          },
          secondaryButton: {
            text: 'Voltar aos Produtos',
            action: () => router.push('/products'),
            icon: ArrowLeft,
            variant: 'outline' as const
          }
        }
      case 'expired':
        return {
          icon: Clock,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          title: 'Pagamento Expirado',
          subtitle: 'O tempo limite para pagamento foi excedido',
          description: 'O prazo para realizar o pagamento expirou. Você pode tentar novamente ou escolher outro método de pagamento.',
          primaryButton: {
            text: 'Tentar Novamente',
            action: () => router.push('/checkout'),
            icon: RotateCcw,
            variant: 'default' as const
          },
          secondaryButton: {
            text: 'Voltar aos Produtos',
            action: () => router.push('/products'),
            icon: ArrowLeft,
            variant: 'outline' as const
          }
        }
      default:
        // Fallback para status inválido
        return {
          icon: XCircle,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-100',
          title: 'Status Desconhecido',
          subtitle: 'Não foi possível determinar o status do pagamento',
          description: 'Ocorreu um erro inesperado. Entre em contato conosco para mais informações.',
          primaryButton: {
            text: 'Voltar ao Checkout',
            action: () => router.push('/checkout'),
            icon: ArrowLeft,
            variant: 'default' as const
          },
          secondaryButton: {
            text: 'Voltar aos Produtos',
            action: () => router.push('/products'),
            icon: ArrowLeft,
            variant: 'outline' as const
          }
        }
    }
  }

  const config = getStatusConfig()
  const IconComponent = config.icon

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX'
      case 'credit_card': return 'Cartão de Crédito'
      case 'boleto': return 'Boleto Bancário'
      default: return 'PIX'
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Ícone de Status */}
        <motion.div
          className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full ${config.bgColor} mb-8`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <IconComponent className={`h-10 w-10 ${config.iconColor}`} />
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {config.title}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {config.subtitle}
        </motion.p>

        {/* Descrição */}
        <motion.p
          className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {config.description}
        </motion.p>

        {/* Informações do Pedido */}
        {orderId && (
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-12 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Pedido
            </h2>
            <div className="text-left space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Número do Pedido:</span> {orderId}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Método de Pagamento:</span> {getPaymentMethodName(paymentMethod)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  status === 'paid' ? 'bg-green-100 text-green-800' :
                  status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {status === 'paid' ? 'Pago' : status === 'failed' ? 'Falhou' : 'Expirado'}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Data:</span>{' '}
                {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Botões de Ação */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            onClick={config.primaryButton.action}
            className={`px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              config.primaryButton.variant === 'default' 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
            }`}
          >
            <config.primaryButton.icon className="w-5 h-5 mr-2" />
            {config.primaryButton.text}
          </Button>
          
          <Button
            onClick={config.secondaryButton.action}
            variant={config.secondaryButton.variant}
            className="px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <config.secondaryButton.icon className="w-5 h-5 mr-2" />
            {config.secondaryButton.text}
          </Button>
        </motion.div>

        {/* Informações Adicionais */}
        <motion.div
          className="mt-16 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>
            Em caso de dúvidas, entre em contato conosco através do email{' '}
            <a href="mailto:suporte@comeiastore.com" className="text-orange-600 hover:underline">
              suporte@comeiastore.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
