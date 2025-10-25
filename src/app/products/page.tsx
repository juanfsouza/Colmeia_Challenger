'use client'

import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { ProductsSlider } from '@/features/products/components/ProductsSlider'
import { useState, useEffect } from 'react'
import { useCart } from '@/features/cart/context/CartContext'
import { productService } from '@/features/products/services/productService'
import { Product } from '@/types'

export default function ProductsPage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await productService.getProducts()
        // Pegar os primeiros 6 produtos como destaque
        setFeaturedProducts(products.slice(0, 6))
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header com navegação e carrinho */}
        <Header />
        <Hero />
        <FeaturedProducts />
        
        {/* Products Slider with CurvedLoop Effect */}
        {!isLoading && featuredProducts.length > 0 && (
          <ProductsSlider
            products={featuredProducts}
            onAddToCart={addToCart}
            title="Mels de Sabores"
            subtitle="Descubra nossa variedade de sabores únicos"
          />
        )}
        
        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
