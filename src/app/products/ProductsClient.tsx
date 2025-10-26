'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/features/cart/context/CartContext'
import { productService } from '@/features/products/services/productService'
import { Product } from '@/types'
import { ProductsSlider } from '@/features/products/components/ProductsSlider'

export function ProductsClient() {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <ProductsSlider
      products={featuredProducts}
      onAddToCart={addToCart}
      title="Mels de Sabores"
      subtitle="Descubra nossa variedade de sabores únicos"
    />
  )
}
