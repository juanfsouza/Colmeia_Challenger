import { Metadata } from 'next'
import { Suspense } from 'react'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { PaidResultClient } from './PaidResultClient'

export const metadata: Metadata = {
  title: 'Pagamento Aprovado - Comeia Store',
  description: 'Seu pagamento foi processado com sucesso! Obrigado por sua compra.',
  robots: 'noindex, nofollow',
}

export default function PaidPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-200 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-8"></div>
                <div className="h-32 bg-gray-200 rounded mb-8"></div>
                <div className="flex gap-4 justify-center">
                  <div className="h-12 w-40 bg-gray-200 rounded"></div>
                  <div className="h-12 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <PaidResultClient />
        </Suspense>
      </div>
    </ProtectedRoute>
  )
}
