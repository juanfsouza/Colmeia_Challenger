import { ProductsClient } from '@/features/products/components/ProductsClient'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { Header } from '@/components/Header'

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header com navegação e carrinho */}
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
            <p className="mt-2 text-muted-foreground">
              Explore nossa seleção de produtos incríveis
            </p>
          </div>
          
          <ProductsClient />
        </div>
      </div>
    </ProtectedRoute>
  )
}
