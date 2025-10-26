import { Metadata } from 'next'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { ProductsClient } from './ProductsClient'

export const metadata: Metadata = {
  title: 'Produtos - Comeia Store',
  description: 'Explore nossa seleção completa de mel artesanal premium. Descubra sabores únicos e naturais.',
  keywords: ['produtos', 'mel', 'artesanal', 'premium', 'loja'],
  openGraph: {
    title: 'Produtos - Comeia Store',
    description: 'Explore nossa seleção completa de mel artesanal premium.',
    type: 'website',
  },
}

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <FeaturedProducts />
        <ProductsClient />
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
