import { Metadata } from 'next'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { CheckoutPageClient } from './CheckoutPageClient'

export const metadata: Metadata = {
  title: 'Checkout - Comeia Store',
  description: 'Finalize sua compra de forma segura e rápida. Pagamento instantâneo com garantia total.',
  keywords: ['checkout', 'pagamento', 'compra', 'seguro', 'garantia'],
  openGraph: {
    title: 'Checkout - Comeia Store',
    description: 'Finalize sua compra de forma segura e rápida.',
    type: 'website',
  },
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutPageClient />
    </ProtectedRoute>
  )
}
