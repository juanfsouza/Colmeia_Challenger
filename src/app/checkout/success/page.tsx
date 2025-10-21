'use client'

import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { useRouter } from 'next/navigation'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Ícone de sucesso */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pedido Realizado com Sucesso!
            </h1>

            {/* Mensagem */}
            <p className="text-lg text-gray-600 mb-8">
              Obrigado por sua compra. Seu pedido foi processado e você receberá
              um email de confirmação em breve.
            </p>

            {/* Informações do pedido */}
            {orderId && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Informações do Pedido
                </h2>
                <div className="text-left">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Número do Pedido:</span> {orderId}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Status:</span> Processando
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Data:</span>{' '}
                    {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/products')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Continuar Comprando
              </button>
              
              <button
                onClick={() => window.print()}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors"
              >
                Imprimir Comprovante
              </button>
            </div>

            {/* Informações adicionais */}
            <div className="mt-12 text-sm text-gray-500">
              <p>
                Em caso de dúvidas, entre em contato conosco através do email{' '}
                <a href="mailto:suporte@comeiastore.com" className="text-indigo-600 hover:underline">
                  suporte@comeiastore.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
