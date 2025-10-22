'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProductsSlider } from '@/features/products/components/ProductsSlider'
import { ProductList } from '@/features/products/components/ProductList'
import { FeaturedProducts } from './FeaturedProducts'
import { useCart } from '@/features/cart/context/CartContext'
import { productService } from '@/features/products/services/productService'
import { Product } from '@/types'

export function Products() {
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
    <div id="products-section" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Products Section */}
        <FeaturedProducts />
        
        {/* Products Slider with CurvedLoop Effect */}
        {!isLoading && featuredProducts.length > 0 && (
          <ProductsSlider
            products={featuredProducts}
            onAddToCart={addToCart}
            title="🌟 Produtos em Destaque"
            subtitle="Nossa seleção especial dos melhores produtos"
          />
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="py-16 bg-background"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Produtos", value: "100+", icon: "📦" },
                { title: "Clientes", value: "1K+", icon: "👥" },
                { title: "Avaliações", value: "4.9★", icon: "⭐" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="py-16 bg-background"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                🛍️ Todos os Produtos
              </h2>
              <p className="text-muted-foreground">
                Explore nossa coleção completa de produtos
              </p>
            </div>
            <ProductList />
          </div>
        </motion.section>
      </div>
    </div>
  )
}
