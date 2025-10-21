'use client'

import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import { useCart } from '@/features/cart/context/CartContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    addToCart(product)
    setIsLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-w-16 aspect-h-12">
        {isLoading ? (
          <Skeleton className="w-full h-48" />
        ) : imageError ? (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Sem imagem</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm text-muted-foreground">
            {product.stock} em estoque
          </span>
        </div>
        
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
          className="w-full"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adicionando...
            </span>
          ) : product.stock === 0 ? (
            'Indisponível'
          ) : (
            'Adicionar ao Carrinho'
          )}
        </Button>
      </CardContent>
    </Card>
    </motion.div>
  )
}
