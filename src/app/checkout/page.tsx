import { CheckoutClient } from '@/features/checkout/components/CheckoutClient'
import { Header } from '@/components/Header'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="mt-2 text-muted-foreground">
              Finalize sua compra de forma segura
            </p>
          </div>

          <CheckoutClient />
        </div>
      </div>
    </ProtectedRoute>
  )
}
